# -*- coding: utf-8 -*-
import json
import sys
import subprocess
import tempfile
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = "127.0.0.1"
PORT = 5000

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.end_headers()

    def do_GET(self):
        if self.path == "/ping":
            self._send(200, {"ok": True, "python": sys.version.split()[0]})
        else:
            self._send(404, {"error": "not found"})

    def do_POST(self):
        if self.path != "/run":
            self._send(404, {"error": "not found"})
            return
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length).decode("utf-8")
        try:
            data = json.loads(raw or "{}")
        except Exception:
            data = {}
        code = data.get("code", "")
        stdin_text = data.get("stdin", "")

        fd, path = tempfile.mkstemp(suffix=".py", text=True, encoding="utf-8")
        os.close(fd)
        with open(path, "w", encoding="utf-8") as f:
            f.write(code)

        try:
            proc = subprocess.run(
                [sys.executable, path],
                input=stdin_text,
                capture_output=True,
                text=True,
                encoding="utf-8",
                timeout=30,
            )
            stdout = proc.stdout or ""
            stderr = proc.stderr or ""
            errorType = "SyntaxError" if ("SyntaxError" in stderr or "IndentationError" in stderr) else None
            self._send(200, {"stdout": stdout, "stderr": stderr, "errorType": errorType})
        except subprocess.TimeoutExpired:
            self._send(200, {"stdout": "", "stderr": "运行超时（30秒）", "errorType": None})
        except Exception as e:
            self._send(200, {"stdout": "", "stderr": "执行失败：" + str(e), "errorType": None})
        finally:
            try:
                os.remove(path)
            except Exception:
                pass

    def log_message(self, format, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), format % args))


def main():
    print("=" * 50)
    print("本地 Python 桥接服务已启动")
    print(f"地址: http://{HOST}:{PORT}")
    print("Python 版本:", sys.version.split()[0])
    print("请保持此窗口开启，关闭则网页退回在线模式。")
    print("=" * 50)
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止。")


if __name__ == "__main__":
    main()
