/*
订单的交易和支付数据管理
*/
import { reqTradeInfo, reqPayInfo } from '@/api'

export default {
    namespaced:true,
    state:{
        tradeInfo: {}, // 订单交易信息对象
        payInfo: {} // 支付信息对象
        
    },
    mutations:{
        RECEIVE_TRADE_INFO (state, {tradeInfo}) {
            state.tradeInfo = tradeInfo
        },
        RECEIVE_PAY_INFO (state, {payInfo}) {
        state.payInfo = payInfo
        }
    },
    actions:{
        // 获取订单交易信息的异步action
        async getTradeInfo ({commit}) {
            const result = await reqTradeInfo()
            if (result.code===200) {
            const tradeInfo = result.data
            commit('RECEIVE_TRADE_INFO', {tradeInfo})
            }
        },
        // 获取支付信息的异步action
        async getPayInfo ({commit}, orderId) {
            const result = await reqPayInfo(orderId)
            if (result.code===200) {
            const payInfo = result.data
            commit('RECEIVE_PAY_INFO', {payInfo})
            }
        }
    },
    getters:{
        // 总金额
        totalAmount (state) {
            return state.tradeInfo.totalAmount
        }       
    }
}