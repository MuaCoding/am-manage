//获取URL参数
export function getUrlParam(a) {
  a = new RegExp("(^|\x26)" + a + "\x3d([^\x26]*)(\x26|$)");
  a = window.location.search.substr(1).match(a);
  return null != a ? unescape(a[2]) : null
}

//时间格式化
export function formatDate(date, fmt) {
  var date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
