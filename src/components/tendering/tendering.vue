<template>
    <div>
        <div class="ten_list">
            <div>
                <i class="el-icon-star-on xing"></i><span>费用工具<span class="hui">TOOL</span></span>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen" @click="cost">
                        <h6>z</h6><span>招标代理</span>
                        <p>代理服务收费服务入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
            </el-row>
            
        </div>
         <div class="ten_list">
            <div>
                <i class="el-icon-star-on xing"></i><span>法律法规<span class="hui">LAW</span></span>
            </div>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple tn_cen" @click="law">
                        <h6>z</h6><span>政府采购法律法规</span>
                        <p>政府采购法律法规编辑整理查询入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light tn_cen">
                        <h6>Q</h6><span>政府采购投诉案例</span>
                        <p>政府采购投诉案例查询入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>z</h6><span>取消下放资质</span>
                        <p>取消下放资质查询入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
            </el-row>
           
        </div>
        <div class="ten_list">
            <div>
                <i class="el-icon-star-on xing"></i><span>资质证书<span class="hui">CERTIFICATE</span></span>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>z</h6><span>工程资质</span>
                        <p>工程资质查询入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>R</h6><span>人员证书</span>
                        <p>人员证书查询入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
            </el-row>
            
        </div>
        <div class="ten_list">
            <div>
                <i class="el-icon-star-on xing"></i><span>文本制作<span class="hui">FILE</span></span>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen" @click="government">
                        <h6>z</h6><span>政府采购招采文件</span>
                        <p>政府采购招采文件制作工具</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>Z</h6><span>自主招标招采文件</span>
                        <p>自主招标招采文件制作工具</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>D</h6><span>代理合同</span>
                        <p>代理合同制作工具</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>P</h6><span>评价报告</span>
                        <p>评价报告制作工具</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
            </el-row>
            
        </div>
        <div class="ten_list">
            <div>
                <i class="el-icon-star-on xing"></i><span>专家抽取<span class="hui">EXPERT EXTRACTION</span></span>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>z</h6><span>专家抽取</span>
                        <p>招采项目专家抽取</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
            </el-row>
        </div>




    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        cost(){//代理服务收费入口
            this.$router.push({
                path: `/cost`,
            })
        },
        law(){//政府采购法律法规
            this.$router.push({
                path: `/law`,
            })
        },
        government(){//文本制作   政府采购招采文件
            this.$router.push({
                path: `/government`,
            })
        }
    }
    
}
</script>
<style scoped>
.ten_list{
    margin-top:20px;
}
.hui{
    display: inline-block;
    color: #ccc;
    margin-left: 20px;
}
.ten_list i{
    font-size: 25px;
}
.xing{
    color: rgb(245,179,0);
    margin-right: 20px;
}
.ten_list .tn_cen{
    padding: 30px;
    background-color: #fff;
    margin: 15px;
    cursor:pointer;
}
.tn_cen h6{
    display: inline-block;
    width: 35px;
    height:35px;
    margin-right: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    background-color: rgb(254,236,236);
    color: red;
}
.tn_cen p{
    margin:10px;
    color: #ccc;
}
.i_right{
    margin-left: 90%;
    color: #ccc;
}
.i_right:hover{
    color: rgb(97, 97, 97);
}
</style>