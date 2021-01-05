
<template>
    
     <div class="cont">
         <el-col :span="24">
                <div class="mess">
                    <div class="clearfloat c_top memo-top">
                        <h6 class="f_l memo-top">备忘任务</h6>
                        <div class="m_left f_r">
                            <i class="el-icon-search ip_a" @click="unitQuery"></i>
                            <input type="text" v-model="company" placeholder="查询关键字"/>
                            <i class="el-icon-caret-bottom car" @click="clickScreen"></i>
                            <span class="m_span">
                                <div class="eject" v-if="screen">
                                    <h6>筛选</h6>
                                    <p>任务状态</p>
                                <el-dropdown :hide-on-click="false">
                                        <span class="el-dropdown-link">
                                            {{value}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(item,i) in vaList" :key="i" @click.native="eject1(i)">{{item.va}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <div class="div">
                                        <el-button size="small" type="info" @click="cancel">取消</el-button>
                                        <el-button size="small" type="success" @click="statusQuery">查询</el-button>
                                    </div>
                                </div>
                            </span>
                            <span class="m_span">
                                <div class="eject" v-if="screen2">
                                    <h6>日期筛选</h6>
                                    <h6 class="date">开始日期</h6>
                                    <el-date-picker
                                        v-model="query.startDate"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    <h6 class="date">结束日期</h6>
                                <el-date-picker
                                        v-model="query.endDate"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    <div class="div">
                                        <el-button size="small" type="info" @click="cancel2">取消</el-button>
                                        <el-button size="small" type="success" @click="dateQuery">查询</el-button>
                                    </div>
                                </div>
                            </span>
                            <i class="el-icon-date"@click="clickScreen2"></i>
                        </div>
                    </div>
                   
                </div>
            </el-col>
            <el-col :span="24">
                <div class="mess">
                    <el-table border :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
                    <el-table-column class="table" prop="cheatId" label="编号" width="100"></el-table-column>
                    <el-table-column class="table" prop="describe" label="内容" width="400"></el-table-column>
                    <el-table-column prop="level" label="重要程度" width="180">
                        <template slot-scope="scope">
                            <el-rate class="score" v-model="scope.row.level" disabled shoow-text :max="max"></el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cheatDate" label="备忘时间"></el-table-column>
                    <el-table-column prop="finishTime" label="完成时间"></el-table-column>
                    <el-table-column prop="unit" label="操作">
                        <template slot-scope="scope">
                            <el-button :type="scope.row.status" class="f_r btn" plain @click="complete(scope.row)">{{scope.row.key}}</el-button>
                            <el-button type="info" @click="deleteById(scope.row.cheatId)">删除</el-button>
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
        max:3,//星星最多3个
        activeIndex: '1',
        activeIndex2: '1',
        visible :false,
        value:"选择类型",//记录选中哪个
        vaList:[//筛选类型
            {va:"已完成",state:false},
            {va:"未完成",state:false},
        ],
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
        // 日期查询
        query:{
            startDate:"",//开始日期
            endDate:"",//结束日期
            
        }
      };
    },
    watch:{
        value1:{
            handler(newValve,oldvalue){
                let date=newValve;
                let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                 this.time1=date_value;
            }
        },
        value2:{
            handler(newValve,oldvalue){
                let date=newValve;
                let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                 this.time2=date_value;
            }
        }
    },
    mounted(){
        this.fn();
        this.getAllList();
    },
    methods: {
        getAllList(){
            this.$axios.post('/Bid/workbench/getList',null,{
            params:{
                userId:localStorage.getItem("id"),
            }
            }).then(res=>{
                this.tableData=res.data;
                this.totalCount=res.data.length;
                this.tableData1=res.data;
                let data=res.data;
                this.filtering(data)
        })

        },
        deleteById(id){
          
           this.$axios.post("/Bid/workbench/deleteCheatTask",null,{
                params:{
                    cheatId:id
                }
            }).then(res=>{
                if(res.data==1){
                  this.$message({
                        type: 'success',
                        message: '删除成功!',
                        onClose:()=>{
                            this.getAllList();
                        }
                    });
                }
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
                    if(text.test(e.key) || text.test(e.describe)){
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
        statusQuery(){//状态查询
            let text=RegExp(this.value);
            let data=this.tableData1,
                arr=[];
            data.forEach(e => {
                if(text.test(e.key)){
                    arr.push(e)
                    
                }
            });
            this.tableData=arr;
            this.totalCount=arr.length;
            this.$message({
                message: '查询成功',
                type: 'success'
            });
            this.value="选择类型";
            this.screen=false;
             
        },
        dateQuery(){//日期筛选
            let obj=[];
            console.log(this.query);
            for (const key in this.query) {
                let d=this.query[key];
                var year = d.getFullYear();//获取系统的年；
                var month = d.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
                var day = d.getDate();//获取系统日
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (day >= 0 && day <= 9) {
                    day = "0" + day;
                }
                let newDate=year+"-"+month+'-'+day;
                obj.push(newDate);
            }
            this.query.startDate=obj[0];
            this.query.endDate=obj[1];
            this.query.userId=localStorage.getItem("id");
            console.log(this.query);
            this.$axios.post("/Bid/workbench/getListByTime",null,{
                params:this.query
            }).then(res=>{
                this.tableData=res.data;
                this.totalCount=res.data.length
                this.filtering(res.data)
            })
        },
        filtering(data){//封装函数
            data.forEach(ele => {
                //日期转换
                if(ele.status==1){
                    ele.status="warning",
                    ele.key="未完成"
                }else{
                    ele.key="已完成"
                     ele.status="success"
                }
                let date=new Date(ele.cheatDate);
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
                if(ele.finishTime){
                    let date=new Date(ele.finishTime);
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
                    ele.finishTime=fmt;
                }
                
                ele.cheatDate=fmt;

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

      fn(){//获取筛选类型
            let arr =this.vaList;
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
      clickScreen2(){//点击出现弹窗
        let i=this.screen2;
        if(i==false){
            this.screen2=true;
        }else{
            this.screen2=false;
        }
      },
      cancel(){//筛选取消
        this.screen=false
      },
      cancel2(){//日期筛选取消
        this.screen2=false
      }





    },
}
</script>
<style scoped>

.delbtn{
    background-color:#fff ;
    color:#a5150b;

}
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    margin-bottom: 20px;
    border-left: 3px solid #009f9d;
    color: #132c2c;
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