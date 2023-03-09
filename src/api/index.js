import ajax from './ajax'
import ajaxmock from './ajaxmock'

// 获取首页导航栏商品品类列表
export const reqCategoryList = ()=>ajax.get('/product/getBaseCategoryList') 
// 获取首页banners数据
export const reqBanners = ()=>ajaxmock.get('/banners')
// 获取首页floors数据
export const reqFloors = ()=>ajaxmock.get('/floors')
// 获取search页展示商品列表
export const reqProductList = (params)=>ajax({
    method:'post',
    url:'/list',
    data:params
})
// 获取detail页商品详情
export const reqDetailInfo = (skuId)=>ajax.get(`/item/${skuId}`)
// 向购物车中添加商品
export const reqAddToCart = (skuId,skuNum)=>ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车列表 接口出问题了用一下mock
export const reqCartList = ()=>ajax.get('/cart/cartList')
// 改变购物车中商品选中信息
export const reqChangeSkuChecked = (skuId,isChecked)=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 删除购物车商品
export const reqDeleteSku = (skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)
// 获取注册验证码
export const getRegisterCode = (phone)=>ajax.get(`/user/passport/sendCode/${phone}`)
// 注册用户 
export const reqRegisterUser = (phone,password,code)=>ajax.post('/user/passport/register',{phone,password,code})
// 发送登录请求 返回token
export const reqLoginUser = (phone,password)=>ajax.post('user/passport/login',{phone,password})
// 获取订单交易页信息
export const reqTradeInfo = () => ajax.get('/order/auth/trade')
// 提单订单
export const reqSubmitOrder = (tradeNo, orderInfo) => ajax({
  method: 'POST',
  url: '/order/auth/submitOrder',
  params: {tradeNo},
  data: orderInfo
})
// 获取订单支付信息
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`) 
// 查询支付订单状态
export const reqOrderStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取我的订单列表
export const reqMyOrders = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)



