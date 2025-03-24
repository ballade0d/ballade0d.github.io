---
title: "如何从一名Javaer转变为Gopher"
date: "Mar 23 2025"
categories: [授课]
tags: [Golang]
---

# 如何从一名 Javaer 转变为 Gopher

## Golang 的安装

### Windows

使用.msi 后缀的安装包进行安装，默认安装路径为 C:\Go。可以将 C:\Go\bin 路径添加到 Path 环境变量中

### UNIX/Linux

- 下载二进制包：go.linux-amd64.tar.gz
- 将下载的二进制包解压至 /usr/local 目录。

```bash
tar -C /usr/local -xzf go.linux-amd64.tar.gz
```

- 编辑 ~/.bash_profile 或者 /etc/profile，并将以下命令添加该文件的末尾：

```bash
export PATH=$PATH:/usr/local/go/bin
```

- 添加后需要执行：

```bash
source ~/.bash_profile
```

或

```bash
source /etc/profile
```

### MacOS

建议使用 homebrew 安装

```bash
brew install go
```

## Go Toolchain

Go 语言的 toolchain（工具链）包含一系列用于编译、构建、调试和测试 Go 代码的工具，主要包括以下内容：

**编译和构建相关**

```bash
go build:   # 编译 Go 代码并生成可执行文件
go run:     # 编译并运行 Go 代码（不会生成可执行文件）
go install: # 编译并安装 Go 程序或包到 $GOBIN 目录
go clean:   # 清理编译产生的临时文件
```

**包管理**

```bash
go mod: # 管理 Go module，包括 go mod init、go mod tidy 等命令
go get: # 下载和更新 Go 依赖包
```

**测试和调试**

```bash
go test:        # 运行 Go 测试（单元测试和基准测试）
go benchmark:   # 使用 testing 库进行基准测试
go tool pprof:  # 性能分析工具（用于分析 CPU 和内存使用情况）
```

**代码格式化和分析**

```bash
go fmt: # 格式化 Go 代码，遵循官方风格。
gofmt:  # 与 go fmt 类似，但可以直接用于文件修改。
go vet: # 静态分析代码，发现潜在问题。
```

**文档生成**

```bash
go doc: # 查看 Go 包的文档。
```

**交叉编译和工具**

```bash
go env:             # 查看和设置 Go 环境变量。
go version:         # 查看 Go 版本。
go list:            # 列出 Go 包信息。
go tool compile:    # 手动调用 Go 编译器。
go tool link:       # Go 链接器。
go tool objdump:    # 反汇编 Go 二进制文件。
```

**构建工具**

```bash
go generate:    # 自动代码生成（用于处理 //go:generate 指令）。
go embed:       # 嵌入静态资源文件。
```

## Go 基础语法

