<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark top">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">修改密码</h6>
                    </div>
                    <ul class="p_text">
                        <li class="">
                            <span>原始密码</span>
                            <input type="text">
                        </li>
                    </ul>
                    <ul class="p_text p_hr">
                        <li class="">
                            <span>新密码</span>
                            <input type="text">
                        </li>
                        <li class="">
                            <span>确认密码</span>
                            <input type="text">
                        </li>
                    </ul>
                    <div class="pa_btn">
                        <el-button type="success">提交</el-button>
                        <el-button type="info" @click="cancel">取消</el-button>
                    </div>
                    
                </div>
            </el-col>

        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imgs: [], //图片地址
            imgfiles: [], //图片源文件,上传到后台的数据
        }
         
    },
    methods: {
        cancel(){//取消按钮
            this.$router.push({
                path: `/goods`,
            })
        }
    }
}
</script>
<style scoped>
.top{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
}
.c_top{
    margin:0;
}
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
.p_cont,.p_text{
    width:80%;
    margin:auto;
}
.p_cont span{
    color:rgb(161, 161, 161);
    vertical-align: middle;
}
.head{
    position: relative;
}
.head i{
    font-size: 130px;
    color: #ccc;
    vertical-align: middle;
}
.pr{
    display: inline-block;
    vertical-align: middle;
}
.p_text{
    margin-bottom: 45px;
}
.p_text input{
    width:300px;
    height:30px;
}
.p_text span{
    display: inline-block;
    width: 100px;
    color:rgb(161, 161, 161);
    text-align: right;
}
.p_text li{
    display: inline-block;
    width:49%;
    margin-top:45px;
}
.p_hr{
    border-top:1px solid #ccc;
}
.pa_btn{
    width:250px;
    margin:100px auto;
}
.pa_btn .el-button{
    padding: 12px 35px;
}
</style>