<template>
    <div>
        <div class="ten_list">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen" @click="cost">
                        <h6>Z</h6><span>政府采购</span>
                        <p>政府采购项目立项入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
            </el-row>
            
        </div>
        <div class="ten_list">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>G</h6><span>工程招标</span>
                        <p>工程招标项目立项入口</p>
                        <i class="el-icon-caret-right i_right"></i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple tn_cen">
                        <h6>Z</h6><span>造价咨询</span>
                        <p>造价咨询项目立项入口</p>
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
                path: `/governmentDetails`,
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