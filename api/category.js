import { post } from '@/api/api'
const baseUrl = '/user'

export function getACategory(parentId) {
    return post(baseUrl + '/getACategory',{parentId})
}


