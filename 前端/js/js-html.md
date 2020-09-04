## 小TIP

- file弹框不会堵塞下面的js代码运行

## 方法

### 滚动

```js
element.scrollIntoView({
    behavior: 'smooth',    //平滑滚动，爽，其他还有 instant
    block: 'start'  //元素到页面顶部，其他还有 end, center
})
```





#### 在指定dom前添加元素

```js
/**
newEl 插入的新元素
targetEl  插入在此元素之后，传空则插入到body最后面
**/
function insertAfter(newEl, targetEl = document.body)
{
    var parentEl = targetEl.parentNode;
            
     if(parentEl.lastChild == targetEl)
     {
           parentEl.appendChild(newEl);
      }else
      {
           parentEl.insertBefore(newEl,targetEl.nextSibling);
       }            
}

/**
jq版
insertHtml 插入的新元素
targetClass  插入在此类名dom的第index元素之后
**/
function insert(insertHtml, targetClass,index)
{
    $(".targetClass").eq(index).after(insertHtml);
}
```

