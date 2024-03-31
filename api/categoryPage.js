import { post } from '@/api/api'
const baseUrl = '/user'

export function getSelectGoods(categoryId,pageNumber,pageSize) {
    return post(baseUrl + '/getSelectGoods',{categoryId,pageNumber,pageSize})
}

export function getSelectedGoods(categoryId) {
    return post(baseUrl + '/getSelectedGoods',{categoryId})
}