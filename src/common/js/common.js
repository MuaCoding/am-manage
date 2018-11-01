
export function getUrlParam(a) {
  a = new RegExp("(^|\x26)" + a + "\x3d([^\x26]*)(\x26|$)");
  a = window.location.search.substr(1).match(a);
  return null != a ? unescape(a[2]) : null
}


