<template>
     <div class="cont">
         <el-col :span="24" style="background-color:#fff;padding:20px">
             <div class="clearfloat c_top">
                <h6 class="f_l">工作计划</h6>
             </div>
             <div class="s_date">
                 <span>计划日期</span>
                  <el-date-picker
                    v-model="plantime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
             </div>
             <div class="s_list">
                 <p class="text">{{text}}</p>
                 <ul class="clearfloat">
                     <li class="f_l" v-for="(item,i) in timedate" :key="i">{{item}}</li>
                 </ul>
                 <div>
                     <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="workPlan.content">  
                    </el-input>
                 </div>
                 <div class="btn">
                     <el-button type="info">取消</el-button>
                     <el-button type="primary" v-if="btn" @click="submit">提交</el-button>
                     <el-button type="primary" v-else @click="modify">修改</el-button>
                 </div>
                 
             </div>
         </el-col>
     </div>
</template>
<script>
export default {
    data(){
        return{
            plantime: "",//日期
            time:"",//记录日期
            timedate:[],//日期数组
            textarea:"",
            text:"",//编辑时,记录之前计划日期
            btn:true,
            workPlan:{//添加工作计划提交表单
                startDate:"",//计划开始日期
                endDate:"",//计划技术日期
                content:"",//计划内容
                userId:localStorage.getItem("id"),//id
            }
        }
    },
    watch:{
        plantime:{
            handler(newValve,oldvalue){
                let startDate=newValve[0];
                let endDate=newValve[1],
                delta=endDate-startDate,
                oneDay=1000*3600*24,
                result=[];
                for(let i=0;i<=delta/oneDay; i++){
                    let date=new Date(startDate.getTime()+oneDay*i);
                    result.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
                };
                this.workPlan.startDate=result[0];
                this.workPlan.endDate=result[result.length-1];
                this.timedate=result;
                
            }
        },
    },
    mounted(){
        let key=this.$route.params.key;
        if(key){
            this.btn=false;
            this.$axios.post("/Bid/workbench/workPlanDetail",null,{
            params:{
                planId:key
            }
            }).then(res=>{
                console.log(res)
                this.filtering(res.data)
            })
        }
        

    },
    methods:{
        filtering(data){//封装函数
            let arr=[
                data.startDate,
                data.endDate,
                data.addTime
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
            data.startDate=arr[0],
            data.endDate=arr[1],
            data.addTime=arr[2]
            console.log(data)
            this.workPlan.content=data.content;
            this.workPlan.startDate=data.startDate;
            this.workPlan.endDate=data.endDate;
            this.text="计划日期为"+data.startDate+"至"+data.endDate
            let obj=JSON.parse(JSON.stringify(this.workPlan).replace(/userId/g,"planId"));
            obj.planId=data.planId;
            this.workPlan=obj;
        },
        modify(){//修改按钮
           console.log(this.workPlan)
            this.$axios.post("Bid/workbench/updateWorkPlan",null,{
                params:this.workPlan
            }).then(res=>{  
                console.log(res)
                if(res.data==1){
                    this.$message({
                    message: '修改成功,跳转到上一页',
                    type: 'success',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                    })
                }else{
                    this.$message.error('修改失败');
                }
            })
        },
        submit(){//提交按钮
            console.log(this.workPlan);
            this.$axios.post("/Bid/workbench/addWorkPlan",null,{
                params:this.workPlan
            }).then(res=>{
                console.log(res)
                if(res.data==1){
                    this.$message({
                        message: '提交成功,跳转到上一页',
                        type: 'success',
                        onClose:()=>{
                            this.$router.go(-1)
                        }
                    });
                }else{
                    this.$message.error('提交失败');
                }
            })

        },
    }
    
}
</script>
<style scoped>
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
.s_date{
    padding: 40px;
    margin:20px 0;
    border-bottom: 1px solid #009f9d;
}
.s_list{
    margin-top:10px;
}
.s_list ul li{
    width: 135px;
    height:45px;
    border:1px solid #ccc;
    margin: 10px;
    text-align: center;
    line-height: 45px;
}
.btn{
    text-align: center;
}
.text{
    margin-bottom: 10px;
    color:rgb(121, 120, 120);
}
</style>
            