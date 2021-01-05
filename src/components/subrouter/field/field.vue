<template>
    <div>
        <div class="purcont">
            <div class=" pur-left">
                    <i class="el-icon-circle-plus-outline addIcon" @click="clickScreen2"></i>
                    <span class="add">添加场地</span>
                    
            </div>
            <div class="fieldAdd" v-if="closeBtn">
                <div class="fieldAdd2">
                    <h6 class="clearfloat">
                        场地管理
                        <i class="el-icon-circle-close f_r" @click="close"></i>
                    </h6>
                    <div class="fielCont">
                        <div class="fieldList">
                            <span class="fieldSpan">场地类型</span>
                            <div class="fieldInp f_r">
                                <el-radio v-model="data.type" label="开标场地">开标场地</el-radio>
                                <el-radio v-model="data.type" label="评标场地">评标场地</el-radio>
                                <el-radio v-model="data.type" label="监督场地">监督场地</el-radio>
                            </div>
                        </div>
                        <div class="fieldList clearfloat">
                            <span class="fieldSpan">场地名称</span>
                            <div class="fieldInp f_r">
                                <el-input v-model="data.siteName" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                         <div class="fieldList clearfloat">
                            <span class="fieldSpan">容纳人数</span>
                            <div class="fieldInp f_r">
                                <el-input v-model="data.peopleCount" type="number" max=100 placeholder="请输入人数"></el-input>
                            </div>
                        </div>
                        <div class="fieldList clearfloat">
                            <span class="fieldSpan">备注</span>
                            <div class="fieldInp f_r">
                                <el-input v-model="data.remark" placeholder="请输入备注"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <el-button v-if="modify" type="success" @click="modifyBtn">修改</el-button>
                        <el-button v-else type="primary" @click="submit">完成</el-button>
                    </div>
                </div>
            </div> 
            
            <div class="clearfloat">
                <div class="f_l field clearfloat">
                   <el-radio-group v-model="isfield" style="margin-bottom: 20px;">
                        <el-radio-button :label="false">场地管理</el-radio-button>
                        <el-radio-button :label="true">使用情况</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="f_r field clearfloat">
                    <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="开标场地">开标场地</el-menu-item>
                        <el-menu-item index="评标场地">评标场地</el-menu-item>
                        <el-menu-item index="监督场地">监督场地</el-menu-item>
                    </el-menu>

                </div>
            </div>
            <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
                    <el-table-column class="table" prop="siteName" label="场地名称" width="600"></el-table-column>
                    <el-table-column prop="peopleCount" label="容纳人数" width="180"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="500"></el-table-column>
                    <el-table-column prop="" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="open(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table> 
                <div class="purcont">
                    <el-pagination @size-change="handleSizeChange" 
                                @current-change="handleCurrentChange" 
                                :current-page="currentPage" 
                                :page-sizes="pageSizes" 
                                :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                                :total="totalCount">
                    </el-pagination>
                </div> 
        </div>
    </div>
