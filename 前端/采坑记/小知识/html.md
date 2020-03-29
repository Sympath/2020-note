#### 页面奇怪渲染

- [inline-block级别元素之间莫名多出了4px（谷歌浏览器）的缝隙](https://www.cnblogs.com/diantao/p/6052355.html)
  - 原因：html源码中的换行等会被解析合并成一个空格，即js中nodeType为3的空白节点，不同浏览器对之渲染的结果不同，谷歌浏览器是4px

