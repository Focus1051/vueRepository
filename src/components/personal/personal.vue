<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark top">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">人员信息</h6>
                    </div>
                    <div class="p_cont">
                        <div class="head">
                            <span>头像</span>
                            <i class="el-icon-upload"></i>
                            <input type="file" class="p_inp" accept="image/gif, image/jpg, image/png" @change="showImg(this)">
                            <div class="pr" v-for="(item,index) in imgs" :key='item'>
                                <img :src="item" class="img" />
                            </div>
                        </div>
                    </div>
                    <ul class="p_text">
                        <li class="">
                            <span>姓名</span>
                            <p>名字名字</p>
                        </li>
                        <li class="">
                            <span>员工工号</span>
                            <p>0001</p>
                        </li>
                        <li class="">
                            <span>手机号码</span>
                            <p>名字名字</p>
                        </li>
                        <li class="">
                            <span>座机号码</span>
                            <p>0001</p>
                        </li>
                        <li class="">
                            <span>电子邮箱</span>
                            <p>出生日期</p>
                        </li>
                        <li class="">
                            <span>出生日期</span>
                            <p>0001</p>
                        </li>
                    </ul>
                    <ul class="p_text p_hr">
                        <li class="">
                            <span>所属单位</span>
                            <p>名字名字</p>
                        </li>
                        <li class="">
                            <span>岗位级别</span>
                            <p>0001</p>
                        </li>
                        <li class="">
                            <span>所属部门</span>
                            <p>名字名字</p>
                        </li>
                        <li class="">
                            <span></span>
                            <p></p>
                        </li>
                        <li class="">
                            <span>入职时间</span>
                            <p>名字名字</p>
                         </li>
                        <li class="">
                            <span>转正时间</span>
                            <p>0001</p>
                        </li>
                        <li class="">
                            <span>合同到期时间</span>
                            <p>名字名字</p>
                        </li>
                        <li class="">
                            <span>职务名称</span>
                            <p>0001</p>
                        </li>
                    </ul>
                    <ul class="p_text p_hr">
                        <li class="">
                            <span>登录账号</span>
                            <p>名字名字</p>
                        </li>
                    </ul>
                    <div class="pa_btn">
                        <el-button type="info" @click="returnx">返回</el-button>
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
        showImg(event) {
            this.imgs=[];
            let _this = this
            let event2 = event || window.event;
            let file = event2.target.files
            let leng = file.length;
            for (let i = 0; i < leng; i++) {
                let reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
                _this.imgfiles.push(file[i])
                reader.readAsDataURL(file[i]);
                reader.onload = function(e) {
                    _this.imgs.push(e.target.result); // base 64 图片地址形成预览    
                };
            }
        },
        returnx(){//返回按钮
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
.p_inp{
    position:absolute;
    opacity:0;
    left: 40px;
    width:130px;
    height:130px;
    cursor:pointer;
}
.p_text{
    margin-bottom: 45px;
}
.p_text p{
    display: inline-block;
    margin-left:30px;
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