import { post } from '@/api/api'
const baseUrl = '/user'

export function addGoods (data) {
  return post(baseUrl + '/addGoods', data)
}