<template>
  <div class="">
    <Header></Header>
    <div class="clearfloat box">
      <Index></Index>
    </div>
    <div class="content f_l">
      <router-view />
    </div>
    </div>
  </div>
</template>

<script>
//一般不要再APP.vue 里面写布局  这个文件相当于 一个入口文件
  import Header from "./components/header/header.vue";
  import Index from "./components/index/index.vue";
  // 
  export default{
    components:{
      Header,
      Index
    },
    
    mounted(){
    //   bus.$on('data-list',unfold => {
    //     //console.log(unfold)
    //      this.unfold = unfold;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
    //  });
     },

    methods:{
      nav(index){
        let data=this.data;
        data.forEach((el,i) => {
          data[i].cla=false;
          data[i].cor="#009f9d"
        });
        data[index].cla=true;
        data[index].cor="white";
      },

      

    }
  }
</script>
<style>
</style>