<template>
  <div class="gover">
    <el-collapse>
        <el-collapse-item class="gover_item" title="人员信息" name="1">
          <ul class="goverList">
            <li>
              <div>
                  <span>项目名称</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.projectName"></el-input>
              </div>
            </li>
            <li>
              <div>
                <span>公司项目编号</span>
                <el-input placeholder="显示固定内容" :disabled="true" v-model="projectCreate.projectNum"></el-input>
              </div>
              <div>
                <span>项目级别</span>
                <el-select v-model="projectCreate.leve" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li>
              <div>
                <span>招采类型</span>
                <el-select v-model="projectCreate.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>行政区域</span>
                  <el-cascader
                    size="large"
                    :options="address"
                    v-model="selectedOptions"
                    @change="handleChange">
                  </el-cascader>  
              </div>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item class="gover_item gover_item2" title="执行人员" name="2">
          <div class="gover_icon" v-if="model">
            <i class="el-icon-circle-plus-outline" title="添加" @click="add"></i>
            <i class="el-icon-delete" title="删除" @click="del"></i>
          </div>
            <ul class="goverList">
              <li>
                <div>
                  <span class="gover_mode">项目执行方式</span>
                  <el-radio v-model="projectCreate.runMode" label="团队">团队</el-radio>
                  <el-radio v-model="projectCreate.runMode" label="部门">部门</el-radio>
                </div>
              </li>
              <li>
                <div>
                  <span>项目负责人</span>
                  <el-input placeholder="显示固定内容" :disabled="true" v-model="projectCreate.takeCharge"></el-input>
                </div>
                <div>
                  <span>项目来源</span>
                  <el-select v-model="projectCreate.source" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
            </li>
              
          </ul>
          <ul class="goverList" v-if="model">
            <li>
              <div>
                <span>项目权限</span>
                <el-input placeholder="显示固定内容" :disabled="true" v-model="projectCreate.role"></el-input>
              </div>
            </li>
            <li v-for="(i,index) in member" :key="index">
              <div>
                <!-- 没有关键字 -->
                <span>项目成员</span>
                <el-select v-model="section" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="i.id" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>项目权限</span>
                <el-input placeholder="显示固定内容" :disabled="true" v-model="projectCreate.role"></el-input>
                <i :class="i.list" style="color:red; font-size:18px;line-height:40px" @click="listDel(index)"></i>
              </div>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item class="gover_item" title="项目详情" name="3">
            <ul class="goverList">
              <li>
                <div>
                  <span>采购方式</span>
                  <el-select v-model="projectCreate.purchaseWay" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>评审方法</span>
                  <el-select v-model="projectCreate.reviewWay" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>预算金额(小写)</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.moneyLower"></el-input>
                </div>
                <div>
                  <span>预算金额(大写)</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.moneyCapital"></el-input>
                </div>
              </li>
              <li>
                <div>
                  <span>采购对象</span>
                  <el-select v-model="projectCreate.object" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>采购类型</span>
                  <el-select v-model="projectCreate.purchaseType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>资金来源</span>
                  <el-select v-model="projectCreate.moneySource" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>所属行业</span>
                  <el-select v-model="projectCreate.industry" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>分包个数</span>
                  <el-select v-model="projectCreate.subpackageNum" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>行业主管部门</span>
                  <el-select v-model="projectCreate.department" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>采购品目</span>
                  <el-select v-model="projectCreate.purchaseItems" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                
              </li>
            </ul>
        </el-collapse-item>
        <el-collapse-item class="gover_item" title="采购单位" name="4">
            <ul class="goverList">
              <li>
                <div>
                <span>行政区域</span>
                  <el-cascader
                    size="large"
                    :options="address"
                    v-model="selectedOptions1"
                    @change="handleChange1">
                  </el-cascader>  
              </div>
              </li>
              <li>
                <div>
                  <span>单位名称</span>
                  <el-select v-model="projectCreate.purchaseName" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                 <div>
                  <span>通讯地址</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.purchaseAddress"></el-input>
                </div>
              </li>
              <li>
                <div>
                  <span>项目联系人</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.purchaseContact"></el-input>
                </div>
                <div>
                  <span>联系方式</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.purchaseContactWay"></el-input>
                </div>
              </li>
              <li>
                <div>
                  <span>邮政编码</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.purchaseZip"></el-input>
                </div>
              </li>
            </ul>
        </el-collapse-item>
        <el-collapse-item class="gover_item" title="代理机构" name="5">
            <ul class="goverList">
              <li>
                <div>
                  <span>单位名称</span>
                  <el-select v-model="projectCreate.agencyName" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                 <div>
                  <span>通讯地址</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.agencyAddress"></el-input>
                </div>
              </li>
              <li>
                <div>
                  <span>项目联系人</span>
                  <el-select v-model="projectCreate.value" placeholder="所有部门">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="projectCreate.contactId" placeholder="选择项目权限的人员">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>联系方式</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.contactWay"></el-input>
                </div>
              </li>
              <li>
                <div>
                  <span>邮政编码</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.agencyZip"></el-input>
                </div>
                <div>
                  <span>传真号码</span>
                  <el-input placeholder="请输入内容" v-model="projectCreate.faxNum"></el-input>
                </div>
              </li>
            </ul>
        </el-collapse-item>
        <el-collapse-item class="gover_item" title="资格,技术商务,评审因素" name="6">
          
          <div class="richText">
            <h5>资格条件</h5>
            <quill-editor
              v-model="projectCreate.prerequisites"
              ref="myQuillEditor"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </div>
          <div class="richText">
            <h5>技术商务</h5>
            <quill-editor
              v-model="projectCreate.technologyBusiness"
              ref="myQuillEditor"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </div>
        </el-collapse-item>
        <el-collapse-item class="gover_item" title="附件及备注" name="7">
          <ul class="goverList">
            <li class="btn">
              <span>上传附件</span>
              <el-radio v-model="isUpload" label="1">是</el-radio>
              <el-radio v-model="isUpload" label="2">否</el-radio>
            </li>
            <li class="btn" v-if="keyword">
              <el-upload
                    class="upload-demo"
                    drag
                    action="/api/Bid/project/projectCreate"
                    :auto-upload="false"
                    ref="upload"
                    :limit='1'
                    :on-success="onSuccess"
                    :data="projectCreate"
                    multiple>
                     <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </li>
            <li>
              
              <p>已上传文件:<span class="path">{{this.projectCreate.accessoryPath}}</span>(如需更改已上传的文件,请直接点击上传附件,将覆盖此文件)</p>
            </li>
            <li class="btn">
              <el-button type="primary" @click="draft">保存草稿</el-button>
              <el-button type="success" v-if="edit1" @click="submit">保存修改</el-button>
              <el-button type="success" v-else @click="submit">提交立项</el-button>
              <el-button type="info" @click="cancel">取消</el-button>
            </li>
          </ul>
        </el-collapse-item>
    </el-collapse>
    </div>
