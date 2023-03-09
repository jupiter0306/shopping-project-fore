import store from '@/store'

export default [
    {
        path:'/',
        name:'home',
        component:()=>import('../pages/Home'),
        meta:{
            isFooterShow:true,
        }
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../pages/Login'),
        beforeEnter: (to, from, next) => {
            // 未登录时才能跳转到login 否则跳转到首页
            if(!store.state.user.userInfo.token) next()
            else next('/')
        }
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('../pages/Register'),
        meta:{
            isFooterShow:true,
        }
    },
    {
        path:'/search/:keyword?',
        name:'search',
        component:()=>import('../pages/Search'),
        meta:{
            isFooterShow:true,
        }
    },
    {
        path:'/detail/:skuId',
        name:'detail',
        component:()=>import('../pages/Detail'),
        meta:{
            isFooterShow:true,
        }
    },
    {
        path:'/addCartSuccess',
        name:'addCartSuccess',
        component:()=>import('../pages/AddCartSuccess'),
        meta:{
            isFooterShow:true,
        },
        // 只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
        beforeEnter(to,from,next){
            let {skuNum} = to.query
            let skuInfo = sessionStorage.getItem('SKU_INFO')
            if(skuNum>0 && skuInfo) next()
            else next('/')
        }
    },
    {
        path:'/shopCart',
        name:'shopCart',
        component:()=>import('../pages/ShopCart'),
        meta:{
            isFooterShow:true,
        }
    },
    {
        path:'/payOrder',
        name:'payOrder',
        component:()=>import('../pages/PayOrder'),
        // 只有从交易界面才能到支付界面
        beforeEnter(to,from,next){
            if( from.path==='/tradeOrder' ) next()
            else next('/tradeOrder')
        }
    },
    {
        path:'/tradeOrder',
        name:'tradeOrder',
        component:()=>import('../pages/TradeOrder'),
        // 只有从购物车才能到交易界面
        beforeEnter(to,from,next){
            if( from.path==='/shopCart' ) next()
            else next('/shopCart')
        }
    },
    {
        path:'/paySuccess',
        name:'paySuccess',
        component:()=>import('../pages/PaySuccess'),
        // 只有从支付界面, 才能跳转到支付成功的界面
        beforeEnter(to,from,next){
            if( from.path==='/payOrder' ) next()
            else next('/payOrder')
        }
   
    },
    {
        path:'/center',
        name:'center',
        component:()=>import('../pages/Center'),
        children:[
            {
                path:'myOrder',
                name:'myOrder',
                component:()=>import('../pages/Center/MyOrder'),
            }
        ]
    },
]
