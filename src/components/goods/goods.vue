<template>
    <div class="goods">
        
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <div class="calendar">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">日历备忘</h6>
                    </div>
                    <el-calendar v-model="value" id="calendar"> 
                        <template slot="dateCell" slot-scope="{date,data}"> 
                            <p :class="data.isSelected ? 'is-selected' : ''">
                                {{date.getDate()}}
                                <span v-if='compare(data.day)' class="tagging"></span>
                            </p>
                        </template>
                    </el-calendar>
            
                </div>
                </div>
            </el-col>
            <el-col :span="18" style="min-width: 800px;">
                <div class="grid-content bg-purple clearfloat">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">消息通知</h6>
                    </div>
                    <ul class="task clearfloat">
                        <li :class="{'liBg':item.in}" v-for="(item,index) in titleList" :key="index" @click="taskTitle(index)">
                            {{item.value}}
                        </li>
                    </ul>
                    
                    <ul class="nuws1 bor">
                        <li class="pur_text">序号</li>
                        <li>项目名称</li>
                        <li>行政区域</li>
                        <li>招采联系人</li>
                        <li>所在部门</li>
                        <li>座机号码</li>
                    </ul>
                    <div class="messageContent">
                        <div class="g-i">
                            <i class="iconfont icon-zanwushuju"></i>
                            <p>暂无数据</p>
                        </div>
                        <ul class="nuws1 m_list">
                            <li class="pur_text">序号</li>
                            <li>单位名称</li>
                            <li>行政区域</li>
                            <li>招采联系人</li>
                            <li>所在部门</li>
                            <li>座机号码</li>
                        </ul>
                        <ul class="nuws1 m_list">
                            <li class="pur_text">序号</li>
                            <li>单位名称</li>
                            <li>行政区域</li>
                            <li>招采联系人</li>
                            <li>所在部门</li>
                            <li>座机号码</li>
                        </ul>
                    </div>
                    <el-button-group class="f_r">
                        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
                        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    </el-button-group>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="bot">
            <el-col :span="6">
                <div class="grid-content bg-purple m_box">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">备忘任务</h6>
                        <i class="el-icon-more f_r" @click="memo1"></i>
                    </div>
                    <div class="memo"> 
                        <div class="memoAdd">点击添加当日备忘任务</div>
                        <div class="memoList clearfloat" v-for="(item,i) in memo" :key="i">
                            <span class="span f_l"></span>
                            <div class="text f_l">
                                <p>{{item.value}}</p>
                                <i class="el-icon-star-on" v-for="(x,y) in item.icon" :key="y"></i>
                            </div> 
                            <el-button :type="item.judge" class="f_r btn" plain @click="complete(item)">{{item.key}}</el-button>
                        </div>
                        
                    </div>
                    <i class="el-icon-circle-plus i" @click="unfold" title="添加任务"></i>
                    <div class="m_foot" v-if="scoreOpen">

                        <div class="m_eject">
                            <h6 class="clearfloat">备忘任务<i class="el-icon-error f_r" @click="close"></i></h6>
                            <div class="e_text">
                                <ul class="e_ul">
                                    <li>
                                        <span>备忘描述</span>
                                        <div class="description">
                                            <el-input v-model="notes.describe" placeholder="请填写备忘描述"></el-input>
                                        </div>
                                    </li>
                                    <li>
                                        <span>备忘日期</span>
                                        <el-date-picker
                                            v-model="notes.cheatDate"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </li>
                                    <li>
                                        <span>重要程度</span>
                                        <el-rate class="score" v-model="notes.level" shoow-text :max="max" @change="score"></el-rate>
                                    </li>
                                </ul>
                                <div class="e_foot">
                                    <el-button type="primary" size="medium" @click="preservation">保存</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple m_box">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">公司通讯</h6>
                        <i class="el-icon-more f_r" @click="communication"></i>
                    </div>
                    <div class="memo2">
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                        <div class="communication">
                            <i class="el-icon-user "></i> 
                            <span>公司名字共公司名字共公司名字</span>
                        </div>
                    </div>
                    
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple m_box">
                   <div class="clearfloat c_top">
                        <h6 class="f_l">计划总结</h6>
                        <i class="el-icon-more f_r c_i" @click="plan"></i>
                        <i class="el-icon-circle-plus-outline f_r c_i" @click="summary"></i>
                    </div>
                    <div class="memo2">
                        <div class="c_top plan" v-for="(item,index) in tableData" :key="item.planId">
                            <div class="clearfloat">
                                 <span class="f_l">{{item.startDate}}</span>
                                <i class="el-icon-edit f_r c_i" @click="edit(item.planId)"></i>
                            </div>
                            <div class="clearfloat p_text">
                                <i class="el-icon-picture-outline-round f_l"></i>
                                <p class="f_l">{{item.content}}</p>
                                <p class="f_r">{{item.addTime}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark m_box opening">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">近期开标</h6>
                        <i class="el-icon-more f_r" @click="opening"></i>
                    </div>
                    <div class="memo2">
                        <ul class="open_ul">
                            <li>序号</li>
                            <li>项目名称</li>
                            <li>采购单位</li>
                            <li>招采类型</li>
                            <li>项目负责人</li>
                            <li>开标时间</li>
                            <li>开标场地</li>
                        </ul>
                        <ul class="open_ul open_ul2" v-for="(item,index) in tableData2" :key="index">
                            <li>{{item.date}}</li>
                            <li>{{item.name}}</li>
                            <li>{{item.province}}</li>
                            <li>{{item.city}}</li>
                            <li>{{item.address}}</li>
                            <li>{{item.zip}}</li>
                            <li>{{item.tag}}</li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            calendarData: [
                    { months: ['09', '11'],days: ['15'],things: '看电影' },
                    { months: ['10', '11'], days: ['02'],things: '去公园野炊' },
                    { months: ['11'], days: ['02'],things: '看星星' },
                    { months: ['11'], days: ['02'],things: '看月亮' }   
                ],
            // userName:"",
            // password:"",
            value: new Date(),//日期
             // 日期选中添加备忘录
            target:[],
            time:"",//存储选中日期
            tableData: [],
            tableData2: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333,
                tag: '家'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333,
                tag: '公司'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333,
                tag: '家'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333,
                tag: '公司'
            }],
            titleList:[
                {value:"任务预警",in:false},
                {value:"通知消息",in:false},
                {value:"任务消息",in:true},
            ],
            memo:[
                // {value:"任务消息1",key:"已完成",judge:"success",icon:3},
                // {value:"任务消息2",key:"未完成",judge:"warning",icon:2},
                // {value:"任务消息3",key:"未完成",judge:"warning",icon:1},
            ],
            star:null,
            max:3,
            // scoreNum:"",//星星评分
            scoreOpen:false,//备忘开关
            // memoDate:'',//备忘日期
            memotime:"",//储存备忘日期
            // describe:"",//备忘描述
            notes:{//备忘任务添加
                describe:"",
                cheatDate:"",
                level:0,
                userId:localStorage.getItem("id")
            }
           

        }
    },
    mounted(){
        let name=this.$route.params.key;//编辑返回全部信息
        // let date=this.value;
        window.addEventListener('scroll', this.scrollToTop);
        this.plaSummary();

        //获取当日的备忘
        let date = new Date();//实例一个时间对象；
        let year = date.getFullYear();//获取系统的年；
        let month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
        let day = date.getDate();//获取系统日
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        let time=year+"-"+month+'-'+day;
        this.datetime(time);
        let id=localStorage.getItem("id");

        //获取全部备忘
        this.$axios.post("/Bid/workbench/getList",null,{
            params:{
                userId:id,
            }
        }).then(res=>{
            let arr=[];
            res.data.forEach(ele => {
                let date=new Date(ele.cheatDate);
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
                ele.cheatDate=fmt;
                arr.push(fmt)
            });
            
            arr=Array.from(new Set(arr))
            this.target=arr
        })

    },
    methods:{
        plaSummary(){//计划总结
             this.$axios.post("/Bid/workbench/getWorkPlan",null,{
                params:{
                    userId:localStorage.getItem("id"),
                } 
             }).then(res=>{
                 this.filtering(res.data)
             })
            
        },
        edit(id){//点击编辑
            this.$router.push({
                name:"summary",
                params:{
                    key:id
                }
            })
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
            console.log(data)
            this.tableData=data;

        },
        datetime(date){//获取提交过的备忘日期
            this.$axios.post("/Bid/workbench/getListByDate",null,{
                params:{
                    userId:localStorage.getItem("id"),
                    date:date
                }
            }).then(res=>{
                let data=res.data; 
                let memo=[];
                for(let i=0;i<data.length;i++){
                    let key="";
                    let judge=""
                    if(data[i].status==1){
                       key="未完成";
                       judge="warning"
                    }else{
                       key="已完成";
                       judge="success"
                    }
                    let newObj={
                        value:data[i].describe,
                        key:key,
                        judge:judge,
                        icon:data[i].level,
                        cheatId: data[i].cheatId
                    };
                    memo.push(newObj)
                }
                this.memo=memo;
            })
        },
        //日历备忘
        compare(day){                                                               
            let arr=this.target;
            for(let index in arr){
                if(day===this.target[index]){
                    return true
                }
            }
            return false
        },
        taskTitle(index){//任务消息
            let list=this.titleList;
            list.forEach(ele => {
                ele.in=false;
            });
            list[index].in=true;
            this.$router.push({
                path: `/message`,
            })
        },
        complete(i){//备忘任务按钮 
            //console.log(i)
            
            
        },
        communication(){//通讯录点击
            this.$router.push({
                path: `/communication`,
            })
        },
        opening(){
            this.$router.push({
                path: `/opening`,
            })
        },
        memo1(){//备忘任务跳转
            this.$router.push({
                path: `/memo`,
            })
        },
        score(element){//评分点击
           this.notes.level=element;
        },
        unfold(){//备注任务添加
            this.scoreOpen=true;
            //var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // scrollTop=0;
        },
        close(){//备注任务关闭
            this.scoreOpen=false;
        },
        minput(e){//备忘录input
            console.log(e)
        }, 
        preservation(){//备忘录提交
            // let cont={
            //     value:this.notes.describe,key:"未完成",judge:"success",icon:this.notes.level
            // }
            // let memo =this.memo;
            // memo.push(cont);
            let d=this.notes.cheatDate;
            const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            this.notes.cheatDate=newDate;
            this.$axios.post("/Bid/workbench/addCheatTask",null,{
                params:this.notes
            }).then(res=>{
                if(res.data==1){
                    var date = new Date();//实例一个时间对象；
                    var year = date.getFullYear();//获取系统的年；
                    var month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
                    var day = date.getDate();//获取系统日
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (day >= 0 && day <= 9) {
                        day = "0" + day;
                    }
                    var time=year+"-"+month+'-'+day;
                    this.$message({
                        type: 'success',
                        message: '添加成功',
                        onClose:()=>{
                            this.scoreOpen=false;
                            this.datetime(time)
                        }
                    });
                }
            })
        },
        plan(){//计划总结跳转
            this.$router.push({
                path: `/plan`,
            })
        },
        summary(){//添加计划,跳转添加页面
            this.$router.push({ 
                path: `/summary`,
            })
        }

    },
    watch:{
        value:{
            handler(newValve,oldvalue){
                let date=newValve;
                let month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
                let day = date.getDate();//获取系统日
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (day >= 0 && day <= 9) {
                    day = "0" + day;
                }
                let date_value=date.getFullYear() + '-' + month + '-' + day;
                 this.time=date_value;
                 this.datetime(date_value)
            }
        },
        memoDate:{
            handler(newValve,oldvalue){
                let date=newValve;
                let month=(date.getMonth() + 1)>9?(date.getMonth() + 1):'0'+(date.getMonth() + 1);
                let getda= date.getDate()>9? date.getDate():'0'+ date.getDate();
                let date_value=date.getFullYear() + '-' + month + '-' + getda; 
                // + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();   时分秒
                 this.memotime=date_value;
            }
        }
    }
    
}
</script>



