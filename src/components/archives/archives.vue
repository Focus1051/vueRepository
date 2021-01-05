<template>
<div>
        <el-row> 
            <el-col :span="24">
                <div class="mess"><div class="clearfloat calendar c_top">
                        <h6 class="f_l">档案管理</h6>
                    </div>
                </div>
            </el-col>
                
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>
                    <div class="purcont">
            <div class=" pur-left">
                    <i class="el-icon-search ip_a"></i>
                    <input type="text" placeholder="查询关键字"/>
                    <i class="el-icon-caret-bottom car" @click="clickScreen"></i>
                    <span class="m_span">
                        <div class="eject pur-eject" v-if="screen">
                            <h6>筛选</h6>
                            <p>行政区域</p>
                            <el-select v-model="city" placeholder="请选择">
                                <el-option
                                v-for="item in cityValue"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="city" placeholder="请选择">
                                <el-option
                                v-for="item in cityValue"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="city" placeholder="请选择">
                                <el-option
                                v-for="item in cityValue"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="div">
                                <el-button size="small" type="info" @click="cancel">取消</el-button>
                                <el-button size="small" type="success">查询</el-button>
                            </div>
                        </div>
                    </span>
                    
                    <i class="el-icon-circle-plus-outline"@click="clickScreen2"></i>
                </div>
            <ul class="nuws1 bor">
                <li class="pur_text">序号</li>
                <li>单位名称</li>
                <li>行政区域</li>
                <li>招采联系人</li>
                <li>所在部门</li>
                <li>座机号码</li>
                <li>操作</li>
            </ul>
            <div class="icon"> 
                <i class="iconfont icon-zanwushuju"></i>
                暂无数据
            </div>
            <ul class="nuws1 m_list">
                <li class="pur_text">序号</li>
                <li>单位名称</li>
                <li>行政区域</li>
                <li>招采联系人</li>
                <li>所在部门</li>
                <li>座机号码</li>
                <li calss="pur-btn">
                    <el-button type="primary" icon="el-icon-edit" circle title="编辑" @click="open1"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="open"></el-button>
                </li>
            </ul>   
            <ul class="nuws1 m_list">
                <li class="pur_text">序号</li>
                <li>单位名称</li>
                <li>行政区域</li>
                <li>招采联系人</li>
                <li>所在部门</li>
                <li>座机号码</li>
                <li>操作</li>
            </ul>     
        </div>

        <div class="purcont">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </div>
                    
                </div>
                
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
      return {
          city:"",
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
        
      };
    },
    watch:{
    },
    mounted(){
    },
    methods: {
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
      open1() {//弹窗 点击编辑
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '通讯录', {
          dangerouslyUseHTMLString: true,
        });
      },
    open() {//弹窗 点击删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((action) => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          console.log("删除成功")
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
.calendar{
    padding: 10px;
    background-color: #fff;
}
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
/* .el-col-24{
    background-color: #fff;
    padding:0 5px;
    margin-bottom: 20px;
} */
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
    margin-top: 13px;
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
    /* display: inline-block; */
    font-size: 16px;
    margin:20px 0;
}
.eject .div{
    margin:20px 0 0 50px;
}
.date{
    font-weight: 300;
    margin:10px
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
    top:-40px;
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