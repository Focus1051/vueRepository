
<template>
    
     <div class="cont">
         <el-col :span="24">
                <div class="mess">
                    <div class="clearfloat c_top memo-top">
                        <h6 class="f_l memo-top">项目管理</h6>
                        <div class="m_left f_r">
                            <i class="el-icon-search ip_a" @click="unitQuery"></i>
                            <input type="text" v-model="company" placeholder="查询关键字"/>
                            <i class="el-icon-circle-plus-outline"@click="clickScreen2" title="添加"></i>
                        </div>
                    </div>
                   
                </div>
            </el-col>
            <el-col :span="24">
                <div class="mess">
                    <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
                    <el-table-column class="table" prop="projectName" label="项目名称"></el-table-column>
                    <el-table-column prop="type" label="招采类型"></el-table-column>
                    <el-table-column prop="runMode" label="执行方式"></el-table-column>
                    <el-table-column prop="takeCharge" label="项目负责人"></el-table-column>
                    <el-table-column prop="purchaseName" label="采购单位"></el-table-column>
                    <el-table-column prop="addTime" label="提交时间"></el-table-column>
                    <el-table-column prop="unit" label="编辑">
                       <template slot-scope="scope">
                            <el-button size="mini" @click="edit(scope.row.projectId)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="open(scope.row.projectId)">删除</el-button>
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
            </el-col>
       
    </div>
    
</template>
<script>
export default {
    data() {
      return {
          company:"",//关键字查询
        activeIndex: '1',
        activeIndex2: '1',
        visible :false,
        screen:false,//筛选弹窗 
        screen2:false,//日期筛选
        time1:"",
        time2:"",//记录日期变化
        // 总数据
        tableData:[],
        tableData1:[],
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
        fn(){
            this.$axios.post('/Bid/project/getList',null,{
                params:{
                    userId:localStorage.getItem("id"),
                }
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data;
                    this.totalCount=res.data.length;
                    this.tableData1=res.data;
                    let data=res.data;
                    this.filtering(data)
            
            })
        },
        unitQuery(){//关键字查询
            let text=RegExp(this.company);
            if(text==""){
                this.$message({
                    message: '请输入筛选条件',
                    type: 'warning'
                });
                return
            }else{
                let data=this.tableData1,
                    arr=[];
                data.forEach(e => {
                    if(text.test(e.projectName) || text.test(e.type) || text.test(e.takeCharge) || text.test(e.purchaseName) || text.test(e.addTime)){
                        arr.push(e)
                        
                    }
                });
                this.tableData=arr;
                this.totalCount=arr.length;
                this.$message({
                    message: '查询成功',
                    type: 'success'
                });
                this.company="";
            }
        },
        filtering(data){//封装函数
            data.forEach(ele => {
                let date=new Date(ele.addTime);
                let fmt='YYYY-mm-dd';
                let ret;
                const opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    // "H+": date.getHours().toString(),           // 时
                    // "M+": date.getMinutes().toString(),         // 分
                    // "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    };
                };
                
                ele.addTime=fmt;

            });
        },
        complete(i){//更改每一条备忘录的状态
            this.$axios.post("/Bid/workbench/updateFinish",null,{
                params:{
                    cheatId:i.cheatId
                }
            }).then(res=>{
                if(res.data){
                   i.key="已完成"
                   i.status="success"
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
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
       clickScreen2(){//添加跳转
        this.$router.push({
            name:'governmentDetails',
        })
      },
    edit(id){//点击编辑
        this.$router.push({
            name:'governmentDetails',
            params:{
                edit:true,
                key:id
            }
        })
    },
    open(id) {//弹窗 点击删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((action) => {
            this.$axios.post('/Bid/project/deleteProject',null,{
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
      }
    




    },
}
</script>
<style scoped>
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    margin-bottom: 20px;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
.memo-top{
    margin-top:10px;
}
.mess li{
    display: inline-block;
}
.m_left i:hover{
    color: rgb(58, 58, 58);
}
.m_i{
    float: left;
    font-size: 30px;
    line-height: 30px;
}
.m_title{
    width:80%;
}


.m_left{
    position: relative;
    margin: 6px 0;
    padding: 0 20px;
}
.m_left:focus{
outline:none;
}
.ip_a{
    position: absolute;
    top:6px;
    left:170px;
    
}
.m_left>input{
    border-radius: 20px;
    border: 1px solid #ccc;
    outline:none;
    height: 30px;
    padding-left:15px;
}
.m_left .m_span{
    position: relative;
}
.car{
    margin:0 20px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
.eject{
    position:absolute;
    z-index: 5;
    top:45px;
    left: -200px;
    width:200px;
    padding: 20px;
    cursor: pointer;
    box-shadow: 0 5px 7px 2px #ccc;
    background-color: #fff;
}
.eject p{
    display: inline-block;
    font-size: 16px;
}
.eject .div{
    margin:20px 0 0 50px;
}
.date{
    font-weight: 300;
    margin:10px
}
.cont{
   padding: 0;
}
.mess{
    padding:0 30px;
    width:95%;
    margin-top:10px;
    background-color: #fff;
}
.nuws{
    display: flex;
    justify-content: left;
    
}
.nuws li{
    font-weight: 600;
    width:14%;
    color: #009f9d;
    font-size: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
}
.nuws .m_text{
    width:40%;
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
</style>