```go
package main

import (
    "fmt"
    "math"
    "sync"
    "time"
)

// 常量定义
const Pi = 3.14159

// 全局变量
var globalVar = "我是全局变量"

// 结构体定义
type Person struct {
    Name string
    Age  int
}

// 方法 (结构体绑定方法)
func (p Person) SayHello() {
    fmt.Printf("你好，我是 %s，今年 %d 岁。\n", p.Name, p.Age)
}

// 接口定义
type Speaker interface {
    Speak()
}

// 实现接口的方法
func (p Person) Speak() {
    fmt.Println("speak")
}

// 泛型函数（Go 1.18+）
func PrintValue[T any](value T) {
    fmt.Println("泛型值:", value)
}

func main() {
    // 1. 变量和数据类型
    var a int = 10
    b := 20.5  // 自动推导类型
    c := "Hello, Go!"
    d := true
    fmt.Println("变量:", a, b, c, d)

    // 2. 数组
    arr := [3]int{1, 2, 3}
    fmt.Println("数组:", arr)

    // 3. 切片（List）
    slice := []int{4, 5, 6}
    slice = append(slice, 7) // 追加元素
    fmt.Println("切片:", slice)

    // 4. 映射（Map）
    m := map[string]int{"Alice": 25, "Bob": 30}
    fmt.Println("映射:", m)

    // 5. 条件语句
    if a > 5 {
        fmt.Println("a 大于 5")
    } else {
        fmt.Println("a 小于等于 5")
    }

    // 6. 循环
    for i := 0; i < 3; i++ {
        fmt.Println("循环 i:", i)
    }

    // 7. 结构体
    person := Person{Name: "张三", Age: 28}
    person.SayHello()

    // 8. 指针
    ptr := &a
    fmt.Println("指针值:", *ptr)

    // 9. 接口
    var sp Speaker = person
    sp.Speak()

    // 10. 匿名函数
    func(msg string) {
        fmt.Println("匿名函数:", msg)
    }("Go 语言")

    // 11. defer（延迟执行）
    defer fmt.Println("程序即将结束！")

    // 12. 错误处理
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("错误:", err)
    } else {
        fmt.Println("除法结果:", result)
    }

    // 13. 泛型调用
    PrintValue("泛型字符串")
    PrintValue(123)
    PrintValue(3.14)
}

// 处理错误的函数
func divide(a, b float64) (float64, error) {
    if b == 0 {
    return 0, fmt.Errorf("除数不能为 0")
    }
    return a / b, nil
}
```

**defer 的特性：**

1. 关键字 defer 用于注册延迟调用
2. 这些调用直到 return 前才被执行。因此，可以用来做资源清理
3. 多个 defer 语句，按先进后出的方式执行
4. defer 语句中的变量，在 defer 声明时就决定了

**defer 的用途：**

1. 关闭文件句柄
2. 锁资源释放
3. 数据库连接释放

```go
package main

import "fmt"

type Test struct {
    name string
}

func (t *Test) Close() {
    fmt.Println(t.name, " closed")
}
func main() {
    ts := []Test{{"a"}, {"b"}, {"c"}}
    for _, t := range ts {
        defer t.Close()
    }
}
```

### Error 与 Panic

Go 语言的多值返回特性，使得它在返回常规的值时，还能轻松地返回详细的错误描述。使用这个特性来提供详细的错误信息是一种良好的风格。例如 os 库中：

```go
func Create(name string) (file *File, err Error)
```

在调用这个函数的时候可以通过返回值来捕获异常

```go
file, err := os.Create("file.txt")
```

Panic 会产生一个运行时错误并终止程序，该函数接受一个任意类型的实参（一般为字符串），并在程序终止时打印。

应用程序中应避免使用 panic。若问题可以被屏蔽或解决，最好就是让程序继续运行而不是终止整个程序。

### interface

Go 语言提供了一种数据类型：接口。它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口。

**鸭子类型**
鸭子类型在程序设计中是动态类型的一种风格。在这种风格中，一个物件有效的语义，不是由继承自特定的类或实现特定的接口，而是由「当前方法和属性的集合」决定。“鸭子测试”可以这样表述：

> 当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。

在鸭子类型中，关注点在于物件的行为，能做什么；而不是关注物件所属的类型。例如，在不使用鸭子类型的语言中，我们可以编写一个函数，它接受一个类型为「鸭子」的物件，并调用它的「走」和「叫」方法。在使用鸭子类型的语言中，这样的一个函数可以接受一个任意类型的物件，并调用它的「走」和「叫」方法。如果这些需要被调用的方法不存在，那么将引发一个运行时错误。任何拥有这样的正确的「走」和「叫」方法的物件都可被函数接受的这种行为引出了以上表述，这种决定类型的方式因此得名。

```go
// Mover 接口
type Mover interface {
    move()
}

type dog struct {
    name string
}

type car struct {
    brand string
}

// dog类型实现Mover接口
func (d dog) move() {
    fmt.Printf("%s会跑\n", d.name)
}

// car类型实现Mover接口
func (c car) move() {
    fmt.Printf("%s速度70迈\n", c.brand)
}

func main() {
    var x Mover
    var a = dog{name: "Doge"}
    var b = car{brand: "Porsche"}
    x = a
    x.move()
    x = b
    x.move()
}
```

