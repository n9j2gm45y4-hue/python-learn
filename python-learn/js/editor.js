let cm = null;
function initEditor(initialCode) {
  cm = CodeMirror(document.getElementById("editor"), {
    value: initialCode || "",
    mode: "python",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Enter": () => runCode(),
      "Cmd-Enter": () => runCode()
    }
  });
  setTimeout(() => cm.refresh(), 50);
}
function getCode() { return cm ? cm.getValue() : ""; }
function setCode(code) { if (cm) cm.setValue(code); }
window.initEditor = initEditor;
window.getCode = getCode;
window.setCode = setCode;
