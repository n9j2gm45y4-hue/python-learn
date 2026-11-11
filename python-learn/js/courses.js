const COURSES = [
  {
    id: "ch1",
    title: "第1章 认识 Python 与第一个程序",
    content: `
      <h1>第1章 认识 Python 与第一个程序</h1>
      <p>Python 是一种简洁易学的编程语言。在 IDLE 中输入代码，按回车即可运行。</p>
      <h3>1.1 第一个程序</h3>
      <pre><code>print("Hello, World!")</code></pre>
      <p><code>print()</code> 函数用于把内容输出到屏幕。</p>
      <h3>1.2 注释</h3>
      <p>以 <code>#</code> 开头的内容是注释，不会被运行。</p>
      <pre><code># 这是一行注释
print(123)  # 输出数字</code></pre>
    `,
    exercises: [
      {
        id: "ex1-1",
        title: "练习 1-1：输出问候",
        desc: "使用 print 输出：你好，Python",
        initialCode: 'print("你好，Python")\n',
        tests: [{ input: "", expected: "你好，Python\n" }]
      },
      {
        id: "ex1-2",
        title: "练习 1-2：输出算式结果",
        desc: "输出 3 + 5 的结果（应为 8）",
        initialCode: 'print(3 + 5)\n',
        tests: [{ input: "", expected: "8\n" }]
      }
    ]
  },
  {
    id: "ch2",
    title: "第2章 变量与数据类型",
    content: `
      <h1>第2章 变量与数据类型</h1>
      <h3>2.1 变量</h3>
      <p>变量是存储数据的容器：<code>name = "小明"</code></p>
      <h3>2.2 常见数据类型</h3>
      <ul>
        <li>整数 int：<code>age = 18</code></li>
        <li>浮点数 float：<code>score = 95.5</code></li>
        <li>字符串 str：<code>name = "Tom"</code></li>
        <li>布尔 bool：<code>flag = True</code></li>
      </ul>
      <h3>2.3 输入与输出</h3>
      <pre><code>name = input("请输入名字：")
print("你好，" + name)</code></pre>
      <p>注意：<code>input()</code> 返回的是<strong>字符串</strong>，需要数字时用 <code>int()</code> 转换。</p>
      <h3>2.4 类型转换</h3>
      <pre><code>n = int("123")     # 字符串转整数
s = str(456)       # 整数转字符串
f = float("3.14")  # 字符串转浮点</code></pre>
    `,
    exercises: [
      {
        id: "ex2-1",
        title: "练习 2-1：两数求和",
        desc: "读入两个整数，输出它们的和。",
        initialCode: 'a = int(input())\nb = int(input())\nprint(a + b)\n',
        tests: [
          { input: "3\n5\n", expected: "8\n" },
          { input: "10\n-2\n", expected: "8\n" }
        ]
      },
      {
        id: "ex2-2",
        title: "练习 2-2：类型转换",
        desc: "读入一个字符串数字，转换为整数后乘以 2 输出。",
        initialCode: 's = input()\nprint(int(s) * 2)\n',
        tests: [{ input: "21\n", expected: "42\n" }]
      }
    ]
  },
  {
    id: "ch3",
    title: "第3章 运算符与表达式",
    content: `
      <h1>第3章 运算符与表达式</h1>
      <h3>3.1 算术运算符</h3>
      <p><code>+  -  *  /  //  %  **</code></p>
      <pre><code>print(7 / 2)   # 3.5 真除法
print(7 // 2)  # 3   整除
print(7 % 2)   # 1   取余
print(2 ** 3)  # 8   幂</code></pre>
      <h3>3.2 比较运算符</h3>
      <p><code>==  !=  &gt;  &lt;  &gt;=  &lt;=</code>，结果是 True 或 False。</p>
      <h3>3.3 逻辑运算符</h3>
      <p><code>and  or  not</code></p>
    `,
    exercises: [
      {
        id: "ex3-1",
        title: "练习 3-1：整除与取余",
        desc: "读入两个整数 a、b，输出 a//b 和 a%b（分两行）。",
        initialCode: 'a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)\n',
        tests: [{ input: "7\n2\n", expected: "3\n1\n" }]
      }
    ]
  },
  {
    id: "ch4",
    title: "第4章 分支结构 if",
    content: `
      <h1>第4章 分支结构 if</h1>
      <h3>4.1 if 语句</h3>
      <pre><code>score = 85
if score &gt;= 60:
    print("及格")
else:
    print("不及格")</code></pre>
      <h3>4.2 elif 多分支</h3>
      <pre><code>x = 75
if x &gt;= 90:
    print("优秀")
elif x &gt;= 60:
    print("及格")
else:
    print("不及格")</code></pre>
      <p>注意：冒号 <code>:</code> 和缩进（4 空格）是 Python 语法的关键。</p>
    `,
    exercises: [
      {
        id: "ex4-1",
        title: "练习 4-1：判断奇偶",
        desc: "读入一个整数，是偶数输出 even，否则输出 odd。",
        initialCode: 'n = int(input())\nif n % 2 == 0:\n    print("even")\nelse:\n    print("odd")\n',
        tests: [
          { input: "4\n", expected: "even\n" },
          { input: "7\n", expected: "odd\n" }
        ]
      },
      {
        id: "ex4-2",
        title: "练习 4-2：判断及格",
        desc: "读入分数，&gt;=60 输出 pass，否则输出 fail。",
        initialCode: 's = int(input())\nif s &gt;= 60:\n    print("pass")\nelse:\n    print("fail")\n',
        tests: [
          { input: "60\n", expected: "pass\n" },
          { input: "59\n", expected: "fail\n" }
        ]
      }
    ]
  },
  {
    id: "ch5",
    title: "第5章 循环结构 while / for",
    content: `
      <h1>第5章 循环结构</h1>
      <h3>5.1 while 循环</h3>
      <pre><code>i = 1
while i &lt;= 5:
    print(i)
    i += 1</code></pre>
      <h3>5.2 for 循环与 range</h3>
      <pre><code>for i in range(1, 6):
    print(i)</code></pre>
      <p><code>range(a, b)</code> 生成 a 到 b-1 的整数序列。</p>
      <h3>5.3 break / continue</h3>
      <pre><code>for i in range(10):
    if i == 5:
        break
    print(i)</code></pre>
    `,
    exercises: [
      {
        id: "ex5-1",
        title: "练习 5-1：1 到 n 求和",
        desc: "读入整数 n，输出 1+2+...+n 的和。",
        initialCode: 'n = int(input())\ns = 0\nfor i in range(1, n + 1):\n    s += i\nprint(s)\n',
        tests: [
          { input: "5\n", expected: "15\n" },
          { input: "100\n", expected: "5050\n" }
        ]
      },
      {
        id: "ex5-2",
        title: "练习 5-2：打印 1 到 n",
        desc: "读入整数 n，逐行输出 1 到 n。",
        initialCode: 'n = int(input())\nfor i in range(1, n + 1):\n    print(i)\n',
        tests: [{ input: "3\n", expected: "1\n2\n3\n" }]
      }
    ]
  },
  {
    id: "ch6",
    title: "第6章 列表与元组",
    content: `
      <h1>第6章 列表与元组</h1>
      <h3>6.1 列表</h3>
      <pre><code>a = [1, 2, 3]
a.append(4)     # 末尾追加
print(a[0])     # 1
print(a[-1])    # 4
print(len(a))   # 4</code></pre>
      <h3>6.2 切片</h3>
      <pre><code>a = [10, 20, 30, 40, 50]
print(a[1:3])   # [20, 30]
print(a[:2])    # [10, 20]
print(a[::2])   # [10, 30, 50]</code></pre>
      <h3>6.3 遍历</h3>
      <pre><code>for x in [1, 2, 3]:
    print(x)</code></pre>
      <h3>6.4 元组</h3>
      <p>元组用圆括号，创建后不能修改：<code>t = (1, 2, 3)</code></p>
    `,
    exercises: [
      {
        id: "ex6-1",
        title: "练习 6-1：列表求和",
        desc: "读入一行用空格分隔的整数，输出它们的和。",
        initialCode: 'nums = list(map(int, input().split()))\nprint(sum(nums))\n',
        tests: [
          { input: "1 2 3\n", expected: "6\n" },
          { input: "10 -2 5\n", expected: "13\n" }
        ]
      },
      {
        id: "ex6-2",
        title: "练习 6-2：列表最大值",
        desc: "读入一行整数，输出最大值。",
        initialCode: 'nums = list(map(int, input().split()))\nprint(max(nums))\n',
        tests: [{ input: "3 9 2 7\n", expected: "9\n" }]
      }
    ]
  },
  {
    id: "ch7",
    title: "第7章 字符串与字典",
    content: `
      <h1>第7章 字符串与字典</h1>
      <h3>7.1 字符串常用方法</h3>
      <pre><code>s = "Hello"
print(s.upper())      # HELLO
print(s.lower())      # hello
print(s.replace("l", "L"))  # HeLLo
print(len(s))         # 5
print(s[0])           # H</code></pre>
      <h3>7.2 字典</h3>
      <pre><code>d = {"name": "Tom", "age": 18}
print(d["name"])      # Tom
d["age"] = 19         # 修改
d["city"] = "西安"     # 新增
for k, v in d.items():
    print(k, v)</code></pre>
    `,
    exercises: [
      {
        id: "ex7-1",
        title: "练习 7-1：字符串反转",
        desc: "读入一个字符串，输出反转后的结果。",
        initialCode: 's = input()\nprint(s[::-1])\n',
        tests: [
          { input: "abc\n", expected: "cba\n" },
          { input: "Python\n", expected: "nohtyP\n" }
        ]
      },
      {
        id: "ex7-2",
        title: "练习 7-2：统计字符",
        desc: "读入一个字符串，输出其长度。",
        initialCode: 's = input()\nprint(len(s))\n',
        tests: [{ input: "hello\n", expected: "5\n" }]
      }
    ]
  },
  {
    id: "ch8",
    title: "第8章 函数",
    content: `
      <h1>第8章 函数</h1>
      <h3>8.1 定义函数</h3>
      <pre><code>def add(a, b):
    return a + b

print(add(2, 3))   # 5</code></pre>
      <h3>8.2 默认参数</h3>
      <pre><code>def greet(name="同学"):
    print("你好，" + name)

greet()
greet("小明")</code></pre>
      <h3>8.3 递归入门</h3>
      <pre><code>def fact(n):
    if n == 1:
        return 1
    return n * fact(n - 1)

print(fact(5))   # 120</code></pre>
    `,
    exercises: [
      {
        id: "ex8-1",
        title: "练习 8-1：定义加法函数",
        desc: "定义函数 add(a,b) 返回两数之和，读入两个整数输出结果。",
        initialCode: 'def add(a, b):\n    return a + b\n\na = int(input())\nb = int(input())\nprint(add(a, b))\n',
        tests: [{ input: "3\n4\n", expected: "7\n" }]
      },
      {
        id: "ex8-2",
        title: "练习 8-2：阶乘",
        desc: "读入 n，输出 n 的阶乘。",
        initialCode: 'def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n - 1)\n\nn = int(input())\nprint(fact(n))\n',
        tests: [{ input: "5\n", expected: "120\n" }]
      }
    ]
  },
  {
    id: "ch9",
    title: "第9章 模块与包",
    content: `
      <h1>第9章 模块与包</h1>
      <h3>9.1 导入模块</h3>
      <pre><code>import math
print(math.sqrt(16))   # 4.0
print(math.pi)         # 3.14159...</code></pre>
      <h3>9.2 from ... import</h3>
      <pre><code>from random import randint
print(randint(1, 10))</code></pre>
      <h3>9.3 自定义模块</h3>
      <p>把函数写进 <code>mymodule.py</code>，用 <code>import mymodule</code> 调用。</p>
    `,
    exercises: [
      {
        id: "ex9-1",
        title: "练习 9-1：使用 math",
        desc: "读入一个整数，输出其平方根（保留原样即可，如 16 → 4.0）。",
        initialCode: 'import math\nn = int(input())\nprint(math.sqrt(n))\n',
        tests: [{ input: "16\n", expected: "4.0\n" }]
      }
    ]
  },
  {
    id: "ch10",
    title: "第10章 文件与异常",
    content: `
      <h1>第10章 文件与异常</h1>
      <h3>10.1 文件读写</h3>
      <pre><code>with open("a.txt", "w", encoding="utf-8") as f:
    f.write("hello")

with open("a.txt", "r", encoding="utf-8") as f:
    print(f.read())</code></pre>
      <h3>10.2 异常处理</h3>
      <pre><code>try:
    x = int("abc")
except ValueError:
    print("转换失败")</code></pre>
    `,
    exercises: [
      {
        id: "ex10-1",
        title: "练习 10-1：安全转换",
        desc: "读入一个字符串，尝试转整数；成功输出该整数，失败输出 error。",
        initialCode: 's = input()\ntry:\n    print(int(s))\nexcept ValueError:\n    print("error")\n',
        tests: [
          { input: "123\n", expected: "123\n" },
          { input: "abc\n", expected: "error\n" }
        ]
      }
    ]
  },
  {
    id: "ch11",
    title: "第11章 NumPy 基础",
    content: `
      <h1>第11章 NumPy 基础</h1>
      <p>NumPy 用于数值数组计算。导入：<code>import numpy as np</code></p>
      <h3>11.1 创建数组</h3>
      <pre><code>import numpy as np
a = np.array([1, 2, 3])
print(a)
print(a + 10)   # [11 12 13]</code></pre>
      <h3>11.2 常用函数</h3>
      <pre><code>print(a.sum())    # 6
print(a.mean())   # 2.0
print(np.arange(5))   # [0 1 2 3 4]</code></pre>
      <p>在线模式下 NumPy 首次加载较慢，属正常。</p>
    `,
    exercises: [
      {
        id: "ex11-1",
        title: "练习 11-1：数组求和",
        desc: "创建数组 [1,2,3,4]，输出其和（结果为 10）。",
        initialCode: 'import numpy as np\na = np.array([1, 2, 3, 4])\nprint(a.sum())\n',
        tests: [{ input: "", expected: "10\n" }]
      }
    ]
  },
  {
    id: "ch12",
    title: "第12章 Pandas 与 Matplotlib 基础",
    content: `
      <h1>第12章 Pandas 与 Matplotlib 基础</h1>
      <h3>12.1 Pandas 的 Series 与 DataFrame</h3>
      <pre><code>import pandas as pd
s = pd.Series([10, 20, 30])
print(s.sum())   # 60

df = pd.DataFrame({"name": ["Tom", "Amy"], "age": [18, 20]})
print(df["age"].mean())   # 19.0</code></pre>
      <h3>12.2 Matplotlib 画图</h3>
      <pre><code>import matplotlib.pyplot as plt
x = [1, 2, 3]
y = [1, 4, 9]
plt.plot(x, y)
plt.title("demo")
plt.show()</code></pre>
      <p>本地模式下会弹出图形窗口；在线模式下图形显示在网页中。</p>
    `,
    exercises: [
      {
        id: "ex12-1",
        title: "练习 12-1：DataFrame 求平均",
        desc: "创建 DataFrame，列 score 为 [80, 90, 100]，输出平均分（90.0）。",
        initialCode: 'import pandas as pd\ndf = pd.DataFrame({"score": [80, 90, 100]})\nprint(df["score"].mean())\n',
        tests: [{ input: "", expected: "90.0\n" }]
      }
    ]
  }
];

window.COURSES = COURSES;
