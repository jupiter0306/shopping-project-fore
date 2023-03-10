<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" >
      <h2 class="all" >全部商品分类</h2>
      <nav class="nav">
        <a href="javascript:void(0);">服装城</a>
        <a href="javascript:void(0);">美妆馆</a>
        <a href="javascript:void(0);">尚品汇超市</a>
        <a href="javascript:void(0);">全球购</a>
        <a href="javascript:void(0);">闪购</a>
        <a href="javascript:void(0);">团购</a>
        <a href="javascript:void(0);">有趣</a>
        <a href="javascript:void(0);">秒杀</a>
      </nav>
      <div class="sort" v-show="$route.name === 'home'">
        <div class="all-sort-list2" @click="goSearch" @mouseleave="delActive">
          <!-- 一级分类 -->
          <div
            class="item"
            v-for="(item, index) in categoryList"
            :key="item.categoryId"
          >
            <h3
              @mouseover="addActive(index)"  
              :style="{ background: index == currentIndex ? 'skyblue' : '' }"
              :data-category-name="item.categoryName"
              :data-category1-id="item.categoryId"
            >
              {{ item.categoryName }}
            </h3>
            <div
              class="item-list clearfix" 
              v-show="index == currentIndex"             
            >
              <div class="subitem">
                <!-- 二级分类 -->
                <dl
                  class="fore"
                  v-for="subitem in item.categoryChild"
                  :key="subitem.categoryId"
                >
                  <dt>
                    <a
                      href="javascript:void(0);"
                      :data-category-name="subitem.categoryName"
                      :data-category2-id="subitem.categoryId"
                      >{{ subitem.categoryName }}
                    </a>
                  </dt>
                  <dd>
                    <!-- 三级分类 -->
                    <em
                      v-for="thirditem in subitem.categoryChild"
                      :key="thirditem.categoryId"
                    >
                      <a
                        href="javascript:void(0);"
                        :data-category-name="thirditem.categoryName"
                        :data-category3-id="thirditem.categoryId"
                      >
                        {{ thirditem.categoryName }}
                      </a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState} from "vuex";
import { throttle } from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
    };
  },
  computed: {
    ...mapState("home", ["categoryList"]),

  },
  methods: {
    addActive:throttle(function(index){
        this.currentIndex = index;
      }, 100),
    delActive:throttle(function(){
        this.currentIndex = -1;
      }, 100),
    goSearch(e) {
      // 解构赋值事件目标的自定义属性
      let { categoryName, category1Id, category2Id, category3Id } = e.target.dataset
      // categoryName不为空 即发生点击事件的是存在自定义属性标签子组件时 进行路由跳转
      if(categoryName){
        let query = {}
        if(category1Id) query = {categoryName,category1Id}
        if(category2Id) query = {categoryName,category2Id}
        if(category3Id) query = {categoryName,category3Id}
        let location = {
          name: "search",
          query
        }
        // 如果之前存在params属性时 一并带上
        if(this.$route.params) location.params = this.$route.params
        this.$router.push(location)
      } 
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>