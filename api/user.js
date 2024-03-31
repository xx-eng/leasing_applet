import { baseDel, baseJudge, post } from '@/api/api.js'
import { baseEdit, baseList } from '@/api/api'

const baseUrl = '/user'

/**
 * 用户登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login (data) {
    return post(baseUrl + '/login', data)
}


/**
 * 获取用户信息
 * @returns {AxiosPromise}
 */
export function getInfo () {
    return post(baseUrl + '/getInfo')
}

/**
 * 用户登出
 * @returns {AxiosPromise}
 */
export function logout () {
    return post(baseUrl + '/logout')
}

export function add(data){
    return post(baseUrl + '/add', data)
}

export function addFirm(data){
    return post('/firm' + '/add', data)
}

export function updateUserPassword(id, password, newPassword) {
    return post(baseUrl + '/updateUserPassword', {id, password, newPassword})
}

export function addUserGoods (data) {
  return post(baseUrl + '/addUserGoods', data)
}

export function getAllSchoolGoods(){
	return post(baseUrl + '/getAllSchoolGoods')
}

export function getUserSchoolGoods(userId){
	return post(baseUrl + '/getUserSchoolGoods', {userId})
}

export function deleteUserGoods(id){
	return post(baseUrl + '/deleteUserGoods', {id})
}

export function updateGoods(data) {
    return post(baseUrl + '/updateGoods',data)
}
