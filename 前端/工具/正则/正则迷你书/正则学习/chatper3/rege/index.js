module.exports = {
  '替换': /(\d{4})-(\d{2})-(\d{2})/,
  '匹配多种时间格式': /\d{4}(-|\/|.)\d{2}\1\d{2}/,
  'trim': function (str) {
    // return str.replace(/^\s+|\s+$/g,'')
    return str.replace(/^\s*(.*?)\s*/g, '$1')
  },
  'titleize': function (str) {
    return str.toLowerCase().replace(/(^|\s)\w/g, function (c) {
      return c.toUpperCase();
    })
  },
  'camelize': function (str) {
    return str.replace(/[-_\s]+(.)?/g, function (match, c) {
      return c ? c.toUpperCase() : '';
    })
  },
  'dasherize': function (str) {
    return str.replace(/[A-Z]/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
  },
  'escapeHTML': function (str) {
    var escapeChars = {
      '<': 'lt',
      '>': 'gt',
      '"': 'quot',
      '&': 'amp',
      '\'': '#39'
    }
    return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'),
      function (match) {
        return '&' + escapeChars[match] + ';'
      })
  },
  'unescapeHTML': function (str) {

    var htmlEntities = {
      nbsp: ' ',
      lt: '<',
      gt: '>',
      quot: '"',
      amp: '&',
      apos: '\''
    };
    return str.replace(/\&([^;]+);/g, function (match, key) {
      if (key in htmlEntities) {
        return htmlEntities[key];
      }
      return match;
    });
  }
  
}