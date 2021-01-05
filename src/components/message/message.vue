<template>
    <div>
        <el-row> 
            <el-col :span="24">
                <div class="mess">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                     <router-link :to="{name: 'Default'}" tag="li" exact>
                         <el-menu-item index="1">任务消息</el-menu-item>
                     </router-link>
                    <router-link :to="{name: 'Collection'}" tag="li" >
                        <el-menu-item index="2">通知消息</el-menu-item>
                    </router-link>
                    <router-link :to="{name: 'Trace'}" tag="li">
                        <el-menu-item index="3">任务预警</el-menu-item>
                    </router-link>
                    <div class="m_left f_r">
                        <i class="el-icon-search ip_a"></i>
                        <input type="text" placeholder="查询关键字"/>
                        <i class="el-icon-caret-bottom car" @click="clickScreen"></i>
                        <span class="m_span">
                            <div class="eject" v-if="screen">
                                <h6>筛选</h6>
                                <p>任务状态</p>
                               <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                        {{value}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(item,i) in vaList" :key="i" @click.native="eject1(i)">{{item.va}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <div class="div">
                                    <el-button size="small" type="info" @click="cancel">取消</el-button>
                                    <el-button size="small" type="success">查询</el-button>
                                </div>
                            </div>
                        </span>
                        <span class="m_span">
                            <div class="eject" v-if="screen2">
                                <h6>日期筛选</h6>
                                <h6 class="date">开始日期</h6>
                                <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <h6 class="date">结束日期</h6>
                               <el-date-picker
                                    v-model="value2"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <div class="div">
                                    <el-button size="small" type="info" @click="cancel2">取消</el-button>
                                    <el-button size="small" type="success">查询</el-button>
                                </div>
                            </div>
                        </span>
                        <i class="el-icon-date"@click="clickScreen2"></i>
                    </div>
                </el-menu>
                </div>
            </el-col>
                
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>
                    <router-view></router-view>
                    
                </div>
                  
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        visible :false,
        value:"选择类型",//记录选中哪个
        vaList:[//筛选类型
            {va:"1",state:false},
            {va:"2",state:false},
            {va:"3",state:false},
            {va:"4",state:false},
        ],
        screen:false,//筛选弹窗 
        screen2:false,//日期筛选
        value1: '',//日期
        value2: '',//日期,
        time1:"",
        time2:"",//记录日期变化
      };
    },
    watch:{
        value1:{
            handler(newValve,oldvalue){
                let date=newValve;
                let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
                // + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();   时分秒
                 this.time1=date_value;
            }
        },
        value2:{
            handler(newValve,oldvalue){
                let date=newValve;
                let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
                // + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();   时分秒
                 this.time2=date_value;
                 console.log(this.time2)
            }
        }
    },
    mounted(){
        this.fn()
    },
    methods: {
      fn(){//获取筛选类型
            let arr =this.vaList;
        },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      eject1(i){
           let arr=this.vaList;
           this.value=arr[i].va
      },
      clickScreen(){//点击出现弹窗
        let i=this.screen;
        if(i==false){
            this.screen=true;
        }else{
            this.screen=false;
        }
      },
      clickScreen2(){//点击出现弹窗
        let i=this.screen2;
        if(i==false){
            this.screen2=true;
        }else{
            this.screen2=false;
        }
      },
      cancel(){//筛选取消
        this.screen=false
      },
      cancel2(){//日期筛选取消
        this.screen2=false
      }





    },
}
</script>
<style scoped>
.mess {
    padding:0 20px;
    background-color: #fff;
}
.mess li{
    display: inline-block;
}
.m_i{
    float: left;
    font-size: 30px;
    line-height: 30px;
}
.m_title{
    width:80%;
}


.m_left{
    position: relative;
    margin-top: 13px;
    padding: 0 20px;
}
.m_left:focus{
outline:none;
}
.ip_a{
    position: absolute;
    top:6px;
    left:170px;
    
}
.m_left>input{
    border-radius: 20px;
    border: 1px solid #ccc;
    outline:none;
    height: 30px;
    padding-left:15px;
}
.m_left .m_span{
    position: relative;
}
.car{
    margin:0 20px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
.eject{
    position:absolute;
    z-index: 5;
    top:45px;
    left: -200px;
    width:200px;
    padding: 20px;
    cursor: pointer;
    box-shadow: 0 5px 7px 2px #ccc;
    background-color: #fff;
}
.eject p{
    /* display: inline-block; */
    font-size: 16px;
}
.eject .div{
    margin:20px 0 0 50px;
}
.date{
    font-weight: 300;
    margin:10px
}
</style>