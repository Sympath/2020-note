##### brforeEnter

- 执行vuex中定义权限校验mutation
  - 判断本地有没有token，没有直接返回false
  - 如果有，请求接口判断是否正确（jwt），不正确清空本地token，返回false
  - 全通过，返回true