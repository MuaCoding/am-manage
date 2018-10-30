import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './configServices'

import httpService from '../provider/intercept'

// 登陆
export function loginAction(params) {
  return httpService.fetchPost('/api/manage/login',params)
}
