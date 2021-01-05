<template>
    <div class="newpur">
        <h6>更新机构信息</h6>
        <div class="new-con">
            <el-form label-width="80px" :model="companyInfo">
            <el-form-item label="序号">
                <el-input v-model="companyInfo.company_id" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
                <el-input v-model="companyInfo.company_name"  placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="统一代码">
                <el-input v-model="companyInfo.credit_code"  placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="companyInfo.phone"  placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="companyInfo.contact_address"  placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="传真号码">
                <el-input v-model="companyInfo.fax"  placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邮编">
                <el-input v-model="companyInfo.zip_code"  placeholder=""></el-input>
            </el-form-item>
        </el-form>
        </div>
       <div class="new-btn">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </div> 
    </div>
</template>
<script>
import { regionData,CodeToText } from 'element-china-area-data';
export default {
     data() {
      return {
       
        companyInfo:{},
       
      };
    },
    mounted: function () {

        this.edit1=this.$route.params.edit;
        if(this.edit1){
            let id=this.$route.params.id;//编辑返回全部信息
            this.$axios.post('/Bid/company/getCompanyInfoById',null,{
                params:{
                    id:id
                }
            })
            .then(res=>{
               
                console.log(res.data.company_id);
                
                this.companyInfo=res.data
            });
        }
        
    },
    methods: {

         //提交
         submit(){

         this.$axios.post('/Bid/company/updateCompanyInfo2',null,{params:this.companyInfo})

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
    },
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