<style>
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
.goods i{
    font-style:normal;
    font-size:20px;
    margin: 0 5px;
    cursor:pointer;
}
.calendar h6,.calendar p{
    display: inline-block;
}
.week{
    width:100%;
}
.week li{
    display: inline-block;
    width:37px;
    text-align: center;
    margin: 10px 0;
}
.el-calendar-table .el-calendar-day{
    height:35px;
}
.el-calendar-table td.is-selected {
    background-color: rgb(159, 204, 250);
}
.bg-purple{
    background-color:#fff ;
    padding: 10px;
}
.task{
    width:100%;
}
.task li{
    float:right;
    width:80px;
    height:30px;
    color: #009f9d;
    text-align: center;
    line-height: 30px;
    cursor:pointer;
}
.task .liBg{
    border-radius: 10px;
    background-color: #009f9d ;
    color: #fff;
}
.bot{
    margin-top:20px;
}
.g-i{
    text-align: center;
    margin:30px auto;
    color: #ccc;
}
.g-i i{
    font-size: 130px;
}
.memo{
    color: #ccc;
    max-height: 250px;
    overflow:auto
}
.m_box .i{
    font-size: 30px;
    margin-top:20px;
    color: #009f9d;
}
.m_box{
    height:350px;
    text-align: center;
}
.memoList{
    width:100%;
    margin-top:10px;
}
.memoList .span{
    display:inline-block;
    width:10px;
    height:10px;
    border-radius: 50%;
    background-color: red;
    margin:20px 10px;
}
.text {
    width:60%;
    color: #000;
    font-size: 12px;
    text-align: left;
}
.btn{
    margin-top:10px;
}
.text p{
    height:35px;
    text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.text i{
    /* display:block; */
    color: rgb(221, 221, 0);
}
.communication{
    margin-top:5px;
    border-bottom:1px solid #ccc ;
}
.communication i{
    font-size: 35px;
    margin-left: 10px;
    vertical-align: middle;
}
.communication span{
    display: inline-block;
    width:80%;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size:14px;
    text-align: left;
}
.memo2{
    color: rgb(131, 131, 131);
    max-height: 300px;
    overflow:auto
}
.c_i{
    font-size: 25px;
}
.plan{
    width:80%;
    margin:10px auto;
    border:1px solid #ccc;
    padding: 10px;
}
.plan span{
    color: rgb(131, 131, 131);
}
.p_text{
    margin:10px 0;
    line-height: 30px;
}
.p_text i{
    color: #009f9d;
    font-size: 30px;
}
.opening{
    background-color:#fff ;
    padding: 10px;
    margin-top:20px;
} 
.open_ul{
    display: flex;
    justify-content: center;
}
.open_ul li{
    width:200px;
}
.open_ul2 li{
    margin-top:10px;
    color: rgb(54, 54, 54);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor:pointer
}
.m_eject{
    padding: 10px;
    width:600px;
    margin:300px auto;
    background-color: #fff;
}
.m_eject h6{
    text-align: left;
    color: #009f9d;
}
.e_ul{
    width:400px;
    margin:10px auto;
    text-align: left;
}
.e_ul input{
    width: 300px;
    height:30px;
}
.e_ul span{
    margin-right: 20px;
    color: rgb(146, 146, 146);
}
.e_ul li{
    margin-top:20px;
}
.score{
    display: inline-block;
}
.m_foot{
    position: fixed;
    top:0px;
    left:0px;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.e_foot{
    margin-top:20px ;
}
.tagging{
    position: relative;
    top:-10px;
    left: 10px;
    display: inline-block;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background-color: red;
}

.nuws1{
    display: flex;
    justify-content: left;
    margin:10px 0;
    
}
.nuws1 i{
    font-size: 12px;
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
.messageContent{
    overflow: hidden;
    height: 250px;
    
}
.description{
    display: inline-block;
    width:75%;
}

</style> 
