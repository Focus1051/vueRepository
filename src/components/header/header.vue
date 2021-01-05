<template>
    <div class="header" @click="isDo">
        <div class="h_top clearfloat">
             <div class="f_l left">
                <i class="iconfont icon-list list" @click="list"></i>
                <span class="t_span">|</span>
                <b class="d-ib man">MANAGEMENT</b>
                <p class="d-ib title">招投标综合管理系统</p>
            </div>
        <div class="f_r right">
            <i class="iconfont icon-huabanyoujian" @click="router"></i>
            <span class="t_span">|</span>
            <i></i>
            <p class="name">
                <span @click="dropDown">欢迎您：{{username}}！<i class="h_i iconfont icon-xiala"></i></span>
                <ul class="t_list" v-if="drop">
                    <li @click="personal">个人资料</li>
                    <li @click="password">修改密码</li>
                    <li>
                        <el-button v-if="btn" class="del" type="text" @click="login">登录</el-button>
                        <el-button v-else class="del" type="text" @click="open">退出</el-button>
                    </li>
                </ul>
            </p>

        </div>

        </div>

       
        
    </div>
</template>
<script>
export default {
    name:"",
    data(){
        return{
            drop:false,//个人信息下拉
            unfold:true,//导航栏下拉
            visible: false,
            username:"请先登录",
            btn:true,
            lastTime:null, //第一次点击事件
            currentTime:null,  //当前点击事件
            timeOut:5000 // 设置超时时间：30分钟 30*60*1000
        }
    },
    created(){
        this.lastTime  = new Date().getTime();  // 网页第一次打开时，记录当前时间
    },
    mounted(){
        let username=localStorage.getItem("username");
        if(username==null){
            this.btn=true;
        }else{
            this.username=username;
            this.btn=false;
        }
        // 
        var quitTIme = window.setInterval(this.testTime,1000);
    },
    methods:{
        isDo(){//登录状态
            this.currentTime = new Date().getTime(); // 记录当前点击的时间
            if(this.currentTIme - this.lastTime > this.timeOut){ //判断上次最后一次的点击时间和最新的点击时间间隔时候大于30分钟
            // 这里写状态已过期后执行的操作
            localStorage.clear("baby");
            this.$router.push({ path: '/login' });
                // 清除定时器
            window.clearInterval(quitTIme);
            }else{
                this.lastTime  = new Date().getTime(); //如果30分之内点击，则把最新时间记录覆盖掉之前存的最后一次点击时间
            }
        },
        dropDown(){
            let drop=this.drop;
            if(drop==false){
                this.drop=true;
            }else{
                this.drop=false;
            }
        },
        list(){
            let unfold =this.unfold;
            if(unfold==false){
                this.unfold=true;
            }else{
                this.unfold=false;
            };
            bus.$emit('data-list', this.unfold);
        },
        router(){//邮件跳转
            this.$router.push({
                path: `/news`,
            })
        },
        personal(){//个人资料跳转
            this.$router.push({
                path: `/personal`,
            })
        },
        password(){//修改密码跳转
            this.$router.push({
                path: `/password`,
            })
        },
        login(){//登录
             this.$router.push({
                path: `/login`,
            })
        },
        open() {//退出
            this.$confirm('您确定要退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '登录退出成功!',
                onClose:()=>{
                    localStorage.clear("baby");
                    localStorage.clear("id");
                    this.$router.push({
                        path: `/login`,
                    })
                }
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出登录'
            });          
            });
        },
        






    },
    beforeDestroy() {//清除定时器
      clearTimeout(this.timer);
    }
}
</script>
<style scoped>
    .header{
        position: fixed;
        z-index :99;
        width:100%;
        height:80px;
        background-color :#fff;
        box-shadow :0 0 10px 0;
        line-height: 80px;
    }
    .h_top{
        position: relative;
        width:1400px;
        margin:auto;
    }
    .d-ib{
        display: inline-block;
    }
    .man{
        font-size: 30px;
        color: #009f9d;
    }
    .title{
        margin-left:40px;
        font-size:20px;
        color: #009f9d;
    }
    .t_span{
        margin:0 60px
    }
    .right{
        width:400px;
    }
    .left{
        width:670px;
    }
    .name{
        cursor:pointer;
        position: relative;
        display: inline-block;
    }
    .name span{
        font-size: 20px;
        color:rgb(161, 161, 161);
    }
    .name span:hover{
        color: #009f9d;
    }
    .t_list{
        position:absolute;
        top:80px;
        right: 0;
        width: 100px;
        padding:10px;
        border:1px solid #ccc;
        background-color: #fff;
    }
    .t_list li{
        height:30px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
    }
    .t_list li:hover{
        background-color: #009f9d;
        color: #fff;
    }
    .header i{
        color: #009f9d;
    }
    .list{
        position:absolute;
        left: -65px;
        top:5px;
    }
    .h_i{
        font-size: 12px;
    }
    .el-button--primary {
        background-color: #27b3b0;
        border-color: #27b3b0;
    }
    .del{
        width: 100%;
        height:30px;
        font-size: 14px;
        border:none;
        line-height: 10px;
    }
    .del span{
        color: #000;
        font-size: 16px;
    }
    .t_list li:hover span{
        color:#fff;
    }
</style>