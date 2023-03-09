import {reqAddToCart,reqCartList,reqChangeSkuChecked,reqDeleteSku} from '@/api'
export default {
    namespaced:true,
    state:{
        cartList:[]
    },
    getters:{
        // 选中的商品总价
        totalPrice(state){
            return state.cartList.reduce((prev,curr)=> curr.isChecked ? prev + curr.skuPrice * curr.skuNum : prev , 0)
        },
        // 选中的商品总数
        totalCount(state){
            return state.cartList.reduce((prev,curr)=> curr.isChecked ? prev + curr.skuNum : prev , 0)
        },
        // 是否全选
        isAllChecked(state){
            // arr.every：类似map 给每个元素执行回调 取与
            return state.cartList.length>0 && state.cartList.every( e => e.isChecked)
        },
        // 选中商品的数组
        checkedSkus(state){
            return state.cartList.reduce((prev,curr)=>curr.isChecked ? [...prev,curr] : prev,[])
        }
    },
    actions:{
        // 向购物车中添加商品
        async addToCart(context,{skuId,skuNum}){
            // 当然要加await 不然直接return result就是个空值了 
            const result = await reqAddToCart(skuId,skuNum)
            return result.code === 200 ? '' : Promise.reject(result.message||'添加商品失败')
        },
        // 获取购物车信息
        async getCartList({commit}){
            const result = await reqCartList()
            if(result.code === 200&&result.data[0]){
                const cartList = result.data[0].cartInfoList
                commit('GET_CART_LIST',cartList)
            }

        },
        // 改变购物车中商品是否选中
        async changeSkuChecked(context,{skuId,isChecked}){
            const result = await reqChangeSkuChecked(skuId,isChecked)
            return result.code === 200 ? '' : Promise.reject(result.message || '修改商品选中状态失败')
        },
        // 删除购物车中商品
        async deleteSku(context,skuId){
            const result = await reqDeleteSku(skuId)
            console.log(result);
            return result.code === 200 ? '' : Promise.reject(result.message || '删除商品失败')
            // 或者丢一个error也行
        },
    },
    mutations:{
        GET_CART_LIST(state,data){
            state.cartList = data
        },
    }
}