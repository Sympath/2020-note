### 参数

- opts对象
  - uploadDir   上传文件的存放地址

### 实现

1. ctx.req上监听data、end事件 收集buffer数组
2. 实现buffer的split事件
   1. 将分隔符sep通过Buffer.from转为buffer类型 取得length
   2. while循环遍历buffer，
3. 对allData（收集到的数组）进行分割并slice(1,-1)获取行数组
4. 遍历lines

### 特点

- 针对koa1实现的文件上传处理插件 在使用时需要用koa-convert进行转换

