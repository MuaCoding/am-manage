
/*
*
*全局使用
*
*
* */


let title = t => {
  t = t ? t + " - XXX后台管理平台" : "XXX后台管理平台",
    window.document.title = t
}

let formatDate = t => {
  if (!t)
    return "";
  let n = new Date(t).toJSON();
  return new Date(+new Date(n) + 288e5).toISOString().replace(/T/g, " ").replace(/\.[\d]{3}Z/, "")
}

let formatPrice = (t, n) => {
  0 !== n && (n = n > 0 && n <= 20 ? n : 2),
    t = parseFloat((t + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  for (var e = t.split(".")[0].split("").reverse(), r = t.split(".")[1], o = "", i = 0; i < e.length; i++)
    o += e[i] + ((i + 1) % 3 == 0 && i + 1 !== e.length ? "," : "");
  return 0 === n ? o.split("").reverse().join("") : o.split("").reverse().join("") + "." + r
}


export {title, formatDate, formatPrice}

/*
*
* 独立使用
*
*
* */

export function set_title(t) {
  t = t ? t + " - XXX后台管理平台" : "XXX后台管理平台",
    window.document.title = t
}

//时间格式化
export function patternDate(t) {
  if (!t)
    return "";
  let n = new Date(t).toJSON();
  return new Date(+new Date(n) + 288e5).toISOString().replace(/T/g, " ").replace(/\.[\d]{3}Z/, "")
}


//获取URL参数
export function getUrlParam(a) {
  a = new RegExp("(^|\x26)" + a + "\x3d([^\x26]*)(\x26|$)");
  a = window.location.search.substr(1).match(a);
  return null != a ? unescape(a[2]) : null
}

// //金额格式化
export function formatPrix(t, n) {
  0 !== n && (n = n > 0 && n <= 20 ? n : 2),
    t = parseFloat((t + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  for (var e = t.split(".")[0].split("").reverse(), r = t.split(".")[1], o = "", i = 0; i < e.length; i++)
    o += e[i] + ((i + 1) % 3 == 0 && i + 1 !== e.length ? "," : "");
  return 0 === n ? o.split("").reverse().join("") : o.split("").reverse().join("") + "." + r
}


