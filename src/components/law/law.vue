
<template>
    
     <div class="cont">
         <el-col :span="24">
                <div class="mess">
                    <div class="clearfloat law_top">
                        <h6 class="f_l">政府采购法律法规</h6>
                        <div class="m_left f_r">
                            <i class="el-icon-search ip_a"></i>
                            <input type="text" placeholder="查询关键字" v-model="value2"/>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                   
                </div>
            </el-col>
            
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="nav_left">
                            <h6>国家(部)级</h6>
                            <ul>
                                <li v-for="(item,i) in list" :key="i" v-bind:class="{navlist:item.liClass==true}" @click="navlist(i)">{{i+1}}.{{item.value}}<i :class="item.icon"></i></li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="17" style="margin-left:20px">
                    <div class="grid-content bg-purple lawCon">
                        <ul>
                            <li>
                                <span class="lawText">法律法规名称</span>
                                政府购买服务管理办法（中华人民共和国财政部令第102号）
                            </li>
                            <li>
                                <span class="lawText">文号</span>
                                财政部令第102号
                                <span class="lawText lawtime">实施时间</span><span>2020年03月01日</span>
                            
                            </li>
                            <li>
                                <span class="lawText">
                                    官网链接
                                </span>
                                <a href="">http://www.ccgp.gov.cn/zcfg/mofgz/202002/t20200203_13843360.htm</a>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="17" style="margin:20px">
                    <div class="grid-content bg-purple lawCon">
                        <h6 class="lawconH6">法律法规内容</h6>

                    </div>
                    <div class="laynei">

                    </div>
                </el-col>
            </el-row>

       
    
    
    </div>
    
</template>
<script>
export default {
    data() {
      return {
          options: [{
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
            }],
        value: '',
        value2: '',
        list:[
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"el-icon-caret-right",liClass:true},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},
            {value:"政府采购信息发布管理办法（中华人民共和国财政部令第101号）",icon:"",liClass:false},

        ]
      };
    },
    watch:{
    },
    mounted(){

    },
    methods: {
      navlist(i){//法律标题点击
        let list=this.list;
        list.forEach(element => {
            element.icon="";
            element.liClass=false;
        });
        list[i].icon="el-icon-caret-right";
        list[i].liClass=true;
        
      }





    },
}
</script>
<style scoped>
/* .cont .el-col{
    padding: 20px 30px;
    margin-top:20px;
    background-color: #fff;
} */
.law_top{
    position: relative;
    z-index: 55;
}
.law_top h6{
    margin-top: 10px;
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
.law_top {
    margin-bottom: 20px;
}
i{
    cursor:pointer;
    font-size: 25px;
    color: rgb(141, 141, 141);
}
.m_left i:hover{
    color: rgb(58, 58, 58);
}
.m_left{
    position: relative;
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
.nav_left{
    width:280px;
    padding: 10px;
    font-size: 14px;
}
.nav_left ul{
    height:600px;
    overflow: auto;
}
.nav_left h6{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
.nav_left li{
    position: relative;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height:48px;
    margin:20px 0;
    line-height: 48px;
    padding: 0 5px;
    border: 1px solid #eee;
    cursor:pointer;
}
.nav_left .navlist{
    border: 1px solid #000;
}
.nav_left i{
    position: absolute;
    right: -3px;
    top:23px;
    color: rgb(53, 53, 53);
    font-size: 12px;
}
.lawText{
    display: inline-block;
    width:120px;
    margin:10px 0;
    color: rgb(141, 141, 141);
}
.lawtime{
    margin-left: 200px;
}
.lawCon{
    font-size: 14px;
}
.lawconH6{
    padding-bottom:10px ;
    border-bottom:1px solid #ccc ;
}
.laynei{
    height:420px;
}
 
</style>