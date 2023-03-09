import * as storageUtils from '@/utils/storageUtils'
import { reqLoginUser} from '@/api'

export default {
    namespaced:true,
    state:{
        userTempId:storageUtils.getUserTempId(),
        userInfo:storageUtils.getUserInfo()
    },
    actions:{
        async getLoginUser({commit},{phone,password}){
            const result = await reqLoginUser(phone,password)
            if(result.code === 200){
                storageUtils.setUserInfo(result.data)
                commit('GET_LOGIN_USER',result.data)
                return ''
            }else return Promise.reject(result.message || '登录失败')
        },
        removeLoginUser(context){
            // 退出登录 清空仓库中的userInfo和localstorage中保存的token
            context.state.userInfo = {}
            storageUtils.removeUserInfo()
        }
        
    },
    mutations:{
        GET_LOGIN_USER(state,payload){
            state.userInfo = payload
        }
    }

}