<template>
    <div class="newpur">
        <h6>采购人信息</h6>
        <div class="new-con">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="单位名称">
                <el-input v-model="formLabelAlign.unitName" placeholder="请输入单位名称"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址">
                <el-input v-model="formLabelAlign.contactAddress" placeholder="请输入通讯地址"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码">
                <el-input v-model="formLabelAlign.zipCode" placeholder="请输入邮政编码"></el-input>
            </el-form-item>
            <el-form-item label="行政区域">
                  <el-cascader
                    size="large"
                    :options="address"
                    v-model="selectedOptionsa"
                    @change="handleChange">
                  </el-cascader>  
                
            </el-form-item>
             <el-form-item label="招采联系">
                <el-input v-model="formLabelAlign.contacts"  placeholder="请输入招采联系人"></el-input>
            </el-form-item>
            <el-form-item label="所在部门">
                <el-input v-model="formLabelAlign.sector" placeholder="请输入所在部门"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="formLabelAlign.mobilePhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="座机号码">
                <el-input v-model="formLabelAlign.telePhone" placeholder="请输入座机号码"></el-input>
            </el-form-item>
            <el-form-item label="QQ或邮箱">
                <el-input v-model="formLabelAlign.email" placeholder="请输入QQ或邮箱"></el-input>
            </el-form-item>
            <el-form-item label="合作类型">
                <el-select v-model="formLabelAlign.cooperationType" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        </div>
        <div class="new-btn">
            <el-button v-if="edit1" type="success" @click="modify">修改</el-button>
            <el-button v-else type="success" @click="submit">提交</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { regionData,CodeToText } from 'element-china-area-data';
export default {
     data() {
      return {
        labelPosition: 'right',
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
        selectedOptionsa:[],//地址
        formLabelAlign: {
            unitName:"",
            contactAddress:"",
            administrativeArea:"",//地区
            zipCode:"",
            contacts:"",
            sector:"",
            mobilePhone:"",
            telePhone:"",
            email:"",
            cooperationType:"",
            type:"",//传递参数 1为采购人 2为财政
        },
        id:"",//传递参数 1为采购人 2为财政
        address: regionData,//地址选择器
        edit1:false,//修改按钮显示隐藏
      };
    },
    mounted: function () {
        let key=this.$route.params.id;
        this.formLabelAlign.type=key//传递参数 1为采购人 2为财政

        this.edit1=this.$route.params.edit;
        if(this.edit1){
            let id=this.$route.params.key;//编辑返回全部信息
            this.$axios.post('/Bid/message/selectById',null,{
                params:{
                    id:id
                }
            })
            .then(res=>{
                this.formLabelAlign=res.data
            });
        }
        
    },
    methods: {
      handleChange (value) {//地址
        let addr=""
        value.forEach(ele => {
          addr+=(CodeToText[ele])
        });
        this.formLabelAlign.administrativeArea=addr;

      },
      submit(){//提交按钮
        let data=this.formLabelAlign;
        if(data.unitName==""){
            this.$message.error('单位名称为必填项');
            return
        }
        if(data.contactAddress==""){
            this.$message.error('通讯地址为必填项');
            return
        }
        if(data.zipCode==""){
            this.$message.error('邮政编码为必填项');
            return
        }
        if(data.administrativeArea==""){
            this.$message.error('行政区域为必填项');
            return
        }
        if(data.contacts==""){
            this.$message.error('招采联系人为必填项');
            return
        }
        if(data.sector==""){
            this.$message.error('部门为必填项');
            return
        }
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobilePhone))){
            this.$message.error('请填写正确的手机号码');
            return
        }
        if(!(/0\d{2,3}-\d{7,8}/.test(data.telePhone))){
            this.$message.error('请填写正确的座机号码');
            return
        }
        if(data.emaill==""){
            this.$message.error('邮箱为必填项');
            return
        }
        if(data.type==undefined){
            this.$message.error('请返回信息管理页面,重新进入');
            return
        }
        if(data.cooperationType==""){
            this.$message.error('合作类型必填项');
            return
        }
        // var date = new Date();//实例一个时间对象；
        // var year = date.getFullYear();//获取系统的年；
        // var month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
        // var day = date.getDate();//获取系统日
        // var hour = date.getHours();//获取系统时间
        // var minute = date.getMinutes(); //分
        // var second = date.getSeconds();//秒
        // this.formLabelAlign.add_time=year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
        this.$axios.post('/Bid/message/addPurchaseInfo',null,{
            params:this.formLabelAlign
        })
        .then(res=>{
            if(res.data==0){
                this.$message.error('添加失败');
            }
            if(res.data==1){
                this.$message({
                    message: '添加成功,正在跳转回上一页',
                    type: 'success',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });
            }
        })
      },
      modify(){//修改按钮
        let data=this.formLabelAlign;
        if(data.unitName==""){
            this.$message.error('单位名称为必填项');
            return
        }
        if(data.contactAddress==""){
            this.$message.error('通讯地址为必填项');
            return
        }
        if(data.zipCode==""){
            this.$message.error('邮政编码为必填项');
            return
        }
        if(data.administrativeArea==""){
            this.$message.error('行政区域为必填项');
            return
        }
        if(data.contacts==""){
            this.$message.error('招采联系人为必填项');
            return
        }
        if(data.sector==""){
            this.$message.error('部门为必填项');
            return
        }
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobilePhone))){
            this.$message.error('请填写正确的手机号码');
            return
        }
        if(!(/0\d{2,3}-\d{7,8}/.test(data.telePhone))){
            this.$message.error('请填写正确的座机号码');
            return
        }
        if(data.emaill==""){
            this.$message.error('邮箱为必填项');
            return
        }
        if(data.type==undefined){
            this.$message.error('请返回信息管理页面,重新进入');
            return
        }
        if(data.cooperationType==""){
            this.$message.error('合作类型必填项');
            return
        }
        this.$axios.post('/Bid/message/updateInfo',null,{
            params:this.formLabelAlign
        })
        .then(res=>{
            if(res.data==0){
                this.$message.error('修改失败');
            }
            if(res.data==1){
                this.$message({
                    message: '修改成功,正在跳转回上一页',
                    type: 'success',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });
            }
            
        })




      },
      cancel(){//取消按钮
        this.$router.go(-1)
      }
    }
}
</script>
<style scoped>
.new-con{
    width:70%;
    margin:auto;
}
.newpur h6 {
    font-size: 18px;
    padding-left: 10px;
    border-left: 3px solid #009f9d;
    color: #009f9d;
    margin:10px 0;
}
.newpur{
    padding: 20px;
    background-color: #fff;
}
.new-btn{
    text-align: center;
}
</style>