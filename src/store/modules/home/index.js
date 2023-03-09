import { reqCategoryList,reqBanners,reqFloors } from "@/api"

const state = {
    categoryList:[],
    banners:[],
    floors:[],
}

const actions = {
    async getCategoryList({commit}){
        const result = await reqCategoryList()
        if(result.code === 200) {commit('GET_CATEGORY_LIST',result.data)}
    },
    async getBanners({commit}){
        const result = await reqBanners()
        if(result.code == 200) commit('GET_BANNERS',result.data)
    },
    async getFloors({commit}){
        const result = await reqFloors()
        if(result.code == 200) commit('GET_FLOORS',result.data)
    },
}
const mutations  = {
    GET_CATEGORY_LIST(state,data){
        state.categoryList = data
    },
    GET_BANNERS(state,data){
        state.banners = data
    },
    GET_FLOORS(state,data){
        state.floors = data
    }
}
const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,getters
}