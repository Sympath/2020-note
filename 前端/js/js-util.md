### [url、base64、blob相互转换方法](https://zhuanlan.zhihu.com/p/57700185)



##### 去除js对象中的空值属性

```js
/**
      * 深度去除对象中为空的参数  递归  避免传空时后台未考虑此逻辑而出错
      * obj  需清理的对象
      */
function delDeep(obj){
        for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key];
                    if(!element){
                        delete obj[key]
                    }else if(typeof element === 'object'){
                        delDeep(element)
                    }else {

                    }
                }
            }
      }
```

##### 映射取值 避免增加多余属性，vue无用监听浪费性能

```js
  /**
     * 数组映射 避免增加多余属性，vue无用监听浪费性能
     * arr 原数组
     * keyArr  组成可以有三种： 1.字符串  为所需要的key 2. 数组[key,newKey] 取出需要属性的同时重命名  如data.course.title -> data.title   可传递 ["course.title","title"] 3. 数组 [fn] 只存在一个函数，会传递给它源对象和目标返回对象的指针
     */
    function arrMap(arr,keyArr){

                    return arr.map(originItem=>{
                        let mapItem = {};
                        for (let index = 0; index < keyArr.length; index++) {
                            const key = keyArr[index];
                            // 同时重命名
                            if(typeof key == "object"){
                                try {
                                     mapItem[key[1]] = key[0].split(".").reduce((prev,cur)=>{if(!!prev[cur]){return prev[cur]}else{throw new Error(cur + '不存在')}},originItem)
                                } catch (error) {
                                    console.log(error);
                                    mapItem[key[1]] = ""

                                }
                            }
                            else if(typeof key == 'function'){
                                key(originItem,mapItem)
                            }
                            else {
                                 mapItem[key] = originItem[key];
                            }

                        }
                        return mapItem;
                    })
    }

  /**
     * 对象映射 避免增加多余属性，vue无用监听浪费性能
     * originItem 原对象
     * keyArr  组成可以有三种： 1.字符串  为所需要的key 2. 数组[key,newKey] 取出需要属性的同时重命名  如data.course.title -> data.title   可传递 ["course.title","title"] 3. 数组 [fn] 只存在一个函数，会传递给它源对象和目标返回对象的指针
     */
    function objMap(originItem,keyArr){
            let mapItem = {};
            for (let index = 0; index < keyArr.length; index++) {
                const key = keyArr[index];
                // 同时重命名
                if(typeof key == "object"){
                    try {
                            mapItem[key[1]] = key[0].split(".").reduce((prev,cur)=>{if(!!prev[cur]){return prev[cur]}else{throw new Error(cur + '不存在')}},originItem)
                    } catch (error) {
                        console.log(error);
                        mapItem[key[1]] = ""

                    }
                }
                else if(typeof key == 'function'){
                    key(originItem,mapItem)
                }
                else {
                        mapItem[key] = originItem[key];
                }
            }
            return mapItem
    }


      /**
     * 最终版映射 避免增加多余属性，vue无用监听浪费性能
     * target 源 可以是对象或是数组
     * keyArr  组成可以有三种： 1.字符串  为所需要的key 2. 数组[key,newKey] 取出需要属性的同时重命名  如data.course.title -> data.title   可传递 ["course.title","title"] 3. 数组 [fn] 只存在一个函数，会传递给它源对象和目标返回对象的指针
     */
    function mapUtil(target,keyArr){
                if(Object.prototype.toString.call(target) == '[object Object]'){
                   return objMap(originItem,keyArr)
                }
                else if(Object.prototype.toString.call(target) == "[object Array]") {
                     return arr.map(originItem=>{
                      return objMap(originItem,keyArr)
                    })
                }
          /**
     * 对象映射 避免增加多余属性，vue无用监听浪费性能
     * originItem 原对象
     * keyArr  组成可以有三种： 1.字符串  为所需要的key 2. 数组[key,newKey] 取出需要属性的同时重命名  如data.course.title -> data.title   可传递 ["course.title","title"] 3. 数组 [fn] 只存在一个函数，会传递给它源对象和目标返回对象的指针
     */
    function objMap(originItem,keyArr){
            let mapItem = {};
            for (let index = 0; index < keyArr.length; index++) {
                const key = keyArr[index];
                // 同时重命名
                if(typeof key == "object"){
                    try {
                            mapItem[key[1]] = key[0].split(".").reduce((prev,cur)=>{if(!!prev[cur]){return prev[cur]}else{throw new Error(cur + '不存在')}},originItem)
                    } catch (error) {
                        console.log(error);
                        mapItem[key[1]] = ""

                    }
                }
                else if(typeof key == 'function'){
                    key(originItem,mapItem)
                }
                else {
                        mapItem[key] = originItem[key];
                }
            }
            return mapItem
   	 }

    }
```

##### 解决js中小数计算精度丢失问题（转为整数进行计算）

```js
function accDiv(arg1,arg2){   
 var t1=0,t2=0,r1,r2;   
 try{t1=arg1.toString().split(".")[1].length}catch(e){}   
 try{t2=arg2.toString().split(".")[1].length}catch(e){}   
 with(Math){   
 r1=Number(arg1.toString().replace(".",""))   
 r2=Number(arg2.toString().replace(".",""))  
 return accMul((r1/r2),pow(10,t2-t1));   
 }   
 }  
  //乘法  
  function accMul(arg1,arg2)   
  {   
  var m=0,s1=arg1.toString(),s2=arg2.toString();   
  try{m+=s1.split(".")[1].length}catch(e){}   
  try{m+=s2.split(".")[1].length}catch(e){}   
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)   
  }   
//加法   
function accAdd(arg1,arg2){   
var r1,r2,m;   
try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}   
try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}   
m=Math.pow(10,Math.max(r1,r2))   
return (arg1*m+arg2*m)/m   
}   
//减法   
function Subtr(arg1,arg2){  
    var r1,r2,m,n;  
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
    m=Math.pow(10,Math.max(r1,r2));  
    n=(r1>=r2)?r1:r2;  
    return ((arg1*m-arg2*m)/m).toFixed(n);  
}
```

