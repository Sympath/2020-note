### 实现目标

- Mac神器Alfred workflow搭配网易有道实现快速翻译

  1. 中英文互译

  2. 按住cmd+回车，即可发音
  3. 输入侧yd \*可以查询队最近的查询记录

![image-20200422103843675](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2cfraj64j30n605t46n.jpg)

### 基本要求

1. Alfred 必须支持 workflow  （付费or国人破解zzz）附上找了好久的破解版[下载地址](https://macstore.info/a/alfred-4.html)，至于会不会失效就不晓得了
2. github常识

### 实现步骤

1. [下载有道词典workflow](https://github.com/wensonsmith/YoudaoTranslate)

2. 在跳转过去的github页面下拉点击下载解压

   ![image-20200422104655167](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2coadb76j31s00ggjty.jpg)

3. 因为用人家网易有道的翻译，肯定要给人家注册一下，简言之我们后面配置的时候是需要网易有道智云的一个应用的id和secret的，不用担心，个人使用等于免费；步骤很简单，一步步来就好

   1. 进入[网易有道智云官网页面](http://ai.youdao.com/)注册账号

   2. 创建一个自然语言翻译服务：登录有道智云平台后，点击“自然语言翻译”->“创建实例”->“文本翻译”，根据提示信息，完成实例创建。

      ![image-20200422105543535](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2cxg147wj31xc0qk79x.jpg)![image-20200422105641962](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2cygik46j31d60i40u4.jpg)

4. 创建一个应用“应用管理”——“我的应用”——“创建应用”，接入方式选择API，创建应用后会弹框提示，选择刚才创建的文本翻译服务即可

   ![image-20200422105749874](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2czmtaezj324m0u0jy3.jpg)![image-20200422105843225](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2d0jyqfkj31j10u077b.jpg)![image-20200422105909917](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2d10n9zfj31mw0qymzp.jpg)

5. 创建成功了我们就可以在【我的应用】->【点击应用名词】，就拿到应用id和secret了

   ![image-20200422110053133](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2d2tfjpkj31lp0u0n42.jpg)

6. 将解压的文件拖动到Alfred的preferences-》workflows-》左边框

   ![image-20200422104934158](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2cr1564vj30ws0l4gnn.jpg)

7. 拖进来的时候回有一个提示框，将自己的id和secret输入进去，咱们就大功告成啦

   ![image-20200422110301402](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge2d51fg6uj30sg0ev76l.jpg)

8. 如果忘记输入了也没关系，在Alfred的Workflows界面, 选择"Youdao Translate"，在工作流界面的右上方有个图标 ==> "[X]"(中括号包括的字母X)那里添加appkey和secret,点进"[X]"后, 右边列表填入appkey和secret:"youdao_appkey" 和 "youdao_secret",  "netease_password" 和 "netease_username"的值不需要填写

### 特别注意踩坑点

本文是折腾了一天才决定写的，因为网上搜相关配置的置顶文最后一步配置id和secret存在问题（个人未实现，如是个人问题，致歉），会导致一直显示应用id无效；最后，非常感谢那篇文章的【是阿白呀】评论者，我只是总结整理，是他发现了问题所在，表示感谢



