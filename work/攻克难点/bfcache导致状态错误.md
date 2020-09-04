### bfcache

```
bfcache，即back-forward cache，可称为“往返缓存”，可以在用户使用浏览器的“后退”和“前进”按钮时加快页面的转换速度。这个缓存不仅保存页面数据，还保存了DOM和JS的状态，实际上是将整个页面都保存在内存里。如果页面位于bfcache中，那么再次打开该页面就不会触发onload事件
```

在A->B->A 的情况下 A页面回直接从缓存获取 不刷新页面，也不获取接口新数据，此时页面状态错误；

##### 问题现象

- 同事实现倒计时活动页面，采用服务器端时间（接口response.date作为起始时间，接口返回结束时间）进行倒计时处理，测试同事进入活动页后，通过返回键再次进入活动页面时，倒计时会不更新（即服务器起始时间不更新而采用上一次请求时间）

##### 发现思路

- 数据未更新，查看请求正常200；排除接口问题
- 考虑缓存问题，查看控制台，发现接口来源显示是dask cache，即硬盘缓存
- 考虑硬盘缓存有两种情况
  - 服务端no-store
  - 浏览器端bfcache
- 因正常操作无问题，缓存现象只在返回键返回时触发，进一步了解bfcache后决定问题

##### 解决思路

判断中转页面入口 A->B->C   若AC相同，则可能会触发bfcache导致浏览器直接从diskcache中获取之前状态而不请求新数据，这种情况下载页面最开始渲染时就重刷。

1. 找到bfcache也会触发的钩子事件  ====   pageshow
2. 找到钩子事件中区分正常加载和bfcache加载的区别     ==== pageshow的事件参数对象存在  persisted属性  若是bfcache加载的，则会为true
3. 特殊处理

解决办法，监听page事件，如果是这种页面栈跳转情况，就强制再刷新一次

```js
  window.addEventListener('pageshow', function(e) {
      if (e.persisted || (window.performance && 
      window.performance.navigation.type == 2)) {
      location.reload()
    }
    })
    window.addEventListener('pagehide', function(e) {
      var dom = document.body;
      dom.children.remove();
      setTimeout(function() {
        dom.appendChild("<script type='text/javascript'>window.location.reload(true);<\/script>");
      });
    });

```

