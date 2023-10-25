# 什么是正则表达式

正则表达式是用于匹配字符串中字符组合的模式，有许多应用场景，例如：

- 判断用户输入的输入的手机号/邮箱是否合法
- 用户注册密码/账号长度和字符限制
- ...

# 基本使用

JS 中定义正则表达式参考一下语法：

```ts
// 1.定义
const reg1 = /前端/
const reg2 = /abc/
```

使用正则表达式有很多语法：

- `test(text: string)`：匹配 `text` 是否符合正则规则

实例对象上的方法，如果匹配成功，返回 `true`，否则返回 `false`

```ts
const reg = /h/
console.log(reg.test('hello world')) // true
console.log(reg.test('你好世界')) // false
```

- `exec(text: string)`：查找符合规则的字符串

实例对象上的方法，如果匹配成功，则会返回一个数组，依次包含**正则表达式匹配的内容、匹配成功索引起始位置、原来的字符串、分组**

```ts
const reg = /h/
console.log(reg.exec('hello world'))
// [ 'h', index: 0, input: 'hello world', groups: undefined ]
```

- `replace(reg: RegExp, text: string)`：用于替换符合匹配规则的字符串

**Tip**：调用该方法的是字符串对象，返回的是修改后的字符串

```ts
console.log('hello world'.replace(/hello/, 'hi')) // hi world

console.log('hello wrold, hello everyone'.replace(/hello/, 'hi')) // hi wrold, hello everyone
```

如果我们想要全局匹配，我们可以在正则表达式加一个修饰符 `g`

```ts
console.log('hello wrold, hello everyone'.replace(/hello/g, 'hi')) // hi wrold, hi everyone
```

- `match(reg: RegExp)`：用于判断字符串是否符合正则规则

此方法与 `exec` 方法类似，默认的返回值是相通的，不同的是，调用此方法的是字符串对象

```ts
const reg = /hello/
const str = 'hello world'
console.log(str.match(reg)) // [ 'hello', index: 0, input: 'hello world', groups: undefined ]
```

如果全局匹配，那么 `match` 的返回值会发生改变：

```ts
const reg1 = /hello/g
const str = 'hello world, hello world'
console.log(str.match(reg1)) // [ 'hello', 'hello' ]
```

另外还有一个方法 `matchAll`，它会返回一个迭代器对象，我们可以使用 `for of` 循环遍历：

> 即使是 `matchAll`，我们也需要加上 `g` 修饰符

```ts
const reg = /hello/g
const str = 'hello world, hello world'
for (let value of str.matchAll(reg)) {
  console.log(value)
}
```

# 修饰符

修饰符可以约束一些正则规则，例如是否区分大小写、卷局匹配

| 修饰符 | 说明                                   |
| ------ | -------------------------------------- |
| `i`    | ignore，表示忽略大小写                 |
| `g`    | global，表示匹配所有满足正则规则的内容 |

```ts
console.log(/a/.test('A')) // false
console.log(/a/i.test('A')) // true

const str = 'hello world'
console.log(str.replace(/l/, '_')) // he_lo world
console.log(str.replace(/l/g, '_')) // he__o wor_d
```

修饰符可以一起使用，不区分顺序：

```ts
const str = 'heLlo worLd'
const reg = /l/gi
console.log(str.replace(reg, '_')) // he__o wor_d
```

# 字符匹配

## 普通字符

大多数字符仅能够描述它们本身，这些字符称为普通字符，上述例子都是普通字符

## 元字符

元字符是一些具有特殊含义的字符，可以极大提高灵活性

> 例如，匹配 26 个英文字符，用普通字符表示 `abcd...xyz`，但是用元字符只需要 `[a-z]`

### 边界符

1.  **字符边界**

比如我们只想找出 `cat` 单词，但是某些单词也可能包含 `cat` 这 3 个字符，例如 `The cat scattered his food all over the room.` 中 `scattered` 就包含 `cat`，此时，我们就可以使用单词边界符 **`\b`**

```ts
const reg = /\bcat\b/
const str = 'The cat scattered his food all over the room.'
console.log(str.replace(reg, 'dog')) // The dog scattered his food all over the room.
```

2.  **字符串边界**

| 边界符 | 说明                           |
| ------ | ------------------------------ |
| `^`    | 表示匹配行首，写在表达式最前面 |
| `$`    | 表示匹配行尾，写在表达式最后面 |

> 如果 `^` 和 `$` 一起使用，那么表示精确匹配

```ts
const reg = /^hello/
console.log(reg.test('hello world')) // true
console.log(reg.test('world hello')) // false
```

```ts
const reg3 = /world$/
console.log(reg3.test('hello world')) // true
console.log(reg3.test('world hello')) // false
```

```ts
const reg4 = /^hello$/
console.log(reg4.test('hello')) // true
console.log(reg4.test('hellohello')) // false
console.log(reg4.test('hello world')) // false
```

### 量词

量词用来表示某个字符重复的次数

| 量词    | 说明                      |
| ------- | ------------------------- |
| `*`     | 重复 0 次或多次，`{0,}`   |
| `+`     | 重复 1 次或更多次，`{1,}` |
| `?`     | 重复 0 次或 1 次，`{0,1}` |
| `{n}`   | 重复 n 次                 |
| `{n,}`  | 重复 n 次或更多次         |
| `{n,m}` | 重复 n 到 m 次            |

