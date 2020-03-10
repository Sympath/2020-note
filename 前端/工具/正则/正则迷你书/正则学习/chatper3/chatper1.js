let regeWrapper = require('./rege')
// yyyy-mm-dd
var str;
var rege;

console.log("=============");
str = '2017-06-12';
rege = regeWrapper['替换'];

// console.log(str.replace(rege,'$2/$3/$1'));
str = '2017-06-12';
rege = regeWrapper['匹配多种时间格式'];

str = '   2017-06-12   ';
rege = regeWrapper['trim'];


str = 'my name is wzy';
rege = regeWrapper['titleize'];

str = '-moz-transform';
rege = regeWrapper['camelize'];

console.log( regeWrapper['escapeHTML']('<div>Blah blah blah</div>') );
// console.log(rege);
// console.log(rege.test(str));
// console.log(rege(str));
// // console.log(str.match(rege));    
// console.log(str.replace(rege,','));
// console.log(regeWrapper['货币格式化'](1888));

