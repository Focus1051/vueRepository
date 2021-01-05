<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark top">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">消息通知</h6>
                    </div>
                </div>
                <div class="grid-content bg-purple-dark top">
                    <ul class="n_title">
                        <li>标题</li>
                        <li>内容</li>
                        <li>时间</li>
                        <li>状态</li>
                    </ul>
                    <div class="n_icon">
                        <i class="iconfont icon-zanwushuju"></i>
                        暂无数据
                    </div>

                    <ul class="n_title n_content">
                        <li>标题标题标题标题</li>
                        <li>标题标题标题</li>
                        <li>时间标题标题</li>
                        <li>状态标题标题</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.top{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
}
.c_top{
    margin:0;
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
.n_title{
    display:flex;
    justify-content: left;
}
.n_title li{
    width:25%;
    font-weight: bold;
    color: #009f9d;
}
.n_content{
    margin:10px 0;
}
.n_content li{
    color:rgb(161, 161, 161);
    font-weight: 300;
}
.n_icon{
    margin:30px 0;
    color: #ccc;
    font-size: 14px;
    text-align: center;
}
.n_icon i{
    font-size: 130px;
}
</style>