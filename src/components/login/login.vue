<template>
    <div class="goodsSign">
            <div class="login">
                <h1>招投标综合管理系统<p>登录</p></h1>
                <el-input v-model="data.username" placeholder="请输入用户名"></el-input>
                <el-input placeholder="请输入密码" v-model="data.password" show-password></el-input>
                <el-button type="primary" size="medium" @click="submit">登录</el-button>
                <span class="register" @click="register">注册</span>
            </div>
        </div>
</template>
<script >
export default {
     data(){
        return{
            data:{
                username:"",
                password:"",
            },
            
        }
     },
     methods:{
         register(){//注册按钮点击
             this.$router.push({
                path: `/register`,
            })
         },
         submit(){//登录按钮
            this.$axios.post("/Bid/user/login",null,{
                params:this.data,
            }).then(res=>{
                console.log(res)
                let id=res.data.userId;
                let username=res.data.username;
                if(id){
                    this.$message({
                        showClose: true,
                        message: '登录成功,即将返回首页',
                        type: 'success',
                        onClose:()=>{
                            //this.$router.push({path:'/'});
                            this.$router.push({path:'/goods'});
                            localStorage.setItem("username",username);
                            localStorage.setItem("id",id);
                            location.reload()

                            
                        }
                    });
                }else{
                    this.$message.error('登录失败,请重新登录');
                }
            })
         }
     }
} 
</script>
<style scoped>
    /* 登录 */
.goodsSign{
    position: fixed;
    top:0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,.5); */
    background: url(../../../build/login.jpg) no-repeat 0/100% 100%;
}
.login{
    position: relative;
    width:300px;
    height:250px;
    padding: 20px 100px; 
    border-radius: 10px;
    background-color: rgba(255,255,255,.5);
    margin:200px auto;
}
.login .el-input{
    margin:10px 0;
}
.login h1{
    font-size: 18px;
    text-align: center;
    color: #009f9d;
}
.login button{
    display: block;
    margin:30px auto;
}
.register{
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #009f9d;
    cursor:pointer;
}
</style>