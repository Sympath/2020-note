### 唤起：是指在h5页面传递特定参数跳转到app某一指定页面

##### 方法封装（只需在合适的事件触发时机调用此方法，传递title，type、module和turn_uri即可，如果懒的理解可以直接用，不过建议看下下面的详解，免得出错）

```
 showDraw: function(title = '活动标题',type,module,turn_uri) {
                    if (this.from === 'app') {
                        let data = {
                            title,
                            type,
                            module,
                            turn_uri: JSON.stringify(turn_uri)
                        }
                        if (window.webkit) {
                           window.webkit.messageHandles.CopyText.postMessage(JSON.stringify(data));
                        } else {
                            window.CopyText.postMessage(JSON.stringify(data))
                        }
                    } else {
                    	# 自行更改，此处为h5用户触发事件，基本是弹框引导或直接跳转至应用商城，即goApp方法
                        this.show_mask = true;
                        this.show_toast = true;
                    }
                },
goAPP() {window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.lanqb.teach"}
                },
```

#### 详解

1. 准备跳转页面对应所需参数

    # 实例

   ```
   let data = {
                            title: '活动title',
                               type: 4,
                               module: "sns_topics",
                               turn_uri:  JSON.stringify({
                               	活动标签对象
                               })
                           }
   ```

    # data对象只需要修改type、module和turn_uri；这三个数据对应如下

   ```
   type:
   3:应用内（详情页）
   4:应用内（发布页）
   
   type:3
   module:				turn_uri:id
   sns_topics:作品详情页		作品详情页ID
   sns_talks:讨论详情页			讨论详情页ID
   sns_draw:指绘详情页			指绘详情页ID
   expert_come:大触来了详情页	大触来了详情页ID
   live_show:直播好课详情页		直播好课详情页ID
   videos:视频教程详情页		视频教程详情页
   
   type:4
   module:				turn_uri:{“activity_id”:“活动ID”,”label_name”:”活动标签”}
   sns_topics:发布作品			
   sns_talks:发布讨论
   sns_draw:发布指绘
   ```

2. 调用逻辑判断，发起唤起请求

   ```
   if (window.webkit) {                        window.webkit.messageHandles.CopyText.postMessage(JSON.stringify(data));
                           } 
            else {
                               window.CopyText.postMessage(JSON.stringify(data))
                           }
   ```