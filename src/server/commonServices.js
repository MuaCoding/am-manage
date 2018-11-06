
import httpService from '../provider/intercept'

// 登陆
export function loginAction(params) {
  return httpService.post('/api/manage/login',params)
}
