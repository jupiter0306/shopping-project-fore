<template>
  <div class="outer">
    <shop-header/>
    <router-view/>
    <shop-footer v-show="$route.meta.isFooterShow"/>
  </div>
  
</template>

<script>
import ShopHeader from './components/ShopHeader'
import ShopFooter from './components/ShopFooter'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    ShopHeader,
    ShopFooter
  },
  methods:{
    ...mapActions('home',['getCategoryList'])
    
  },
  mounted(){
    this.getCategoryList()
  }
}
</script>

<style>

</style>
