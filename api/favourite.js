import { post } from '@/api/api'
const baseUrl = '/user'

export function getFavorites(userId) {
    return post(baseUrl + '/getFavorites',{userId})
}