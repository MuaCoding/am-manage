import httpService from '../provider/intercept'

// 登陆
export function loginAction(params) {
  return httpService.post('/api/manage/login', params)
}

// 获取用户信息
export function queryUserInfo() {
  return httpService.get('/api/manage/account')
}

// 获取预约估价
export function queryAppointList(params) {
  return httpService.get('/api/manage/valuation', params)
}

// 获取预约估价详情
export function queryAppointDetail(params) {
  return httpService.get(`/api/manage/valuation/${params}/detail`)
}
