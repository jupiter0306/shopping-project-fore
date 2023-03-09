<template>
  <div class="specScroll">
      <!--左按钮-->
      <a class="prev" @click="indexChange(currentIndex-1)">&lt;</a>
      <!-- 中间可滑动区域 -->
      <div class="items">
          <div class="itemsCon">
            <img v-for="(image,index) in imageList" :key="image.id" v-lazy="image.imgUrl" @click="indexChange(index)"/>
          </div>
      </div>
      <!--右按钮-->
      <a class="next" @click="indexChange(currentIndex+1)">&gt;</a>
  </div>
</template>

<script>
export default {
    name:'ImageList',
    data(){
      return{
        currentIndex:0
      }
    },
    props:{
      imageList:Array
    },
    // 不能在mounted的时候就发 因为此时imageList里面还没值呢 要watch 等值存进来了在发
    // watch里写this.imageList 默认的是newValue。。
    watch:{
      imageList(){
          // this.$bus.$emit('imageChange',newV[0].imgUrl)
          this.$bus.$emit('imageChange',this.imageList[0].imgUrl)
      }
    },
    methods:{
      indexChange(index){
        if(index < 0) index = this.imageList.length-1
        if(index > this.imageList.length-1) index = 0
        this.currentIndex = index
        let url = this.imageList[index].imgUrl
        this.$bus.$emit('imageChange',url)
      }
    }

}
</script>

<style lang="less" scoped>
  .specScroll{
      margin-top: 5px;
      width: 400px;
      overflow: hidden;
      .prev,.next{
          text-align: center;
          width: 10px;
          height: 54px;
          line-height: 54px;
          border: 1px solid #CCC;
          background: #EBEBEB;
          cursor: pointer;
      }
      .prev{
          float: left;
          margin-right: 4px;
      }
      .next{
          float: right;
      }
      .items{
          float: left;
          position: relative;
          width: 372px;
          height: 56px;
          overflow: hidden;
          .itemsCon{
              position: absolute;
              width: 9999px;
              height: 56px;  
              left: 0;
              img{
                  float: left;
                  text-align: center;
                  border: 1px solid #CCC;
                  padding: 2px;
                  width: 50px;
                  height: 50px;
                  margin-right: 20px;
              }
          }
      }
  }
</style>