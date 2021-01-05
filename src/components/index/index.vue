<template>
    <div class="tab">
        <div class="tab-item" v-for="(item,index) in data" :key="index" v-bind:class="{tabhover:item.cla}">
          <span @click="nav(index)">
          <router-link :to="item.path">
            <i class="iconfont" :class="item.icon" v-bind:style="{color:item.cor}"></i>
            <span v-if="unfold" v-bind:class="{tabI:item.cla}">{{item.text}}</span>
          </router-link>
          </span>
        </div>
    </div>
</template>
<script>
import {bus} from '../../bus.js'
export default {
    data(){
      return{
        unfold:true,//导航栏控制
        data:[
          {path:"/goods",icon:"icon-gongzuotai",text:"工作台",cla:true,cor:"white"},
          {path:"/ratings",icon:"icon-xinxiguanli",text:"信息管理",cla:false,cor:"#009f9d"},
          {path:"/projectApproval",icon:"icon-xiangmulixiangdengji",text:"项目立项",cla:false,cor:"#009f9d"},
          {path:"/management",icon:"icon-xiangmuguanli",text:"项目管理",cla:false,cor:"#009f9d"},
          {path:"/archives",icon:"icon-dangan",text:"档案管理",cla:false,cor:"#009f9d"},
          {path:"/supplier",icon:"icon-gongyingshang",text:"供应商管理",cla:false,cor:"#009f9d"},
          {path:"/tendering",icon:"icon-gongju",text:"招采工具",cla:false,cor:"#009f9d"},
          {path:"",icon:"icon-renwu",text:"任务管理",cla:false,cor:"#009f9d"},
          {path:"/seller",icon:"icon-jigou",text:"机构信息",cla:false,cor:"#009f9d"},
          {path:"/message",icon:"icon-xiaoxi",text:"通知管理",cla:false,cor:"#009f9d"},
        ]
      }
    },
    mounted(){
      bus.$on('data-list',unfold => {
         this.unfold = unfold;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
     });
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
      }
    }
}
</script>
<style>
.tab{
      position:fixed;
      padding-top: 100px;
    }
    .tab-item{
      height: 60px;
      padding: 0 40px;
      background-color: #fff;
      line-height: 60px;
    }
    .tabhover{
      background-color: #009f9d;
    }
    .tabI{
      color: #fff;
    }
  /* .tab-item:hover{
    background-color: #009f9d;
  }
 .iconfont:hover{
    color: #fff;
  } */
   .tab-item:hover a{
    color: #009f9d;
  }
  .content{
    width:80%;
    height: 800px;
    margin:100px 0 0 224px;
  }
  .iconfont{
    margin-right: 4px;
  }
</style>