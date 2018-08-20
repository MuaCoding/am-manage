export function handleError() {
  sessionStorage.setItem("UserName", "");
  this.$Modal.error({
    title: "错误信息",
    content: "您的用户状态已失效，请前往登录页面重新登录",
    onOk: () => {
      this.$router.replace("/login");
    }
  });
}

export function getUrlParam(a) {
  a = new RegExp("(^|\x26)" + a + "\x3d([^\x26]*)(\x26|$)");
  a = window.location.search.substr(1).match(a);
  return null != a ? unescape(a[2]) : null
}


