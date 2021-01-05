<template>
    <div class="newpur">
        <h6>采购人信息</h6>
        <div class="new-con">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="专家名称">
                <el-input v-model="formLabelAlign.name" placeholder="请输入专家名称"></el-input>
            </el-form-item>
            <el-form-item label="专家证号">
                <el-input v-model="formLabelAlign.expertNum" placeholder="请输入专家证号"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="formLabelAlign.mobilePhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="formLabelAlign.reserved01" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
             <el-form-item label="职称">
                <el-input v-model="formLabelAlign.position"  placeholder="请输入职称"></el-input>
            </el-form-item>
            <el-form-item label="所在单位">
                <el-input v-model="formLabelAlign.unit" placeholder="请输入所在单位"></el-input>
            </el-form-item>
            <el-form-item label="专业品目">
                <div>
                    <el-select v-model="prov" style="width:167px;margin-right: 25px;">
                        <el-option v-for="(option,i) in arr" :key="i" :value="option">
                        {{ option.value }}
                        </el-option>
                    </el-select>
                    <el-select v-model="city" style="width:167px;margin-right: 25px;">
                        <el-option v-for="(option,i) in cityArr" :key="i" :value="option">
                        {{ option.value }}
                        </el-option>
                    </el-select>
                    <el-select v-model="district" style="width:167px;">
                        <el-option v-for="(option,i) in districtArr" :key="i" :value="option">
                        {{ option.value }}
                        </el-option>
                    </el-select>
                </div>
                <p v-if="edit1">已选择:{{formLabelAlign.items}}</p>
                <p v-else>已选择:
                    <span class="itemSpan">{{prov.value}}</span>
                     <span class="itemSpan">{{city.value}}</span>
                    {{district.value}}
                    </p>
            </el-form-item>
            <el-form-item label="专业证书">
                <el-upload
                    class="upload-demo"
                    drag
                    :action="router"
                    :auto-upload="false"
                    ref="upload"
                    :limit='1'
                    :on-change="handleChange"
                    :on-success="onSuccess"
                    :data="formLabelAlign"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <div class="image" v-if="edit1">
                    <img :src="credential" alt="" width="100%" height="100%">
                </div>
                <span style="color:#606266">{{text}}</span>
                
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
import expert from "../../script/out.js"
export default {
     data() {
      return {
        labelPosition: 'right',
        prov:'',
        city:'',
        district:'',
        arr:[],
        cityArr:[],
        districtArr:[],
        dialogImageUrl: '',//图片
        dialog:"",
        dialogVisible: false,
        formLabelAlign: {
            name:"",
            expertNum:"",
            mobilePhone:"",
            reserved01:"",
            position:"",
            unit:"",
            items:"",
        },
        credential:"",//图片回显路径
        edit1:false,//修改按钮显示隐藏
        text:"选中图片,点击'delete'可删除图片",//提示文字
        router:"/api/Bid/expert/addExpert",
      };
    },
    
    mounted: function () {
        this.edit1=this.$route.params.edit;
        if(this.edit1){
            let id=this.$route.params.key;//编辑返回全部信息
            console.log(id)
            this.$axios.post('/Bid/expert/getExpert',null,{
                params:{
                    expertId:id
                } 
            })
            .then(res=>{
                let data=res.data;
                this.formLabelAlign={
                    expertId:data.expertId,
                    expertNum:data.expertNum,
                    items:data.items,
                    mobilePhone:data.mobilePhone,
                    name:data.name,
                    position:data.position,
                    reserved01:data.reserved01,
                    unit:data.unit,
                };
                this.credential="http://192.168.10.5"+res.data.credential;
                this.text="重新上传证书替换当前证书",
                this.router="/api/Bid/expert/updateExpert"
                console.log(this.formLabelAlign)
            });
        };

        //专家类型
        this.arr=expert;
        
    },
     
    methods: {
        handleChange(img){
            this.dialog = img.name;

        },
      handlePictureCardPreview(credential) {//图片
        this.dialogImageUrl = credential.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl)
        if(this.dialogImageUrl==""){
            this.$message.error('请添加专业证书图片');
            return
        }
      },
      onSuccess:function(res){
          if(res==1){
              this.$message({
                    message: '提交成功,正在跳转回上一页',
                    type: 'success',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });
          }
      },
      submit(){//提交按钮
        let data=this.formLabelAlign;
         data.items=this.prov.value+this.city.value+this.district.value;
        if(data.name==""){
            this.$message.error('专家姓名为必填项');
            return
        }
        if(data.expertNum==""){
            this.$message.error('专家证号为必填项');
            return
        }
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobilePhone))){
            this.$message.error('请输入正确的电话号码');
            return
        }
        if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data.reserved01))){
            this.$message.error('请输入正确的身份证号码');
            return
        }
        if(data.position==""){
            this.$message.error('职称为必填项');
            return
        }
        if(data.unit==""){
            this.$message.error('所在单位为必填项');
            return
        }
        if(data.items==""){
            this.$message.error('请选择专业品目');
            return
        }
        if(this.dialog==""){
            this.$message.error('请添加专业证书图片');
            return
        }
        this.$refs.upload.submit();
      },
      modify(){//修改按钮
        let data=this.formLabelAlign;
        if(data.name==""){
            this.$message.error('专家姓名为必填项');
            return
        }
        if(data.expertNum==""){
            this.$message.error('专家证号为必填项');
            return
        }
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobilePhone))){
            this.$message.error('请输入正确的电话号码');
            return
        }
        if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data.reserved01))){
            this.$message.error('请输入正确的身份证号码');
            return
        }
        if(data.position==""){
            this.$message.error('职称为必填项');
            return
        }
        if(data.unit==""){
            this.$message.error('所在单位为必填项');
            return
        }
        if(data.items==""){
            this.$message.error('请选择专业品目');
            return
        }
        if(this.dialog==""){
            this.$message.error('请添加专业证书图片');
            return
        }
        this.$refs.upload.submit();

      },
      cancel(){//取消按钮
        this.$router.go(-1)
      }
    },
    watch:{//检测专家品目数据变化
         prov:{
            handler(newValve,oldvalue){
                this.cityArr=newValve.nodes;
                this.city='';
                this.district='';
            }
         },
         city:{
            handler(newValve,oldvalue){
                this.districtArr=newValve.nodes;
                this.district='';
            }
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
.itemSpan{
    display: inline-block;
    margin:0 10px;
}
.image{
    width:100%;
    height:200px;
}
</style>     