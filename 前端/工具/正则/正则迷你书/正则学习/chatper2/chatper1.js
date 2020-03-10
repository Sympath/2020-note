let regeWrapper = require('./rege')
// yyyy-mm-dd
var str;
var rege;

console.log("=============");
str = '1234 56789';
rege = regeWrapper['数字千分位'];

console.log(rege);
// console.log(rege.test(str));
// console.log(str.match(rege));    
console.log(str.replace(rege,','));
console.log(regeWrapper['货币格式化'](1888));