</template>
<script>
export default {
    data() { 
      return {
        screen:false,//弹出筛选条件
        radio:"1",
        data:{
             type:"",
             siteName:"",
             peopleCount:"",
             remark:"",
        },
        modify:false,//修改按钮的隐藏
        closeBtn:false,
        isfield: false,//场地管理
        isfield2: false,
        activeIndex2: '开标场地',//开标场地
        type:"开标场地",//场地类型 名称
         // 总数据
        tableData:[],
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
        // 个数选择器（可修改）
        pageSizes:[5,10,20],
        // 默认每页显示的条数（可修改）
        PageSize:5,
      };
    },
    watch:{
    },
    mounted(){
        this.fn()
    },
    methods: {
        fn(){//获取所有数据
          this.$axios.post('/Bid/site/getSiteType',null,{
              params:{
                  type:this.type,
              }
            })
            .then(res=>{
                console.log(res.data)
                if(res.data.length==0){
                    this.tableData=[]
                }else{
                    this.tableData=res.data;
                    this.totalCount=res.data.length
                }
                
            })
        },
         // 分页  每页显示的条数
       handleSizeChange(val) {
           // 改变每页显示的条数 
           this.PageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
       },
         // 显示第几页
       handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
       },
        clickScreen2(){//添加内容显示
           this.closeBtn=true;
           this.modify=false;
        },
        close(){//关闭按钮
            this.closeBtn=false;
            this.data={
             type:"",
             siteName:"",
             peopleCount:"",
             remark:"",
            };
        },
        modifyBtn(){//修改按钮
            console.log(this.data)
            this.$axios.post('/Bid/site/updateSite',null,{
            params:this.data
            })
            .then(res=>{
                if(res.data==1){
                    this.$message({
                        type: 'success',
                        message: '修改成功',
                        onClose:()=>{
                            this.closeBtn=false;
                            this.data={
                                type:"",
                                siteName:"",
                                peopleCount:"",
                                remark:"",
                            };
                            this.fn()
                        }
                    });
                }
            })
        },
        submit(){//添加场地 提交按钮
            let data=this.data;
            //this.closeBtn=false;
            if(data.type==""){
                 this.$message.error('请选择场地类型');
                 return
            };
            if(data.siteName==""){
                 this.$message.error('场地类型为必填项');
                 return
            }
            if(data.peopleCount==""){
                 this.$message.error('容纳人数为必填项');
                 return
            }
            this.$axios.post('/Bid/site/addSite',null,{
            params:data
            })
            .then(res=>{
                if(res.data==1){
                    this.$message({
                        type: 'success',
                        message: '添加成功',
                        onClose:()=>{
                            this.closeBtn=false;
                            this.data={
                                type:"",
                                siteName:"",
                                peopleCount:"",
                                remark:"",
                            };
                            this.fn()
                        }
                    });
                }
            })
        },
        edit(id){//点击编辑
            this.closeBtn=true;
            this.modify=true;
            this.$axios.post('/Bid/site/selectById',null,{
            params:{
                id:id
            }
            })
            .then(res=>{
                let cont=res.data;
                this.data={
                    id:cont.id,
                    type:cont.type,
                    siteName:cont.siteName,
                    peopleCount:cont.peopleCount,
                    remark:cont.remark,
                }
            })

        },
      open(id) {//弹窗 点击删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((action) => {
            this.$axios.post('/Bid/site/deleteSite',null,{
            params:{
                id:id
            }
            })
            .then(res=>{
                if(res.data==1){
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        onClose:()=>{
                            this.fn()
                        }
                    });
                }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });          
        });
      },
        handleSelect(key, keyPath) {//开标场地导航
            this.type=key;
            this.fn()
        },




    },
}
</script>
<style scoped>
.purcont{
    padding: 20px 30px;
    width:95%;
    background-color: #fff;
    margin-top:20px;
}

.nuwsField{
    display: flex;
    justify-content: left;
    
}
.nuwsField li{
    font-weight: 600;
    width:30%;
    color: #009f9d;
    font-size: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
}
.nuwsField .pur_text{
    width:10%;
}
.m_list{
    margin-top: 10px;
    
}
.m_list li{
    color: rgb(150, 150, 150);
}
.bor{
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
}
.icon{
    text-align: center;
    color: #ccc;
}
.icon i{
    display: block;
    font-size: 150px;
    color: #ccc;
}
.pur-left{
    position:absolute;
    top:-45px;
    right:20px;
}

.pur-left .ip_a{
    left:150px;
}
   
.pur-eject p{
    display: blocks;
    margin:20px;
}
.pur-eject{
    width:330px;
    left:-315px;
}
.add{
    font-size: 14px;
    line-height: 14px;
    vertical-align: middle;
    cursor:pointer;
}
.addIcon{
    vertical-align: middle;
}
.fieldAdd{
    z-index: 99;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    background-color: rgba(0,0,0,.4);
}
.fieldAdd2{
    width:600px;
    height:400px;
    background-color: rgb(247,248,252);
    margin:250px auto;
    border-radius: 5px;
}
.fieldAdd2 h6{
    padding: 10px;
    border-radius: 5px;
    background-color:#fff;
    border-bottom:1px solid #ccc ;
}
.fielCont{
    margin:20px;
    padding: 20px;
    background-color:#fff;
}
.fieldInp{
    width: 80%;
}
.fieldSpan{
    line-height: 40px;
}
.fieldList{
    margin-bottom: 10px;
}
.field{
    text-align: center;
}
</style>