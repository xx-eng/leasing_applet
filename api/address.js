import { post } from '@/api/api'
const baseUrl = '/user'

export function addAddress(userId,isDefault, province, city, county, street, town, addressInfo) {
    return post(baseUrl + '/addAddress',{userId,isDefault,province, city, county, street, town, addressInfo})
}

export function getFirmAddress(firmId){
    return post(baseUrl + '/getFirmAddress', {firmId})
}

export function deleteAddress(id){
    return post(baseUrl + '/deleteAddress', {id})
}

export function updateAddress(id, userId){
    return post(baseUrl + '/updateAddress', {id, userId})
}