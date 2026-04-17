export const pythonLessons = [
  {
    title: 'Hello World - 你的第一个程序',
    description: `
      <p>每个程序员的学习之旅都从 "Hello World" 开始！这是编程界的传统。</p>
      <p><code>print()</code> 是 Python 中最常用的函数之一，用于在屏幕上输出内容。</p>
    `,
    code: `# 这是注释，Python会忽略它
# print() 函数用于输出文字到屏幕

print("Hello, World!")
print("欢迎学习 Python！")
print("Python 是一门优雅的语言")`,
    tips: [
      'Python 使用 # 号表示单行注释',
      '字符串可以用单引号或双引号包裹',
      'print() 可以输出多个值，用逗号分隔'
    ]
  },
  {
    title: '变量与数据类型',
    description: `
      <p>变量是存储数据的容器。在 Python 中，你不需要声明变量类型，Python 会自动推断。</p>
      <p>Python 有多种数据类型：整数(int)、浮点数(float)、字符串(str)、布尔值(bool)等。</p>
    `,
    code: `# 变量定义
name = "小明"        # 字符串
age = 18            # 整数
height = 1.75       # 浮点数
is_student = True   # 布尔值

# 输出变量
print("姓名:", name)
print("年龄:", age)
print("身高:", height, "米")
print("是学生吗?", is_student)

# 查看变量类型
print("\\n变量类型:")
print("name 的类型:", type(name))
print("age 的类型:", type(age))`,
    tips: [
      '变量名要有意义，使用小写字母和下划线',
      '变量名不能以数字开头',
      'type() 函数可以查看变量的数据类型'
    ]
  },
  {
    title: '运算符与表达式',
    description: `
      <p>Python 支持各种数学运算：加(+)、减(-)、乘(*)、除(/)、整除(//)、取余(%)、幂(**)。</p>
      <p>还有比较运算符和逻辑运算符，用于条件判断。</p>
    `,
    code: `# 数学运算
a = 10
b = 3

print("加法:", a + b)      # 13
print("减法:", a - b)      # 7
print("乘法:", a * b)      # 30
print("除法:", a / b)      # 3.333...
print("整除:", a // b)     # 3
print("取余:", a % b)      # 1
print("幂运算:", a ** b)   # 1000

# 比较运算
print("\\n比较运算:")
print("a > b:", a > b)     # True
print("a == b:", a == b)   # False`,
    tips: [
      '/ 返回浮点数，// 返回整数（向下取整）',
      '** 比 pow() 函数更简洁',
      '比较运算符返回布尔值 True 或 False'
    ]
  },
  {
    title: '条件判断 (if-elif-else)',
    description: `
      <p>条件语句让程序能够根据不同情况执行不同的代码。</p>
      <p>Python 使用缩进来表示代码块，通常使用 4 个空格。</p>
    `,
    code: `# 根据分数判断等级
score = 85

if score >= 90:
    grade = "优秀"
elif score >= 80:
    grade = "良好"
elif score >= 60:
    grade = "及格"
else:
    grade = "不及格"

print(f"分数: {score}, 等级: {grade}")

# 另一个例子：判断奇偶数
num = 7
if num % 2 == 0:
    print(f"{num} 是偶数")
else:
    print(f"{num} 是奇数")`,
    tips: [
      'if 后面的条件不需要括号',
      '冒号 : 不能省略',
      'elif 是 "else if" 的缩写',
      'f-string (f"...") 可以在字符串中嵌入变量'
    ]
  },
  {
    title: '循环结构',
    description: `
      <p>循环用于重复执行某段代码。Python 有 for 循环和 while 循环两种。</p>
      <p>for 循环常用于遍历序列，while 循环在条件为真时持续执行。</p>
    `,
    code: `# for 循环
print("=== for 循环 ===")
for i in range(5):
    print(f"第 {i+1} 次循环")

# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
print("\\n水果列表:")
for fruit in fruits:
    print(f"- {fruit}")

# while 循环
print("\\n=== while 循环 ===")
count = 0
while count < 3:
    print(f"count = {count}")
    count += 1`,
    tips: [
      'range(n) 生成 0 到 n-1 的序列',
      'range(start, stop, step) 可以指定起始、结束和步长',
      'break 可以跳出循环，continue 可以跳过本次循环'
    ]
  },
  {
    title: '列表 (List)',
    description: `
      <p>列表是 Python 中最常用的数据结构，可以存储多个元素。</p>
      <p>列表是可变的、有序的，可以包含不同类型的元素。</p>
    `,
    code: `# 创建列表
numbers = [1, 2, 3, 4, 5]
names = ["张三", "李四", "王五"]
mixed = [1, "hello", 3.14, True]

# 访问元素
print("第一个元素:", names[0])
print("最后一个元素:", names[-1])

# 切片
print("前两个元素:", numbers[:2])
print("后两个元素:", numbers[-2:])

# 列表操作
names.append("赵六")      # 添加元素
names.insert(0, "钱七")   # 插入元素
names.remove("李四")      # 删除元素

print("\\n修改后的列表:", names)
print("列表长度:", len(names))`,
    tips: [
      '索引从 0 开始，-1 表示最后一个元素',
      '切片 [start:end] 包含 start，不包含 end',
      'append() 在末尾添加，insert() 在指定位置插入'
    ]
  },
  {
    title: '字典 (Dictionary)',
    description: `
      <p>字典是一种键值对(key-value)数据结构，通过键来访问值。</p>
      <p>字典非常适合存储结构化数据，如用户信息、配置等。</p>
    `,
    code: `# 创建字典
student = {
    "name": "小明",
    "age": 18,
    "grade": "高三",
    "scores": [85, 92, 78]
}

# 访问值
print("姓名:", student["name"])
print("年龄:", student.get("age"))

# 修改和添加
student["age"] = 19
student["city"] = "北京"

# 遍历字典
print("\\n学生信息:")
for key, value in student.items():
    print(f"  {key}: {value}")

# 常用方法
print("\\n所有键:", list(student.keys()))
print("所有值:", list(student.values()))`,
    tips: [
      '使用 get() 方法访问不存在的键不会报错',
      'items() 返回键值对，keys() 返回键，values() 返回值',
      '字典的键必须是不可变类型（如字符串、数字、元组）'
    ]
  },
  {
    title: '函数定义',
    description: `
      <p>函数是组织好的、可重复使用的代码块。使用函数可以让代码更模块化、更易维护。</p>
      <p>Python 使用 def 关键字定义函数。</p>
    `,
    code: `# 定义简单函数
def greet(name):
    """问候函数"""
    return f"你好, {name}!"

print(greet("小明"))

# 带默认参数的函数
def power(base, exp=2):
    return base ** exp

print("\\n2的3次方:", power(2, 3))
print("5的平方:", power(5))  # 使用默认参数

# 多返回值函数
def get_info():
    name = "小红"
    age = 20
    return name, age

n, a = get_info()
print(f"\\n姓名: {n}, 年龄: {a}")`,
    tips: [
      '函数文档字符串用三引号包裹',
      'return 可以返回多个值（实际返回元组）',
      '默认参数必须放在参数列表末尾'
    ]
  }
]
