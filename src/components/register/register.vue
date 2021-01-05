<template>
    <div class="goodsSign">
            <div class="login">
                <h1>招投标综合管理系统<p>注册</p></h1>
                <el-input v-model="data.name" placeholder="请输入姓名"></el-input>
                <el-input v-model="data.username" placeholder="请输入用户名"></el-input>
                <el-input placeholder="请输入密码" v-model="data.password" show-password></el-input>
                <el-input v-model="data.mobilePhone" placeholder="请输入电话号码"></el-input>
                <el-select v-model="data.departMent" placeholder="请选择部门">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" size="medium" @click="submit">注册</el-button>
                <span class="register" @click="login">登录</span>
            </div>
        </div>
</template>
<script >
export default {
     data(){
        return{
            data:{
                name:"",
                username:"",
                password:"",
                mobilePhone:"",
                departMent:"",
            },
            options:[{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
            }],
        }
     },
     methods:{
         submit(){//提交按钮
            let data=this.data;
            if(data.name==""){
                this.$message.error('名字为必填');
                return
            };
            if(data.username==""){
                this.$message.error('用户名为必填');
                return
            };
            if(data.password==""){
                this.$message.error('密码为必填');
                return
            };
            if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobilePhone))){
                this.$message.error('请输入正确的电话号码');
                return
            };
            if(data.departMent==""){
                this.$message.error('请选择部门');
                return
            };
            this.$axios.post("/Bid/user/register",null,{
                params:data
            }).then(res=>{
                console.log(res)
                this.data={
                    name:"",
                    username:"",
                    password:"",
                    mobilePhone:"",
                    departMent:"",
                };
                if(res.data==1){
                    this.$message({
                        showClose: true,
                        message: '注册成功,即将返回登录页面',
                        type: 'success',
                        onClose:()=>{
                            this.$router.go(-1)
                        }
                    });
                };
                if(res.data==0){
                    this.$message.error('注册失败,请重新注册');
                };
                if(res.data==2){
                    this.$message.error('用户名已存在,请重新注册');
                };
            })
         },
         login(){
             this.$router.push({//登录点击
                path: `/login`,
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