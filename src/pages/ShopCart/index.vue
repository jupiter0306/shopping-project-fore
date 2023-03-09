<template>
    <div class="cart">
        <TypeNav/>
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="item in cartList" :key="item.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="changeChecked(item.skuId,!item.isChecked)">
                    </li>
                    <li class="cart-list-con2">
                        <img v-lazy="item.imgUrl">
                        <div class="item-msg">{{item.skuName}}</div>
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-txt">语音升级款</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{item.skuPrice}}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="changeSkuNum(item.skuId, -1, item.skuNum-1)">-</a>
                        <!-- 这个值得一记 表单要取旧值和新值的时候怎么办 -->
                        <input autocomplete="off" type="text" :value="item.skuNum" @blur="changeSkuNum(item.skuId, $event.target.value-item.skuNum, $event.target.value)" minnum="1" class="itxt">
                        <a href="javascript:void(0)" class="plus" @click="changeSkuNum(item.skuId,1)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{item.skuPrice*item.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="#none" class="sindelet" @click="deleteCurrSku(item.skuId)">删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" v-model="setAllChecked">
                <span>全选</span>
            </div>
            <div class="option">
                <a href="#none" @click="deleteChecked">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{totalCount}}</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{totalPrice}}</i>
                </div>
                <div class="sumbtn">
                    <router-link to="/tradeOrder">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState,mapActions} from 'vuex'
import { throttle } from "lodash"
export default {
    name:'ShopCart',
    mounted(){
        // 挂载时发请求 把购物车列表数据存入仓库
        this.$store.dispatch('cart/getCartList')
    },
    computed:{
        ...mapState('cart',['cartList']),
        ...mapGetters('cart',['totalPrice','totalCount','isAllChecked','checkedSkus']),
        // 在本组件中控制全选与否
        setAllChecked:{
            get(){
                return this.isAllChecked
            },
            async set(newValue){
                let isChecked = newValue ? 1 : 0
                // promises数组 存n个请求 
                const promises = this.cartList.map(e => this.changeSkuChecked({skuId:e.skuId,isChecked}) )
                try{
                    // promise.all 返回新的promise 等所有请求resolve的时候才会resolve / 有一个reject了就reject
                    await Promise.all(promises)
                    this.getCartList()
                }catch(rej){
                    alert(rej)
                }
            }
        }
    },
    methods:{
        ...mapActions('cart',['changeSkuChecked','getCartList','deleteSku','addToCart']),
        // 改变当前项的checked
        changeChecked:
            throttle(async function(skuId,isChecked){
                isChecked = isChecked ? 1 : 0
                try{
                    await this.changeSkuChecked({skuId,isChecked})
                    this.getCartList()
                }catch(e){
                    alert(e)
                } 
            },500),
        // 删掉所有选中的商品
        async deleteChecked(){
            const promises = this.checkedSkus.reduce((prev,curr)=> [...prev,this.deleteSku(curr.skuId)],[])
            try{
                await Promise.all(promises)
                console.log('shanchu ');
                this.getCartList()
            }catch(e){
                alert(e)
            }
        },
        // 删除当前商品
        async deleteCurrSku(skuId){
            try{
                await this.deleteSku(skuId)
                this.getCartList()
            }catch(e){
                alert(e)
            }
        },
        // 修改商品数目
        changeSkuNum:
            throttle(async function(skuId,skuNum,newSkuNum){
                // 最后一个参数检验是否合法
                // 如果是input里改 就直接传$event.target.value 如果是-号里 传旧值-1
                if(newSkuNum < 1) return
                try{
                    await this.addToCart({skuId,skuNum})
                    this.getCartList()
                }catch(e){
                    console.log(e)
                }
            },500)
    },

}
</script>

<style lang="less" scoped>
.cart{
    width: 1200px;
    margin: 0 auto;
    h4{
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }
    .cart-main{
        .cart-th{
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;
            &>div{
                float: left;
            }
            .cart-th1{
                width: 25%;
                input{
                    vertical-align: middle;
                }
                span{
                    vertical-align: middle;
                }
            }
            .cart-th2{
                width: 25%;
            }
            .cart-th3,.cart-th4,.cart-th5,.cart-th6{
                width: 12.5%;
                
            }
        }
        .cart-body{
            margin: 15px 0;
            border: 1px solid #ddd;
            .cart-list{
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;
                &>li{
                    float: left;
                }
                .cart-list-con1{
                    width: 4.1667%;
                }
                .cart-list-con2{
                    width: 25%;
                    img{
                        width: 82px;
                        height: 82px;
                        float: left;
                    }
                    .item-msg{
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }
                .cart-list-con3{
                    width: 20.8333%;
                    .item-txt{
                        text-align: center;
                    }
                }
                .cart-list-con4{
                    width: 12.5%;
                    
                }
                .cart-list-con5{
                    width: 12.5%;
                    .mins{
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                    input{
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }
                    .plus{
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }
                .cart-list-con6{
                    width: 12.5%;
                    .sum{
                        font-size: 16px;
                    }
                }
                .cart-list-con7{
                    width: 12.5%;
                    a{
                        color: #666;
                    }
                }
            }
        }
    }
    .cart-tool{
        overflow: hidden;
        border: 1px solid #ddd;
        .select-all{
            padding: 10px;
            overflow: hidden;
            float: left;
            span{
                vertical-align: middle;
            }
            input{
                vertical-align: middle;
            }
        }
        .option{
            padding: 10px;
            overflow: hidden;
            float: left;
            a{
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }
        .money-box{
            float: right;
            .chosed{
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }
            .sumprice{
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;
                .summoney{
                    color: #c81623;
                    font-size: 16px;
                }
            }
            .sumbtn{
                float: right;
                a{
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                    z-index: 999;
                }
            }
        }
    }
}
</style>