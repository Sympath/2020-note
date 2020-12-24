# 前言

**Typora** 作为 Markdown编辑器的扛把子，终于更新支持图片自动上传并返回相应的链接。废话不多说，直接看下面效果：

![an-4](https://imgconvert.csdnimg.cn/aHR0cDovL2ltYWdlLnRhbnNoYW5nYmlhby5jbi9hbi00LmdpZg)

看这效果有木有很爽，以后写博客直接导入就OK，妈妈再也不用担心我为图片路径问题发愁了。

# Typora 前期准备

##### 确保 **Typora** 已经升级到 0.9.89 或更高：

![image-1](https://imgconvert.csdnimg.cn/aHR0cDovL2ltYWdlLnRhbnNoYW5nYmlhby5jbi9pbWFnZS0xLnBuZw?x-oss-process=image/format,png)

##### `picgo`安装（这个可以理解为上传云端的工具）

```sh
npm install picgo -g
# or
yarn global add picgo
```

##### typora配置picgo命令

###### 找到picgo命令存放位置，其实也就是全局包放置在哪

```sh
npm config get prefix

/c/Users/Administrator/AppData/Roaming/npm/picgo
```

表示在`C:\Users\Administrator\AppData\Roaming\npm`目录中。

###### 在typora中进行配置

文件-》偏好设置：

![image-20200506101006138](https://imgconvert.csdnimg.cn/aHR0cDovL3Fpbml1aW1nLnhpYW94aWFvbWluZy54eXovaW1ncy9pbWFnZS0yMDIwMDUwNjEwMTAwNjEzOC5wbmc?x-oss-process=image/format,png)

上传服务选择 Custom Command，自定义命令填入：

```
c:/Users/Administrator/AppData/Roaming/npm/picgo upload
```

# 配置文件 配置

1. 回到 **偏好设置** 打开配置文件，填写下面提供的配置项。（打开配置文件可以先将上传服务改为【PicGo-Core(command line) 】这样下面就会出现【打开配置文件】的按钮，记得后面改回上文的配置）

![image-20200527100603979](https://imgconvert.csdnimg.cn/aHR0cDovL2ltYWdlLnRhbnNoYW5nYmlhby5jbi9pbWFnZS0yMDIwMDUyNzEwMDYwMzk3OS5wbmc?x-oss-process=image/format,png)

1. 配置简介

```json
{
  "picBed": {
    "uploader": "qiniu",// 所选云
    "qiniu": { 
      "accessKey": "", //  秘钥
      "secretKey": "", // 秘钥
      "bucket": "", // 存储空间名称
      "url": "", // 存储空间域名，需要加上 http
      "area":  "",  // 存储区域编号
      "options": "", // 网站后缀（选填）
      "path": ""  // 自定义存储路径（选填）
    }
  },
  "picgoPlugins": {}
}
123456789101112131415
```

存储区域对应的编码：

- 华东：`z0`
- 华北：`z1`
- 华南：`z2`

注意：

- 选了那个区域就填相应的编码   参数从七牛云空间中获取，可见此文[七牛云新建空间并获取信息]()  ; 
- 七牛云默认会给一个30天的测试域名，这意味着你最好先在七牛云空间绑定自己的域名；
  - 如果没有域名，建议申请一个，流程可见此文[阿里云服务器申请、域名申请及备案]()
  - 如果有域名，一般都是用于自己的服务器，那我们就可以使用二级域名为七牛云进行绑定，可见此文[阿里云配置二级域名并绑定七牛云]()

##### 完整配置

![image-20200527103342944](https://imgconvert.csdnimg.cn/aHR0cDovL2ltYWdlLnRhbnNoYW5nYmlhby5jbi9pbWFnZS0yMDIwMDUyNzEwMzM0Mjk0NC5wbmc?x-oss-process=image/format,png)

##### 测试上传

- 回到偏好设置

![image-20200527103630070](https://imgconvert.csdnimg.cn/aHR0cDovL2ltYWdlLnRhbnNoYW5nYmlhby5jbi9pbWFnZS0yMDIwMDUyNzEwMzYzMDA3MC5wbmc?x-oss-process=image/format,png)

- 测试成功如下，如果没有，请检查配置文件是否保存，或者是哪个步骤漏了。

![image-20200527103538246](https://imgconvert.csdnimg.cn/aHR0cDovL2ltYWdlLnRhbnNoYW5nYmlhby5jbi9pbWFnZS0yMDIwMDUyNzEwMzUzODI0Ni5wbmc?x-oss-process=image/format,png)