> Tip：逗号两边不要出现空格

```ts
// *：0 次或多次
const reg1 = /^a*$/
console.log(reg1.test('aaa')) // true
console.log(reg1.test('')) // true

// +：1 次或多次
const reg2 = /^a+$/
console.log(reg2.test('aaa')) // true
console.log(reg2.test('')) // false

// ?:表示 0 次或 1 次
const reg3 = /^a?$/
console.log(reg3.test('aaa')) // false
console.log(reg3.test('a')) // true
console.log(reg3.test('')) // true

// {n}：表示只能有 n 次
const reg4 = /^a{3}$/
console.log(reg4.test('aaa')) // true
console.log(reg4.test('a')) // false
console.log(reg4.test('')) // false

// {n,}：表示大于等于(>=) n 次
const reg5 = /^a{2,}$/
console.log(reg5.test('aaa')) // true
console.log(reg5.test('aa')) // true
console.log(reg5.test('a')) // false
console.log(reg5.test('')) // false

// {n,m}：表示大于等于(>=) n 次，小于等于(<=) m 次
const reg6 = /^a{2,4}$/
console.log(reg6.test('aaaaa')) // false
console.log(reg6.test('aaaa')) // true
console.log(reg6.test('aaa')) // true
console.log(reg6.test('aa')) // true
console.log(reg6.test('a')) // false
```

> 量词 `{n,m}` 中，如果 `m > n` 那么会报错，如果 `n = m`，那么等同于量词 `{n}`

### 字符类

1.  **`[]` 匹配字符**

`[]` 可以放入普通字符进行规则匹配：

```ts
// 匹配 abcd 中的任意一个
const reg1 = /[abcd]/

// 使用连字符 - 表示一个范围
const reg2 = /[a-z]/ // 匹配 26 个小写英文字母
const reg3 = /[A-Z]/ // 大写 26 个大写英文字母
const reg4 = /[0-9]/ // 匹配 0-9 数字
const reg5 = /[a-zA-Z0-9_]/ // 匹配 26 个英文字母、数字和下划线(_)

// ^ 表示取反
const reg6 = /[^abc]/ // 匹配除了 a, b, c 的字符
```

> Tip：`^` 要写在 `[]` 内部表示取反，写在外面表示以什么开头，例如 `^[0-9]` 表示以数字开头

2.  `.` 除换行符以外的字符

换行符有 `\r` 和 `\n`

```ts
const reg = /./
console.log(reg.test('1')) // true
console.log(reg.test('\n')) // false
console.log(reg.test('\r')) // false
```

如果我们就要匹配 `.`，我们可以添加 `/` 转义：

```ts
const reg = /\.\
cnsole.log(reg.test('.')) // true
```

3.  **预定义**：常见模式的简写模式

| 预定类 | 说明                                                       |
| ------ | ---------------------------------------------------------- |
| `\d`   | 匹配 0-9 之间的任意数字，相当于 `[0-9]`                    |
| `\D`   | 匹配 0-9 以外的任意字符，相当于 `[^0-9]`                   |
| `/w`   | 匹配任意字母，数字和下划线，相当于 `[a-zA-Z0-9_]`          |
| `/W`   | 匹配除字母，数字和下划线以外的字符，相当于 `[^a-zA-Z0-9_]` |
| `\s`   | 匹配空格(包括换行、空格、制表符等)，相当于 `[\t\r\n\v\f]`  |
| `\S`   | 匹配非空格字符，相当于 `[^\t\r\n\v\f]`                     |

# 分组和分支结构

## 分组

当我们相匹配多个连续字符时，例如 `ab`，我们需要使用 `/(ab)+/` 进行匹配，其中括号 `()` 提供了分组功能，使两次 `+` 作用于 `ab` 这个整体：

```ts
const reg = /(ab)+/g
const str = 'abba abbb babba'
console.log(str.replace(reg, 'cd')) // cdba cdbb bcdba
```

上述代码中，`cd` 替换了使用括号包裹起来的整体字符，这个操作叫做**分组捕获**，我们可以利用**分组捕获**将日期格式 YYYY-MM-DD 转换成 MM/DD/YYYY

首先 YYYY-MM-DD 的匹配模式位 `/\d{4}-\d{2}-\d{2}/`，这种匹配模式事件整个日期作为一个**组(group)**匹配起来，这样的组叫做 `Group0`，如果我们希望能够转传承 MM/DD/YY，我们需要分成三组，那么此时的匹配模式为：`/(\d){4}-(\d){2}-(\d){2}/`，此时的分组如下：

```
YYYY-MM-DD Group0
YYYY			 Group1
MM				 Group2
DD				 Group3
```

想要获取每组的内容，我们可以使用 `$` 符号，例如上述例子中 `$1` 表示 `YYYY`，`$2` 表示 `MM`，所以转换的完整代码：

```ts
const reg = /^(\d{4})-(\d{2})-(\d{2})$/
const date = '2023-05-17'
console.log(date.replace(reg, '$2/$3/$1'))
```

## 分支结构

分支结构类似逻辑中的或运算，表示匹配逻辑 1 或者逻辑 2

```ts
const reg = /vue|react/
const str1 = 'hello vue'
const str2 = 'hello react'
console.log(reg.test(str1)) // true
console
```
