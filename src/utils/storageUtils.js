import { nanoid } from 'nanoid'

const USER_TEMP_ID_KEY = 'user_temp_id_key'
const USER_INFO_KEY = 'user_info_key'
// 获取临时id
export const getUserTempId = ()=>{
    // 从localstorage中读取用户id
    let userTempId = localStorage.getItem(USER_TEMP_ID_KEY)
    // 如果为空 生成uuid存入localstorage里
    if(!userTempId){
        userTempId = nanoid()
        localStorage.setItem(USER_TEMP_ID_KEY,userTempId)
    }
    return userTempId
}
// 将userInfo存入localstorage
export const setUserInfo = (userInfo)=>{
    localStorage.setItem(USER_INFO_KEY,JSON.stringify(userInfo))
}
export const removeUserInfo = ()=>{
    localStorage.removeItem(USER_INFO_KEY)
}
// 返回localstorage中的USER_INFO_KEY对象
export const getUserInfo = ()=>{
    return JSON.parse(localStorage.getItem(USER_INFO_KEY)) || {}
}