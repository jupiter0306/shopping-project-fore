import {reqDetailInfo} from '@/api'
const state = {
    detailInfo:{} // 商品详情信息
}
const actions = {
    async getDetailInfo({commit},skuId){
        const result = await reqDetailInfo(skuId)
        if (result.code == 200) commit('GET_DETAIL_INFO',result.data)
    }
}
const mutations = {
    GET_DETAIL_INFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}
const getters = {
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || []
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    skuImageList(state,getters){
        return getters.skuInfo.skuImageList || []
        // return state.detailInfo.skuInfo.skuImageList || []
        // 确实不知道这里为什么用上面这个写法就报错了 我猜是一层undefined可以 两层不行。。？
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}