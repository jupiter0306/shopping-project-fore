<template>
  <div>
    <type-nav/>
    <list-container/>
    <floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Floor from './Floor'
import {mapActions,mapState} from 'vuex'

export default {
    name:'Home',
    components:{
      ListContainer,
      Floor
    },
    computed:{
      ...mapState('home',['floors'])
    },
    methods:{
      ...mapActions('home',['getFloors','getBanners'])
    },
    mounted(){
      this.getFloors()
      this.getBanners()
    }
}
</script>

<style>

</style>