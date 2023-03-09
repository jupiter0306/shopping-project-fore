import { reqProductList } from "@/api"
const state = {
    // product信息 查看api可知返回的是一个对象
    productList:{}
}
const actions = {
    async getProductList({commit},params){
        // 去除params中key为空的元素
        Object.keys(params).forEach(e=>{
            if(!e) delete params[e]
        })
        const result = await reqProductList(params)
        if(result.code == 200) commit('GET_PRODUCT_LIST',result.data)
    }
}
const mutations = {
    GET_PRODUCT_LIST(state,data){
        state.productList = data
    }
}
const getters = {
    // 品牌列表
    trademarkList(state){
        // 异步请求之前 productList是空对象 考虑网速慢情况 为防止trademarkList返回undefined 导致界面v-for遍历报错
        return state.productList.trademarkList || []
    },
    // 属性列表
    attrsList(state){
        return state.productList.attrsList || []
    },
    // 商品列表
    goodsList(state){
        return state.productList.goodsList || []
    },

}
export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}