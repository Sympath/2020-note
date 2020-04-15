### express和koa的区别

|          | express   | koa                 |
| -------- | --------- | ------------------- |
| 中间件   | 内嵌      | 自己安装引入扩展    |
| 异步处理 | 构造+回调 | promise+async+await |
|          |           |                     |

### 使用及实现

```
expross
  |
  |-- lib
  |    | 
  |    |-- expross.js
  |
  |-- test
  |    |
  |    |-- index.js
  |
  |-- index.js
```

##### 路由

````js
// method  path handle
app.get('/',function(req,res){

})
````

1. 维护一个数组 用于存储路由表（一个对象的数组）

   ```
   路由对象：{path,method,handler}
   ```

2. 请求来时从索引i=1遍历路由表，若没匹配上则执行router[0]的默认404返回

````js
app.get('/a',function(req,res,next){
	console.log(1.1)
  next()
},function(req,res,next){
console.log(1.2)
  next()
})
app.get('/a',function(req,res,next){
console.log(2)
 
})
// 1.1  1.2  2
````

- 问题驱动：

1. 每个路由上维护一个路由表数组，存储layer对象
2. layer上维护一个path和路由的dispatch
3. 路由的layer上有route，route中的layer是用于存储path对应的执行函数

