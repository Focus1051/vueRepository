<template>
    
     <div class="cont">
         <el-col :span="24">
                <div class="mess2">
                    <div class="clearfloat c_top planh6 calendar">
                        <h6 class="f_l">计划总结</h6>
                        <div class="m_left f_r">
                            <i class="el-icon-search ip_a" @click="unitQuery" title="查询"></i>
                            <input type="text" v-model="company" placeholder="查询关键字"/>
                            <i class="el-icon-circle-plus car" @click="clickScreen" title="添加"></i>
                        </div>
                    </div>
                   
                </div>
            </el-col>
            <el-col :span="24">
                <div class="mess2 calendar">  
                     <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
                        <el-table-column class="table" prop="startDate" label="计划日期" width="320"></el-table-column>
                        <el-table-column prop="content" label="工作计划" width="480"></el-table-column>
                        <el-table-column prop="addTime" label="提交日期"></el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="edit(scope.row.planId)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="open(scope.row.planId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="purcont">
                    <el-pagination @size-change="handleSizeChange" 
                                @current-change="handleCurrentChange" 
                                :current-page="currentPage" 
                                :page-sizes="pageSizes" 
                                :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                                :total="totalCount">
                    </el-pagination>
                </div>
            </el-col>
       
    </div>
    
</template>
<script>
export default {
    data() {
      return {
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
        company:"",//关键字查询
      };
    },
    watch:{
    },
    mounted(){
        this.fn();
        
    },
    methods: {
      fn(){
          this.$axios.post("/Bid/workbench/getWorkPlan",null,{
            params:{
                userId:localStorage.getItem("id"),
            } 
        }).then(res=>{
            this.tableData=res.data;
            this.totalCount=res.data.length;
            this.tableData1=res.data;
            this.filtering(this.tableData);
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
                    if(text.test(e.addTime) || text.test(e.content)|| text.test(e.endDate)|| text.test(e.startDate)){
                        arr.push(e)
                        
                    }
                });
                console.log(arr)
                this.tableData=arr;
                this.totalCount=arr.length;
                this.$message({
                    message: '查询成功',
                    type: 'success'
                });
                this.company="";
            }
        },
      clickScreen(){//点击添加跳转
        this.$router.push({
            path: `/summary`,
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
       filtering(data){//封装函数
            let arr=[];
            data.forEach(ele => {
                //日期转换
                arr=[
                    ele.startDate,
                    ele.endDate,
                    ele.addTime
                ]
                for(let i=0;i<arr.length;i++){
                    let date=new Date(arr[i]);
                    let fmt='YYYY-mm-dd';
                    let ret;
                    const opt = {
                        "Y+": date.getFullYear().toString(),        // 年
                        "m+": (date.getMonth() + 1).toString(),     // 月
                        "d+": date.getDate().toString(),            // 日
                    };
                    for (let k in opt) {
                        ret = new RegExp("(" + k + ")").exec(fmt);
                        if (ret) {
                            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                        };
                    };
                    arr[i]=fmt

                }
                ele.startDate=arr[0]+" 至 "+arr[1],
                ele.addTime=arr[2];
            });
            console.log(this.tableData)

        },
    edit(id){//点击编辑
        this.$router.push({
            name:"summary",
            params:{
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
            this.$axios.post('/Bid/workbench/deleteWorkPlan',null,{
            params:{
                planId:id
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
.calendar{
    background-color: #fff;
}
.mess2{
    margin-bottom: 20px;
}
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
.planh6 h6{
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
    margin: 6px;
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

.nuws{
    display: flex;
    justify-content: left;
    
}
.nuws li{
    font-weight: 600;
    width:20%;
    color: #009f9d;
    font-size: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;

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