## 目标

实现一版Vuex

### 问题驱动

##### vuex官网定义

```
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能
```

![image-20200513204254061](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3wwnzq2j31160scjui.jpg)

##### 抽离关键点

- 集中式存储管理状态 -- 也就意味着可以实现跨组件通信
  - store中定义，commit/dispatch触发
- 专为 Vue.js 应用程序 -- 强依赖vue，这点是和redux最大的区别

实现vuex关键在于实现这两点，当然，这相当于万丈高楼的基石，在此实现之上，必然还有很多其他利于使用者的优化，针对优化，本文将实现：

- getters 的实现：相当于 computed （顺带提一句，面试常问题==watch和computed的区别是什么，应用场景？关键一点，computed有缓存，大话题，下次有机会写篇文章）
- 数据模块化：vuex中可以设modules，分模块定义数据，避免大项目里数据混乱，关键是有时候我们会有动态注入模块的需求，也会实现
- mapState等实现

### 前置知识

- computed会对属性值进行缓存，依赖的值不变，页面取值的时候就不会多次取值多次执行。并且computed中定义的属性会挂在在vue实例上。
- 发布订阅模式：先定义，后触发，我们都应该想到观察者或者发布订阅模式
- Vue.use(pluginObj)默认会调用pluginObj的install方法，并且传递Vue
- 用户传入的配置对象所有属性都会在vm.$option上

### 开始实现

##### 第一版：所有挂载组件的$store全局数据挂载；发布订阅实现store中定义，commit/dispatch触发

###### 看用法

- 定义store.js,导出挂载在main.js中的vue上

  ```js
  import Vue from 'vue'
  import Vuex from './vuex'
  
  Vue.use(Vuex) // 默认会执行当前插件的install方法
  
  // 通过 Vue中的一个属性 Store 创建一个store的实例
  export default new Vuex.Store({
    state: {// 单一数据源  data
      age:10
    },
    strict:true,
    getters:{ // computed
      myAge(state){ // 以前用vue中的计算属性
        return state.age + 20
      }
    },
    // 更新状态的唯一方式就是通过mutation
    mutations: { // mutation更改状态只能采用同步（严格模式下使用）  // method
      // payload 载荷
      syncChange(state,payload){ // 修改状态的方法 同步的更改
        state.age += payload
      }
    },
    actions: {
      asyncChange({commit},payload){
        setTimeout(() => {
          commit('syncChange',payload)
        }, 1000);
      }
    }
  })
  // main.js
  import Vue from 'vue'
  import App from './App.vue'
  import store from './store' //  引入了一个store文件
  
  Vue.config.productionTip = false
  
  new Vue({
    name:'root',
    store, // 在vue初始化的过程中 注入了一个store属性, 内部会将这个属性放到每个组件的$store上
    render: h => h(App)
  }).$mount('#app')
  
  
  ```

  