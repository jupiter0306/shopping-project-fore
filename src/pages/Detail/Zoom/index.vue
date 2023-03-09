<template>
  <div class="spec-preview">   
    <img v-lazy="imgUrl" />   
    <div class="event" @mousemove="handleMove" ref="event"></div>   
    <div class="big">
      <img v-lazy="bigImgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import {throttle} from 'lodash'
export default {
    name:'Zoom',

    data(){
      return {
        imgUrl:'',
        bigImgUrl:''
      }
    },
    mounted(){
      this.$bus.$on('imageChange',this.imageChange)
    },
    beforeDestroy(){
      this.$bus.$off('imageChange')
    },
    methods:{
      // 高频调用 节流
      handleMove: throttle(function(e){
              let {mask,event,bigImg} = this.$refs
              // 记得加px
              let x = e.offsetX - mask.offsetWidth/2
              let y = e.offsetY - mask.offsetHeight/2
              // xy轴方向最多能移动的距离 防止mask从盒子中跑出去
              let maxX = event.offsetWidth - mask.offsetWidth
              let maxY = event.offsetHeight - mask.offsetHeight
              if(x > maxX) x = maxX
              if(x < 0) x = 0
              if(y > maxY) y = maxY
              if(y < 0) y = 0
              mask.style.left = x + 'px'
              mask.style.top = y + 'px'
              bigImg.style.left = -2*x + 'px'
              bigImg.style.top = -2*y + 'px'
          },200),
      imageChange(url){
        this.imgUrl = this.bigImgUrl = url
      }
    },

}
</script>

<style lang="less" scoped>
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }

</style>