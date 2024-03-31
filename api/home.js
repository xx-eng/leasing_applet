import { post } from '@/api/api'
const baseUrl = '/user'

export function getAllAdvert() {
    return post(baseUrl + '/getAllAdvert',{})
}

export function getAllCategory(){
    return post(baseUrl + '/getAllCategory', {})
}

export function getPopularGoods(){
    return post(baseUrl + '/getPopularGoods', {})
}

export function getNewGoods(){
    return post(baseUrl + '/getNewGoods', {})
}
