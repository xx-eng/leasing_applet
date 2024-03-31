import { post } from '@/api/api'
const baseUrl = '/user'

export function updateUserInfo(data) {
    return post(baseUrl + '/updateUserInfo',data)
}

export function updateUserPassword(id, password, newPassword){
    return post(baseUrl + '/updateUserPassword', {id, password, newPassword})
}

export function recharge(userId, money){
    return post(baseUrl+ '/recharge', {userId, money})
}

export function getChatFirmInfo(clientId){
    return post(baseUrl + '/getChatFirmInfo', {clientId})
}

export function getFirmChat(clientId, firmId){
    return post(baseUrl + '/getFirmChat', {clientId, firmId})
}

export function addChat(clientId, firmId, initiator, record){
    return post(baseUrl + '/addChat', {clientId, firmId, initiator, record})
}

export function getMessage(clientId){
    return post(baseUrl + '/getMessage', {clientId})
}