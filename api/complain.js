import { post } from '@/api/api'
const baseUrl = '/user'

export function addComplain(userId, firmId, target, feedbackType, content, pictureId, pictureName) {
    return post(baseUrl + '/addComplain', {userId, firmId, target, feedbackType, content, pictureId, pictureName})
}
