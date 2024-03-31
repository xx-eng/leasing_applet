import { post } from '@/api/api'
const baseUrl = '/user'

export function getGoodsInfo(id) {
    return post(baseUrl + '/getGoodsInfo',{id})
}

export function addFavorites(userId,goodsId) {
    return post(baseUrl + '/addFavorites', {userId,goodsId})
}

export function getAllComments(goodsId){
    return post(baseUrl + '/getAllComments', {goodsId})
}