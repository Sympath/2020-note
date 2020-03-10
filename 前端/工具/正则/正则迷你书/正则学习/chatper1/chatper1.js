let regeWrapper = require('./rege')
// yyyy-mm-dd
var str;
var rege;

console.log("=============");
str = '2017-06-31';
rege = regeWrapper['yyyy-mm-dd'];

str = '23:60'; 
rege = regeWrapper['hh-mm'];    

str = '#ffff11'; 
rege = regeWrapper['color']; 

str = 'F:\\abc：\\bcd:.txt\\'; 
rege = regeWrapper['文件路径']; 

str = '<div id="111" class="11112"></div>'; 
rege = regeWrapper['id']; 
console.log(rege);
console.log(rege.test(str));
console.log(str.match(rege));    