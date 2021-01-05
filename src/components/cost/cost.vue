<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-purple cost">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">招标代理收费计算</h6>
                    </div>
                    <ul class="clearfloat">
                        <li class="cost_list f_l">
                            <span class="text">项目类别</span>
                            <el-select v-model="form.category" placeholder="项目类别">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </li>
                        <li class="cost_list f_l">
                            <span class="text">中标金额</span>
                            <input type="text" class="money" v-model="form.money">
                            <span class="company">万元</span>
                        </li>
                        <li class="cost_list f_l">
                            <span class="text">折扣比例</span>
                            <input type="text" class="money" v-model="form.discount">
                            <span class="company">%</span>
                        </li>
                        <li class="cost_list f_l">
                            <el-button class="cost-btn" type="success" @click="onSubmit">计算</el-button>
                        </li>
                    </ul>
                </div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple cost">
                     <div class="clearfloat c_top">
                        <h6 class="f_l">计算结果</h6>
                    </div>
                    <ul class="calculation">
                        <li class="clearfloat">
                            收费金额
                            <span class="f_r"><span class="cha">{{charge}}</span>元</span>
                        </li>
                         <li class="clearfloat">
                            折扣金额
                            <span class="f_r"><span class="cha">{{charge}}</span>元</span>
                        </li>
                    </ul>
                </div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-purple cost">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">招标代理收费计算过程</h6>
                    </div>
                    <div class="process">
                        <p>中标金额为:10万元</p>
                        <p class="guocheng">计算过程</p>
                        <p>各项结果累计得:1000.0000元</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple cost">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">费用工具列表</h6>
                    </div>
                    <ul class="tool clearfloat">
                        <li class="f_l">
                            <i class="fang el-icon-orange"></i>
                            工程设计
                        </li>
                        <li class="f_l">
                            <i class="fang2 el-icon-orange"></i>
                            工程勘察
                        </li>
                        <li class="f_l">
                            <i class="fang3 el-icon-orange"></i>
                            造价咨询
                        </li>
                        <li class="f_l">
                            <i class="fang4 el-icon-orange"></i>
                            监理服务
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-purple cost">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">招标代理收费计算说明</h6>
                    </div>
                    <div class="process">
                        <p>此计算方式及结果是根据国家计委关于印发《招标代理服务收费管理暂行办法》的通知（
                            计价格 [2002] 1980号）所规定的计算的方式得出。</p>
                        <p>注：根据《国家发展改革委关于进一步放开建设项目专业服务价
                            格的通知》发改价格 [2015] 299号的规定，建设项目前 期工作咨</p>
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
          charge:"123",//收费金额
          form: {
            category: '',
            money:"",
            discount:"",
          }
      }
    },
     methods: {
      onSubmit() {
        let data=this.form;
        console.log(data.money)
      }
    }
    
}
</script>
<style scoped>

.cost{
    padding: 20px 20px 60px;
    margin:10px;
    background-color: #fff;
}
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
i{
    font-style:normal;
    font-size:20px;
    margin: 0 5px;
    cursor:pointer;
}
.cost_list{
    width:50%;
    margin-top:20px;
}
.cost_list .text,.cost_list .company{
    display: inline-block;
    width:20%;
    height:30px;
    margin:0 10px;
    border:1px solid rgb(64,158,255);
    border-radius: 10px;
    background-color: rgb(236,245,255);
    text-align: center;
    line-height: 30px;
    color: rgb(131, 131, 131);
}
.cost_list .company{
    width:60px;
}
.money{
    display: inline-block;
     width:217px;
    height:38px;
    border:none;
    border:1px solid #ccc;
    border-radius: 5px;
}
.cost ul{
    margin-top:30px;
}
.cost-btn{
    margin-left: 75%;
}
.calculation li{
    padding: 18px;
    color: rgb(131, 131, 131);
}
.cha{
    font-size: 18px;
    font-weight: bold;
    color: #009f9d;
}
.process p{
    padding:17px 0;
    color: rgb(131, 131, 131);
}
.guocheng{
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
}
.tool{
    margin:20px;
}
.tool .fang{
    color: rgb(245,69,69);
}
.tool .fang1{
     color: rgb(248,181,81);
}
.tool .fang2{
     color: rgb(34,172,56);
}
.tool .fang3{
     color: rgb(113,127,249);
}
.tool li{
    width:40%;
    height:38px;
    margin:10px;
    background-color: rgb(254,236,236);
    text-align: center;
    color: rgb(131, 131, 131);
    line-height: 38px;
}
.tool li:nth-child(2){
    background-color: rgb(255,248,237);
}
.tool li:nth-child(3){
    background-color: rgb(232,247,234);
}
.tool li:nth-child(4){
    background-color: rgb(240,242,255);
}
</style>