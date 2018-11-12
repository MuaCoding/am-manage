import httpService from '../provider/intercept'

// 登陆
export function loginAction(params) {
  return httpService.post('/api/manage/login', params)
}

// 获取用户信息
export function queryUserInfo() {
  return httpService.get('/api/manage/account')
}
