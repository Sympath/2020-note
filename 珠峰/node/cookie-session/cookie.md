```js
res.setHeader('Set-Cookie',['name=cookieName;domain=domain[[.zf.cn]];path=path[[/write]];max-age=time[[10]]'...])
```

- Name  cookie的key
- domain    主域名  一级域名是这个设置值的域名才可以访问到这个cookie
- path 在这个路径下才可以访问到这个cookie
- expires  失效时间 绝对时间 单位是ms
- Max-age  失效时间 相对时间 单位是s
- Httponly    不允许客户端修改

