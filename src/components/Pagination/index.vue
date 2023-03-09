<template>
    <div class="pagination">
        <button @click="changeCurrentPage(1)">1</button>
        <!-- 当前页为1时不可用 -->
        <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
        <!-- start>2才显示省略号 -->
        <button v-show="startEnd.start>2" disabled>···</button>
        <!-- 生成从start到end的连续数组 -->
        <button 
        v-for="(item,index) in generateArray(startEnd.start,startEnd.end)" 
        :key="index"
        @click="changeCurrentPage(item)"
        :class="{'active':item === currentPage}">
            {{item}}
        </button>
        <!-- end<totalPage-1才显示省略号 -->
        <button v-show="startEnd.end<totalPage-1" disabled>···</button>
        <!-- 当前页为totalPage时不可用 -->
        <button @click="changeCurrentPage(totalPage)">{{totalPage}}</button>
        <button :disabled="currentPage===totalPage" @click="changeCurrentPage(currentPage+1)">下一页</button>
        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        // 当前页码
        currentPage:{
            type:Number,
            default:1
        },
        // 每页数量
        pageSize:{
            type:Number,
            default:5
        },
        // 总商品数
        total:{
            type:Number,
            default:0
        },
        // 连续页码数
        showPageNo:{
            type:Number,
            default:5
        },
    },

    computed:{
        // 总共需要的页数
        totalPage(){
            return Math.ceil(this.total/this.pageSize)

        },
        // 省略号中间显示的页码
        startEnd(){
            const {currentPage,showPageNo,totalPage} = this
            let start = currentPage - Math.floor(showPageNo/2)
            // start最小为2
            if(start < 2) start = 2
            let end = start + showPageNo
            // end最大为totalPage-1
            if(end > totalPage - 1) end = totalPage - 1
            // 返回一个对象 具有start和end属性
            return {start,end}
        },
    },
    methods:{
        // 生成一个从 start 到 end 的连续数组
        generateArray (start, end) {
            return Array.from(new Array(end + 1).keys()).slice(start)
        },
        changeCurrentPage(currentPage){
            this.$emit('changeCurrentPage',currentPage)
        }
    }

}
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
