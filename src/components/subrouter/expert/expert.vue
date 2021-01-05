<template>
    <div>
        <div class="purcont">
            <div class=" pur-left">
                    <i class="el-icon-search ip_a" @click="unitQuery"></i>
                    <input type="text" v-model="company" placeholder="查询关键字"/>
                    <i class="el-icon-circle-plus-outline addIcon" @click="clickScreen2"></i>
                    <span class="add">添加</span>
                    <i class="el-icon-download addIcon"></i>
                    <span class="add" >导出</span>
                   
                </div>
                <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
                    <el-table-column class="table" prop="name" label="专家姓名" width="180"></el-table-column>
                    <el-table-column prop="expertNum" label="专家证号" width="180"></el-table-column>
                    <el-table-column prop="position" label="职称"></el-table-column>
                    <el-table-column prop="mobilePhone" label="手机号码"></el-table-column>
                    <el-table-column prop="unit" label="所在单位"></el-table-column>
                    <el-table-column prop="items" label="专业品目"></el-table-column>
                    <el-table-column prop="" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="edit(scope.row.expertId)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="open(scope.row.expertId)">删除</el-button>
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
import { regionData,CodeToText } from 'element-china-area-data';
export default {
    data() {
      return {
          city:"",
          company:"",//查询单位名称
          city:"",
          tableData1:[],
          totalCount1:1,
        cityValue:[
            {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
        ],
        screen:false,//弹出筛选条件
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
          this.$axios.post('/Bid/expert/getList',null,{
            })
            .then(res=>{
                if(res.data.length==0){
                }else{
                    console.log(res.data)
                    this.tableData=res.data;
                    this.totalCount=res.data.length;
                    this.tableData1=res.data;
                    this.totalCount1=res.data.length;
                }
                
            })
        },
        // tableToExcel(){//下载
        //     var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
        //     str =  encodeURIComponent(str);
        //     this.aHref = "data:text/csv;charset=utf-8,\ufeff"+str;
        //     aLink.click();
        // },
        unitQuery(){//单位查询
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
                    if(text.test(e.name) || text.test(e.position) || text.test(e.unit)|| text.test(e.items)){
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
      edit(id){//点击编辑
        this.$router.push({
            name:'addExpert',
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
            this.$axios.post('/Bid/expert/deleteExpert',null,{
            params:{
                expertId:id
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
      eject1(i){
           let arr=this.vaList;
           this.value=arr[i].va
      },
      clickScreen(){//点击出现弹窗
        let i=this.screen;
        if(i==false){
            this.screen=true;
        }else{
            this.screen=false;
        }
      }, 
      cancel(){//筛选取消
        this.screen=false;
      },
      clickScreen2(){
           this.$router.push({
                path: `/addExpert`,
            })
      }





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

.nuws1{
    display: flex;
    justify-content: left;
    
}
.nuws1 li{
    font-weight: 600;
    width:20%;
    color: #009f9d;
    font-size: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
}
.nuws1 .pur_text{
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
.pur-left input{
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
    height: 30px;
    padding-left: 15px;
}
.pur-left .ip_a{
    left:150px;
}
   
.pur-eject p{
    display: blocks;
    margin:20px;
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
.ip_a{
    position: absolute;
    top:8px;
    left:160px;
    
}
.pur-eject{
    width:330px;
    left:0;
}
.eject{
    position:absolute;
    z-index: 5;
    top:45px;
    cursor: pointer;
    box-shadow: 0 5px 7px 2px #ccc;
    background-color: #fff;
    text-align: center;
} 
.div{
    margin:20px 0;
    text-align: center;
}
h6{
    background-color: #606266;
    color:#fff;
    padding: 10px 0;
}
</style>