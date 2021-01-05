<template>
    <div>
        <div class="headbar">
          
            <input class="input1" type="text" v-model="InfoKey" placeholder="请输入查询关键词"/>
            <i class="el-icon-search ip_a" @click="unitQuery()"  title="搜索"></i>
            <i class="el-icon-circle-plus-outline"@click="" title="添加"></i>
                    
        </div>
        <div class="purcont">

                 <el-table :data="companyInfos.slice((currentPage-1)*PageSize,currentPage*PageSize)" border  style="width: 100%">
                    <el-table-column prop="companyId" label="序号"></el-table-column>
                    <el-table-column prop="companyName" label="公司名称"></el-table-column>
                    <el-table-column prop="creditCode" label="统一代码"></el-table-column>
                    <el-table-column prop="phone" label="联系人"></el-table-column>
                    <el-table-column prop="contactAddress" label="地址"></el-table-column>
                    <el-table-column prop="fax" label="传真号码"></el-table-column>
                    <el-table-column prop="zipCode" label="邮编"></el-table-column>
                    <el-table-column label="操作">
                       
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row.companyId)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="open(scope.row.companyId)">删除</el-button>
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
        InfoKey:"",
        companyInfos:[],
        screen:false,//弹出筛选条件
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
        // 个数选择器（可修改）
        pageSizes:[5,10,15,20],
        // 默认每页显示的条数（可修改）
        PageSize:5
      };
    },
    watch:{
    },
    mounted(){
        
    },

    created(){
        this.getAllInfo();
    },
    methods: {

        unitQuery(){//模糊查询
        let text=RegExp(this.InfoKey);
        if(text==""){
            this.$message({
                message: '请输入筛选条件',
                type: 'warning'
            });
        }else{
            let companyInfos=this.companyInfos,
                arr=[];
            companyInfos.forEach(e => {
                if(text.test(e.companyName) || text.test(e.contactAddress) || text.test(e.zipCode)){
                    console.log(e)
                    arr.push(e)
                    
                }
            });
            this.companyInfos=arr;
            this.totalCount=arr.length;
            this.$message({
                message: '查询成功',
                type: 'success'
            });
            this.InfoKey="";
        }
        
      },



        edit(id){//点击编辑
        this.$router.push({
            name:'editCompany',
            params:{
                edit:true,
                id:id
            }
        })
      },

        getAllInfo(){
            this.$axios.post('/Bid/company/getCompanyInfo',null,
      {params:{
               
            }}
            ).then(res=>{
                
                     console.log("机构数据:"+res.data);
                     this.companyInfos=res.data;
                     this.companyInfos1=res.data;
                     this.totalCount=res.data.length;     
        })
        },

        
        

        open(id) {//弹窗 点击删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((action) => {
            this.$axios.post('/Bid/company/deleteCompanyInfo',null,{
            params:{
                id:id
            }
            })
            .then(res=>{
                console.log("lala"+res.data);
                if(res.data==1){
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        onClose:()=>{
                            this.getAllInfo();
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
                path: `/newPurchaser`,
            })
      },
    
    }






}
</script>
<style scoped>

.input1{
    
    height:30px;

}

.btn{

    background-color: #6be0e0;
   
}
.headbar{
    padding-top: 15px;
    width:99%;
    height:50px;
    background-color: #fff;

}
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

.mess{
    padding:0 30px;
    width:95%;
    margin-top:10px;
    background-color: #fff;
}
.m_list li{
    color: rgb(66, 62, 62);
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
.pur-left .ip_a{
    left:150px;
}
   
.pur-eject p{
    display: block;
    margin:20px;
}
.pur-eject{
    width:330px;
    left:-75px;
}
.pur-eject>.el-select{
    margin:5px 0;
}
.pur-btn .el-icon-edit{
    font-size: 10px;
    color: #fff;
}
</style>