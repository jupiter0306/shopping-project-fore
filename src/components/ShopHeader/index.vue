<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p><router-link to="/">尚品汇欢迎您！</router-link></p>
                    <p v-show="!userName">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-show="userName">
                        <span>{{ userName }}</span>
                        <router-link to="/login" class="register" @click.native="logout">退出登录</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myOrder">我的订单</router-link>
                    <router-link to="/shopCart">我的购物车</router-link>
                    <a href="javascript:void(0);">我的尚品汇</a>
                    <a href="javascript:void(0);">尚品汇会员</a>
                    <a href="javascript:void(0);">企业采购</a>
                    <a href="javascript:void(0);">关注尚品汇</a>
                    <a href="javascript:void(0);">合作招商</a>
                    <a href="javascript:void(0);">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
              <router-link class="logo" to="/home">
                <img src="./images/logo.png" alt="">
              </router-link>
            </h1>
            <div class="searchArea">
                <form action="javascript:void(0);" class="searchForm" onsubmit="return false">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name:'ShopHeader',
    data(){
        return{
          keyword:'',
        }
    },
    methods:{
      goSearch(){
        let location = {
          name:'search',
          params:{
            keyword:this.keyword||undefined,
          },
        }
        if(this.$route.query) location.query = this.$route.query
        this.$router.push(location)
        this.keyword = ''
      },
      logout(){
        this.$store.dispatch('user/removeLoginUser')
        this.userName = ''
      }
    },
    computed:{
      userName:{
        get(){
          return this.$store.state.user.userInfo.name || ''
        },
        set(){

        }
      }
    }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>