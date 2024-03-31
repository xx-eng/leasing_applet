import { post } from '@/api/api'
const baseUrl = '/user'

export function getAllAddress(userId) {
    return post(baseUrl + '/getAllAddress', {userId})
}

export function getDefaultAddress(userId) {
    return post(baseUrl + '/getDefaultAddress', {userId})
}

export function getUserInfo(id) {
    return post(baseUrl + '/getUserInfo', {id})
}

export function addOrder(userId,goodsId, type, rentTime,startTime,endTime, rental, contranctId, userAddr) {
    return post(baseUrl + '/addOrder', {userId,goodsId,type, rentTime,startTime,endTime, rental, contranctId, userAddr})
}

export function addSchoolOrder(userId,goodsId,rentTime,rental){
	return post(baseUrl + '/addSchoolOrder', {userId,goodsId,rentTime,rental})
}

export function pay(id){
    return post(baseUrl+ '/pay', {id})
}

export function schoolPay(id){
	return post(baseUrl + '/schoolPay', {id})
}

export function continuePay(id){
    return post(baseUrl+ '/continuePay', {id})
}