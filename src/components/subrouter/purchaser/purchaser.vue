<template>
    <div>
        <div class="purcont">
            <div class=" pur-left">
                    <i class="el-icon-search ip_a" @click="unitQuery"></i>
                    <input type="text" v-model="company" placeholder="请输入关键词"/>
                    <i class="el-icon-caret-bottom car" title="行政区域查询" @click="clickScreen"></i>
                    <span class="m_span">
                        <div class="eject pur-eject" v-if="screen">
                            <h6>筛选</h6>
                            <p>行政区域</p>
                            <el-cascader
                                size="large"
                                :options="address"
                                v-model="selectedOptionsa"
                                @change="handleChange">
                            </el-cascader>
                            <div class="div">
                                <el-button size="small" type="info" @click="cancel">取消</el-button>
                                <el-button size="small" type="success" @click="filterQuery">查询</el-button>
                            </div>
                        </div>
                    </span>
                    
                    <i class="el-icon-circle-plus-outline"@click="clickScreen2" title="添加"></i>
                </div>
            <el-table border :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
                <el-table-column class="table" prop="unitName" label="单位名称" width="180"></el-table-column>
                <el-table-column prop="administrativeArea" label="行政区域" width="180"></el-table-column>
                <el-table-column prop="contacts" label="招采联系人"></el-table-column>
                <el-table-column prop="sector" label="所在部门"></el-table-column>
                <el-table-column prop="telePhone" label="座机号码"></el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="open(scope.row.id)">删除</el-button>
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
    </div>
</template>
<script>
import { regionData,CodeToText } from 'element-china-area-data';
export default { 
    data() {
      return {
          company:"",//查询单位名称
          selectedOptionsa:[],//地址
          address: regionData,//地址选择器
          screenAddr:"",
          city:"",
          tableData1:[],
          totalCount1:1,
        
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
    mounted(){//页面加载完执行函数
        this.fn()
    },
    methods: {
      fn(){
          this.$axios.post('/Bid/message/selectAll',null,{
            params:{
                type:"1"
            }
        })
        .then(res=>{
            if(res.data.length==0){
            }else{
                this.tableData=res.data;
                this.totalCount=res.data.length;
                this.tableData1=res.data;
            }
            
        })
      },
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
                if(text.test(e.unitName) || text.test(e.contacts) || text.test(e.sector)){
                    console.log(e)
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
      handleChange (value) {//筛选的地址
        let addr=""
        value.forEach(ele => {
          addr+=(CodeToText[ele])
        });
        this.screenAddr=addr;
      },
      filterQuery(){//筛选查询
        let text=this.screenAddr;
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
                if(text.match(e.administrativeArea)){
                    arr.push(e)
                }
            });
            this.tableData=arr;
            this.totalCount=arr.length;
            this.$message({
                message: '查询成功',
                type: 'success'
            });
            this.screen=false;
        }

      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
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
       clickScreen2(){//添加跳转
        this.$router.push({
            name:'newPurchaser',
            params:{
                id:1
            }
        })
      },
      edit(id){//点击编辑
        this.$router.push({
           name:'newPurchaser',
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
            this.$axios.post('/Bid/message/deleteInfo',null,{
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
    }






}
</script>
<style scoped>
.purcont{
    padding: 20px 30px;
    width:95%;
    background-color: #fff;
    margin-top:20px;
}

.m_list{
    margin-top: 10px;
    
}
.m_list li{
    color: rgb(150, 150, 150);
    line-height: 40px;
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

.pur-eject p{
    display: block;
    margin:20px;
}
.pur-eject{
    
    width: 330px;
    left:-75px;
}
.pur-eject>.el-select{
    margin:5px 0;
}
.pur-btn .el-icon-edit{
    font-size: 10px;
    color: #fff;
}


.ip_a{
    position: absolute;
    top:8px;
    left:160px;
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