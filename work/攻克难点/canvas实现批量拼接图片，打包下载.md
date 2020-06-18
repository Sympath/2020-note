### 亮点

- 结合webworker，在work线程完成canvas的toBlob
- OffscreenCanvas的使用

### 实现功能

##### 用户端

一键点击批量下载，用户上传图拼接用户评论、公司logo等信息的新图

##### 实现

- canvas进行像素级处理，拼接；
- 批量耗性能，所以将canvas生成图的imageData交至webworker中处理，利用OffscreenCanvas生成toBlob流返回给主线程
- 根据blob流，基于jszip+FileSaver生成压缩包

### 实现的整理和抽离

#### jsZip+FileSaver的使用

##### 引入

```js
<script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/jszip/3.3.0/jszip.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.js"></script>
```

##### 函数封装

图片转base64

```js
/**
 * 将图片转换成base64 并返回路径
 * @param img
 * @param {number} width 调用时传入具体像素值，控制大小 ,不传则默认图像大小
 * @param {number} height
 * @returns {string}
 */
function getBase64Image(url,width = 0,height = 0) {
     const image = new Image();
      image.crossOrigin = '*';
      image.src = url;
       return new Promise(function (resolve, reject) {
          image.onload =function (){
               const canvas = document.createElement('canvas');
                canvas.width = width ? width : image.width;
                canvas.height = height ? height : image.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL();


                  resolve(dataURL);//将base64传给done上传处理


            }
         });
   
  }
```

校验是否是base64

```js
/**
 * 检查是不是Base64
 * @param img
 * @returns {boolean}
 */
function IsBase64(img) {
    // jpg jpeg png gif
    const _img = img.toLowerCase();
    if (_img.endsWith('jpg') || _img.endsWith('jpeg') || _img.endsWith('png') || _img.endsWith('gif') )  return false;
    return true;
  }
```

jsZip+filesave使用

```js
/**
 * 压缩图片
 */
function setBase64Img(zip, imgFolder, base64, imgArr, index, downloadName) {
    base64 = base64.split('base64,')[1];
    imgFolder.file(downloadName + '_' + index + '.png', base64, { base64: true });
    if (index === imgArr.length - 1) {
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, downloadName + '.zip');
      });
    }
  }


/**
 * 下载压缩图片
 * @param {any[]} imgArr  图片合集
 * @param {string} imgKey  如果不是单纯的图片路径 需要传入路径的key
 */
export function downloadZipImage (imgArr,  downloadName = 'img') {
    if (!imgArr || !imgArr.length) {
      return;
    }
    const zip = new JSZip();
    // 创建images文件夹
    const imgFolder = zip.folder('images');
   
    let index = 0; //  判断加载了几张图片的标识
    for (let i = 0;i < imgArr.length;i++) {
      const itemImg = imgArr[i];
      /**
       * 如果是Base64就不需要再做异步处理了 可能传过来的是一个promise
       */
      const Base64Img = getBase64(itemImg);
      if (Base64Img['then']) {
        Base64Img['then'](function(base64){
          setBase64Img(zip, imgFolder, base64, imgArr, index, downloadName);
          index++;
        },function(err){
          console.log(err);//打印异常信息
        });
      } else {
        setBase64Img(zip, imgFolder, Base64Img, imgArr, index, downloadName);
        index++;
      }
    }
}
```



#### 一些工具函数

##### 绘制圆角矩形

```js
/**该方法用来绘制一个有填充色的圆角矩形 
 *@param cxt:canvas的上下文环境 
    *@param x:左上角x轴坐标 
    *@param y:左上角y轴坐标 
    *@param width:矩形的宽度 
    *@param height:矩形的高度 
    *@param radius:圆的半径 
    *@param fillColor:填充颜色 
    **/
function fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
    //圆的直径必然要小于矩形的宽高          
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边  
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值  
    cxt.fill();
    cxt.restore();
}
function drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI  
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线  
    cxt.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI  
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线  
    cxt.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI  
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

    //上边线  
    cxt.lineTo(width - radius, 0);

    //右上角圆弧  
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

    //右边线  
    cxt.lineTo(width, height - radius);
    cxt.closePath();
}
```

##### 绘制多行文本

```js
/**
 * @param {Object} ctx canvas上下文
 * @param {String} text 需要输入的文本
 * @param {Number} x X轴起始位置
 * @param {Number} y Y轴起始位置
 * @param {Number} maxWidth 单行最大宽度
 * @param {Number} lineHeight 行高
 */
function drawText(ctx, text, x, y, lineHeight,fontSize, maxWidth) {
    let arrText = text.split('');
    let line = '';
    ctx.font = `${fontSize}px Simsun`;
    for (let n = 0; n < arrText.length; n++) {
        let testLine = line + arrText[n];
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = arrText[n];
            y += lineHeight;
         } else {
            line = testLine;
         }
    }
    
    ctx.fillText(line, x, y);
}

```

