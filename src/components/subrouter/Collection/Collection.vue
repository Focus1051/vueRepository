<template>
     <div class="cont">
        <ul class="nuws bor">
            <li class="m_text">消息标题</li>
            <li>发布人</li>
            <li>接收部门</li>
            <li>消息未应答</li>
            <li>发布时间</li>
            <li>操作</li>
        </ul>
        <div class="icon">
            <i class="iconfont icon-zanwushuju"></i>
            暂无数据
        </div>
        <ul class="nuws m_list">
            <li class="m_text">消息标题</li>
            <li>发布人</li>
            <li>接收部门</li>
            <li>消息未应答</li>
            <li>发布时间</li>
            <li>操作</li>
        </ul>   
    </div>
    
</template>
<script>
export default {
    
}
</script>
<style scoped>

.cont{
    padding: 20px 30px;
    width:95%;
    background-color: #fff;
    margin-top:20px;
}
.nuws{
    display: flex;
    justify-content: left;
    
}
.nuws li{
    font-weight: 600;
    width:15%;
    color: #009f9d;
    font-size: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
}
.nuws .m_text{
    width:25%;
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