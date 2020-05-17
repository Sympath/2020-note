### 定义

JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案

### 特点

- 不需要再服务器端存储任何信息
- 由三部分组成（注意base64中的/=+在url中并不是安全的，存在歧义，所以需要将之进行替换，将base64转为url安全的base64）
  - head   固定的对象
  - payload    内容转成base64  
  - token   用header和payload放在一起组成一个签名

### 实现

- 访问服务器时，服务器会通过密钥生成一个token



```js
let jwt = {
  base64URLEscape(content){
    return content.replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
  },
  toBasw64(content){
    return this.base64URLEscape(Buffer.from(JSON.stringify(content)).toString('base64'));
  },
  sign(content,secret){
    
  },
  encode(username,secret){
    let header = this.toBase64({
      typ: 'JWT',alg: 'HS256'
    })
    let payload = this.toBase64(username);
    let sign = this.sign([header,payload].join('.'),secret)
    return [header,payload,sign].join('.')
  }
}
```

