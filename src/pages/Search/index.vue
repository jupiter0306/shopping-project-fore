<template>
  <div>
    <TypeNav />
    <div class="main">
        <div class="py-container">
            <!--bread-->
            <Bread 
            :options="options"
            :removeCategoryName="removeCategoryName"
            :removeKeyword="removeKeyword"
            :removeTrademark="removeTrademark"
            :removeProp="removeProp"/>
            <!--selector-->
            <SearchSelector 
              :setTrademark="setTrademark"
              :addProp="addProp"/>
            <!--details-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li :class="{'active':!isPriceActive}">
                                <a href="javascript:void(0)" @click="setOrder(1)">
                                  综合
                                  <i v-show="!isPriceActive" :class="['iconfont',activeIcon]"></i>
                                </a>
                            </li>
                            <li :class="{'active':isPriceActive}">
                                <a href="javascript:void(0)" @click="setOrder(2)">价格
                                  <i v-show="isPriceActive" :class="['iconfont',activeIcon]"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                            <div class="list-wrap">
                                <div class="p-img">
                                  <router-link :to="`/detail/${good.id}`">
                                    <img v-lazy="good.defaultImg" />
                                  </router-link>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥  </em>
                                        <i>{{good.price}}</i>
                                    </strong>
                                </div>
                                <div class="attr">
                                  <router-link :to="`/detail/${good.id}`" :title="good.title">
                                    {{good.title}}
                                  </router-link>
                                </div>
                                <div class="commit">
                                    <i class="command">已有<span>{{good.hotScore}}</span>人评价</i>
                                </div>
                                <div class="operate">
                                    <a href="javascript:void(0);" @click="addToCart" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- getProductList后不要带括号是因为子组件中触发自定义事件后传的参数会直接在此处使用 -->
                <Pagination
                :currentPage="options.pageNo"
                :pageSize="options.pageSize"
                :total="productList.total"
                :showPageNo="5"
                v-on:changeCurrentPage="getProductList"
                />
            </div>
            <!--hotsale-->
            <div class="clearfix hot-sale">
                <h4 class="title">热卖商品</h4>
                <div class="hot-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_01.png" />
                                </div>
                                <div class="attr">
                                    <em>Apple苹果iPhone 6s (A1699)</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_03.png" />
                                </div>
                                <div class="attr">
                                    <em>金属A面，360°翻转，APP下单省300！</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_04.png" />
                                </div>
                                <div class="attr">
                                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4068.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有20人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="./images/search/like_02.png" />
                                </div>
                                <div class="attr">
                                    <em>Apple苹果iPhone 6s (A1699)</em>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bread from './Bread'
import SearchSelector from './SearchSelector'
import {mapGetters,mapState} from 'vuex'
export default {
  name: "Search",
  components:{
    Bread,
    SearchSelector,   
  },
  data() {
    return {
      options:{
        // 注意默认的初始值 根据数据类型定义 String的定义空串 Array定义空数组 Number定义默认的数字
        'category1Id':'',
        'category2Id':'',
        'category3Id':'',
        'categoryName':'',
        'keyword':'',
        'props':[],
        'trademark':'',
        'order':'1:desc',
        'pageNo':1,
        'pageSize':10,
      }
    }
  },
  computed: {
      ...mapGetters('search',[
        'trademarkList',
        'attrsList',
        'goodsList'       
      ]),
      ...mapState('search',{
        productList:state => state.productList
      }
        
      ),
      // 判断当前active的为升序/降序
      activeIcon(){
        return this.options.order.split(':')[1] === 'asc' ? 'icon-up' : 'icon-down'
      },
      // 判断当前active的是综合/价格
      isPriceActive(){
        return this.options.order.indexOf('2') === 0 
      },
  },
  mounted(){
    this.updateOption()
    this.getProductList()
  },
  watch:{
    // 当前路由发生变化时 更改options 重新发请求
    $route(){
      this.updateOption()
      this.getProductList()
    }
  },
  methods:{
    // 根据当前option发送post请求
    getProductList(pageNo=1){
      // 默认pageNo是1 第一页内容
      this.options.pageNo = pageNo
      this.$store.dispatch('search/getProductList',this.options)
    },
    // 根据query和params来更新options数据
    updateOption(){
      // 解构赋值时，如果解构不成功，默认值会为undefined
      let {category1Id,category2Id,category3Id,categoryName} = this.$route.query
      let {keyword} = this.$route.params
      // 在对象中配合...扩展运算符，后面的（不是undefined的）会覆盖前面的
      this.options = {
        ...this.options,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword
      }
    },
    // setTrademark、addProp 传给searchselector子组件的方法 修改option里的trademark和prop
    setTrademark(trademark){
      this.options.trademark = trademark
      this.getProductList()
    },
    addProp(prop){
      // 先查找是否已添加过该属性
      if(this.options.props.indexOf(prop)!=-1) return 
      this.options.props.push(prop)
      this.getProductList()
    },
    // 删除相关option
    removeCategoryName(){
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // 重新跳转到当前路由,当前路由中的query参数也该删去
      // $route.path不带query参数, 但带params参数(如果有)
      // this.$router.replace({name:'search',params:this.$route.params})
      this.$router.replace(this.$route.path)
    },
    removeKeyword(){
      this.options.keyword = ''
      // 当前路由中的params参数也该删去
      this.$router.replace({name:'search',query:this.$route.query})
    },
    removeTrademark(){
      this.options.trademark = ''
      this.getProductList()
    },
    removeProp(idx){
      // 删除下标为idx的prop
      this.options.props.splice(idx,1)
      this.getProductList()
    },
    setOrder(order1){
      // order2默认降序
      let order2 = 'desc'
      // 如果点击的当前order1项已经是active了 就改当前option的第二项即升降序
      if(this.options.order.indexOf(order1) === 0){
         order2 = (this.options.order.split(':')[1] == 'asc' ? 'desc' : 'asc')
      }
      let order = `${order1}:${order2}`
      this.options.order = order
      this.getProductList()
    },
    async addToCart(){
      let {category1Id,category2Id,category3Id} = this.$route.query
      let skuId = category1Id||category2Id||category3Id
      let skuNum = 1
      this.$store.dispatch('detail/getDetailInfo',skuId)
      window.sessionStorage.setItem('SKU_INFO',JSON.stringify(this.skuInfo))
        try {
          await this.$store.dispatch('cart/addToCart',{skuId,skuNum})
          this.$router.push({
          path:'/addCartSucess',
          query:{skuId,skuNum}
          })
        }catch(e){
          alert(e)
        }
    }
  },


}
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }

      .hot-sale {
        margin-bottom: 5px;
        border: 1px solid #ddd;

        .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 21px;
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          margin: 0;
          padding: 5px 0 5px 15px;
        }

        .hot-list {
          padding: 15px;

          ul {
            display: flex;

            li {
              width: 25%;
              height: 100%;

              .list-wrap {

                .p-img,
                .price,
                .attr,
                .commit {
                  padding-left: 15px;
                }

                .p-img {
                  img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                  }
                }

                .attr {
                  width: 85%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                }

                .price {
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .commit {
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
