#### 遍历器接口

可以被遍历（通过索引进行，for in不属于 ）的对象上必须有一个属性`Symbol.iterator`,值是一个函数，数组默认存在 

```js
// 自实现 迭代器属性
obj[Symbol.iterator] = function (){
	let i = 0;
	return {
		next : ()=>{
			return {
        value : this[i],
        done : (
        	i++ === this.length
        )
      }				
		}
	}
}

```