</template>
<script>
import { regionData,CodeToText } from 'element-china-area-data';
import QuillEditor from '../quillEditor/quillEditor.vue';  
import Qs from 'qs';
export default {
		    name: 'App',
		    computed: {
               editor() {
                    return this.$refs.myQuillEditor.quill;
                }
            },
    data() {
      return {
        activeNames: ['1'],
        name:"",
        options: [{
          value: 1,
          label: '黄金糕'
        }, {
          value: 2,
          label: '双皮奶'
        }, {
          value: 3,
          label: '蚵仔煎'
        }, {
          value: 4,
          label: '龙须面'
        }, {
          value: 5,   
          label: '北京烤鸭'
        }],
        value: '',
        address: regionData,//地址选择器
        selectedOptions: [],
        selectedOptions1: [],
        radio: '1',//项目执行方式
        model:true,
        member:[//执行人员添加删除
          {"id":""}
        ],
        keyword:false,//是否上传附件开关
        isUpload:"",//是否上传附件
        section:"",//项目成员的部门
        projectCreate:{
          projectName:"",//项目名称
          projectNum:"",//公司项目编号
          leve:"",//项目级别
          type:"",//招采类型
          administrativeArea:"",//行政区域

          runMode:"",//执行方式
          takeCharge:"",//负责人
          source:"",//项目来源
          role:"",//权限
          list:[],//项目成员

          purchaseWay:"",//采购方式
          reviewWay:"",//评审方式
          moneyLower:"",//预算金额小写
          moneyCapital:"",//预算金额大写
          object:"",//采购对象
          purchaseType:"",//采购类型 
          moneySource:"",//资金来源 
          industry:"",//所属行业
          subpackageNum:"",//分包个数
          department:"",//行业主管部门

          purchaseItems:"",//采购品目
          purchaseArea:"",//采购行政区域
          purchaseName:"",//采购单位名称
          purchaseAddress:"",//采购通讯地址
          purchaseContact:"",//采购项目联系人
          purchaseZip:"",//采购邮编
          purchaseContactWay:"",//采购联系方式

          agencyName:"",//代理单位名称
          agencyAddress:"",//代理通讯地址
          contactId:"",//代理项目联系人
          contactWay:"",//代理联系方式
          agencyZip:"",//代理邮政编码
          faxNum:"",//传真号码
          prerequisites:"",//资格条件
          technologyBusiness:"",//技术商务
          isUpload:"",//是否上传附件
          accessoryPath:"",//附件路径
          status:"",//状态(1为草稿)
          userId:localStorage.getItem("id"),//用户id
        },
        edit1:false
        
      }
      
      
    },
    watch: {
      radio: function (newQuestion, oldQuestion) {
        if(newQuestion=="2"){
          this.model=false;
        }else{
          this.model=true;
        }
      },
      isUpload:function(newQuestion, oldQuestion){
        if(newQuestion=="1"){
          this.keyword=true;
        }else{
          this.keyword=false;
        }
      }
    },
    mounted(){
      let id=localStorage.getItem("id");
      this.$axios.post("/Bid/project/selectDraft",{
        params:{
          userId:id
        }
      }).then(res=>{
        console.log(res)
      })
      this.edit1=this.$route.params.edit;
      if(this.edit1){
          let id=this.$route.params.key;//编辑返回全部信息
          this.$axios.post('/Bid/project/getProjectDetail',null,{
              params:{
                
                  id:id
              }
          })
          .then(res=>{
            console.log(res)
              this.projectCreate=res.data
          });
      }
      
    },
    methods: {
      draft(){//保存草稿按钮
        this.projectCreate.status=1
        let array=this.member;
        let list=[]
        array.forEach(e => {
          console.log(e.id);
          list.push(e.id)
        });
        list=JSON.stringify(list);
        this.projectCreate.list=list;
        parseInt(this.projectCreate.subpackageNum)
        parseInt(this.projectCreate.contactId)
        console.log(this.projectCreate)
        if(this.isUpload=="1"){
          this.$refs.upload.submit();
        }else{
          this.$axios.defaults.headers={
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
          }
          this.$axios({
            method:"POST",
            url:"/Bid/project/projectCreate",
            data:Qs.stringify(this.projectCreate)
          }).then(res=>{
            console.log(res)
            if(res.data==1){
              this.$message({
                    message: '提交草稿成功,正在跳转回上一页',
                    type: 'success',
                    onClose:()=>{
                       this.$router.go(-1)
                    }
                });
            }else{
              this.$message({
                message: '提交草稿失败,请重新提交',
                type: 'warning'
              });
            }
          })

        }
        
      },
      cancel(){//取消按钮
        this.$router.go(-1)
      },
      submit(){//提交按钮
        this.projectCreate.status=2
        let array=this.member;
        let list=[]
        array.forEach(e => {
          console.log(e.id);
          list.push(e.id)
        });
        list=JSON.stringify(list);
        this.projectCreate.list=list;
        parseInt(this.projectCreate.subpackageNum)
        parseInt(this.projectCreate.contactId)
        console.log(this.projectCreate)
        if(this.isUpload=="1"){
          this.$refs.upload.submit();
        }else{
          this.$axios.defaults.headers={
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
          }
          this.$axios({
            method:"POST",
            url:"/Bid/project/projectCreate",
            data:Qs.stringify(this.projectCreate)
          }).then(res=>{
            console.log(res)
            if(res.data==1){
              this.$message({
                    message: '提交成功,正在跳转回上一页',
                    type: 'success',
                    onClose:()=>{
                       this.$router.go(-1)
                    }
                });
            }else{
              this.$message({
                message: '提交失败,请重新提交',
                type: 'warning'
              });
            }
          })

        }
      },
      onSuccess:function(res){//文件提交之后执行函数
          console.log(res)
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
      handleChange (value) {//人员信息地址
        console.log(value)
        let addr=""
        value.forEach(ele => {
          addr+=(CodeToText[ele])
        });
        this.projectCreate.administrativeArea=addr;
      },
      handleChange1 (value) {//地址
       console.log(value)
        let addr=""
        value.forEach(ele => {
          addr+=(CodeToText[ele])
        });
        console.log(addr)
        this.projectCreate.purchaseArea=addr;
      },
      add(){//增加
        let arr={"id":""};
        this.member.push(arr);
       //this.projectCreate.member
         console.log(this.member)

        
      },
      del(){//删除按钮出现
        let arr=this.member;
        arr.forEach(ele=>{
          ele.list="el-icon-delete"
        })
      },
      listDel(i){//点击每个删除
        this.member.splice(i, 1)
      },

      // 准备编辑器
      onEditorReady(editor) {},
      // 失去焦点事件
      onEditorBlur(){
      },
      // 获得焦点事件
      onEditorFocus(){},
      // 内容改变事件
      onEditorChange(){},
      saveHtml:function(event){},






    }
}
</script>
<style scoped>
.el-collapse{
  padding: 20px;
  background-color:#fff ;
  font-weight: 600;
}
.gover .el-collapse-item__header{
  padding-left: 20px;
}
.goverList{
  width:80%;
  margin:auto;
}
.goverList li{
  display: flex;
  flex-direction:row ;
  margin-bottom: 10px;
}
.goverList li>span,.goverList li>div>span{
  width:200px;
  text-align: right;
  margin-right: 20px;
  line-height: 40px;
}
.goverList li > div{
  display: flex;
  width:50%;
  flex-direction:row ;
}
.goverList li .el-select{
  width:100%;
} 
.goverList li .gover_mode{
  line-height: 14px;
}
.gover_item2{
  position: relative;
}
.gover_icon{
  position: absolute;
  right: 33px;
  top:6px;
  font-size: 25px;
}
.quill-editor{
  height:200px;
}
.richText{
  padding: 20px;
}
.btn{
  text-align: center;
}
.path{
  color: #E6A23C;
}
</style>