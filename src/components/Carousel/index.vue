<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in banners" :key="slide.id">
        <img :src="slide.imgUrl" alt=""/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 导入所需要的js和css文件
import Swiper from 'swiper'
import "swiper/css/swiper.min.css"

export default {
  name: "Carousel",
  props:{
    banners:Array
  },
  watch:{
    banners:{
      immediate:true, 
      deep:true,
      handler(){
        this.$nextTick(()=>{
          new Swiper (this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
          }) 
        })
      }

    }
  },
};
</script>

<style>
</style>