function initTypeOf() {
  
  "Boolean|Number|String|Function|Array|Date|RegExp|Object|Error".split("|").forEach(function (item) {
    this["is" + item] = function (obj) {
      return {}.toString.call(obj) == "[object " + item + "]";
    };
  });

}
class Rege {
  constructor() {
    initTypeOf.call(this)
  }
  getElementsByClassName(str) {
    var eles = document.getElementsByTagName('*');
    var regex = new RegExp("(^|\\s)" + str + "(\\s|$)");
    var result = [];
    for (let i = 0; i < eles.length; i++) {
      const element = eles[i];
      if (regex.test(element.className)) {
        result.push(element)
      }
    }
    return result;
  }
 
}

module.exports = new Rege()