# template-replace README

## 功能简介：
这个插件是替换模版文件中的变量，多行对多行。
  
## 已经实现语法
{c1r1}
{c1r1:n}
{c1r1:-n}
{"string":-n}
{write("string")}
{write({c1r1})}

### 一个是模版文件：
  
比如下面这种

```
public {r1c1} get{r1c2}(){
    return this.{r1c2};
} 
```

  
### 另一个文件像这样：
  
这个文件需要临时打开一份。（⇧⌘ N/ctrl N）
并放入值。
```
String	fun1
int	fun2
```
中间用[\t]制表符分割。



点击’=>'后就生成了  （将鼠标放到模版文件上就能看到‘=>’了）

```
public String getfun1(){
    return this.fun1;
} 
public int getfun2(){
    return this.fun2;
} 

```


{r1c1}  
r是行，c是列的意思。r1c1是第一行第一列的那个字符串，用[\t]制表符分割  
r1c2,r2c2...等等。  

**Enjoy!**