### gorountine

在以前版本的 Java/C++ 中，要实现并发编程的时候，我们通常需要自己维护一个线程池，并且需要自己去包装一个又一个的任务，同时需要自己去调度线程执行任务并维护上下文切换，这通常会耗费大量的时间。那么能不能只需要定义很多个任务，让系统去帮我们分配到 CPU 上实现并发执行呢？

Go 语言中的 goroutine 就是这样一种机制， goroutine 的概念类似于线程，但 goroutine 是由 Go 的运行时（runtime）调度和管理的。Go 程序会智能地将 goroutine 中的任务合理地分配给每个 CPU。

**匿名函数**

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    getSqrt := func(a float64) float64 {
        return math.Sqrt(a)
    }
    fmt.Println(getSqrt(4))
}
```

启动 goroutine 的方式非常简单，只需要在调用的函数（普通函数和匿名函数）前面加上一个 go 关键字。

注意：当 main 函数返回的时候，goroutine 就结束了，所有在 main 函数中启动的 goroutine 会一同结束

```go
func hello() {
    fmt.Println("Hello Goroutine!")
}

func main() {
    go hello() // 启动另外一个goroutine去执行hello函数
    fmt.Println("main goroutine done!")
}
```

匿名函数的写法：

```go
func main(){
    go func(){
        fmt.Println("Hello Goroutine!")
    }()
    time.Sleep(time.Second)
}
```

## 常用标准库

**fmt**
fmt 包实现了类似 C 语言 printf 和 scanf 的格式化 I/O。主要分为向外输出内容和获取输入内容两大部分。

**time**
时间和日期是我们编程中经常会用到的，本文主要介绍了 Go 语言内置的 time 包的基本用法。

**strconv**
strconv 包实现了基本数据类型与其字符串表示的转换，主要有以下常用函数： Atoi()、Itoa()、parse 系列、format 系列、append 系列。

## Gin 基本用法

### 介绍

Gin 是一个 Golang 的 Web 框架，封装比较优雅，API 友好，源码注释比较明确，具有快速灵活，容错方便等特点

对于 Golang 而言，web 框架的依赖要远比 Python，Java 之类的要小。自身的 net/http 足够简单，性能也非常不错

### 安装

在 go 项目中（与 go.mod 同一目录下）执行：

```bash
go get -u github.com/gin-gonic/gin
```

然后在代码中导入：

```go
import "github.com/gin-gonic/gin"
```

示例：如何启动一个 Web 服务

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    // 1. 创建路由
    r := gin.Default()
    // 2. 绑定路由规则，执行的函数
    r.GET("/", func(c *gin.Context) { // gin.Context，封装了request和response
        c.String(http.StatusOK, "hello World!")
    })
    // 3. 监听端口
    r.Run(":8000")
}
```

如何添加一个拦截器

```go
func Authorize() gin.HandlerFunc {
    return func(c *gin.Context) {
        username := c.Query("username") // 用户名
        token := c.Query("token") // 访问令牌

        if /* 验证逻辑 */ {
            // 验证通过，会继续访问下一个中间件
            c.Next()
        } else {
            // 验证不通过，不再调用后续的函数处理
            c.Abort()
            c.JSON(http.StatusUnauthorized, gin.H{"message":"访问未授权"})
        }
    }
}

func ServiceWithoutAuth(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message":"这是一个不用经过认证就能访问的接口"})
}

func ServiceWithAuth(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message":"这是一个需要经过认证才能访问的接口"})
}

func main(){
    router := gin.Default()

    // Use(Authorize()) 之前的接口，都不用经过身份验证
    router.GET("/service_without_auth", ServiceWithoutAuth)

    // 以下的接口，都使用 Authorize() 中间件身份验证
    router.Use(Authorize())
    router.GET("/service_with_auth", ServiceWithAuth)

    router.Run(":8080")
}
```
