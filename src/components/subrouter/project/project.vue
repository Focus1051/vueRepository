<template>
     <div class="cont">
        <ul class="nuws1 bor">
            <li class="m_text">序号</li>
            <li>项目名称</li>
            <li>采购单位</li>
            <li>招采类型</li>
            <li>完成人</li>
            <li>操作事件</li>
            <li>操作</li>
        </ul>
        <div class="icon">
            <i class="iconfont icon-zanwushuju"></i>
            暂无数据
        </div>
        <ul class="nuws1 m_list">
            <li class="m_text">序号</li>
            <li>项目名称</li>
            <li>采购单位</li>
            <li>招采类型</li>
            <li>完成人</li>
            <li>操作事件</li>
            <li>操作</li>
        </ul>   
         <ul class="nuws1 m_list">
            <li class="m_text">序号</li>
            <li>项目名称</li>
            <li>采购单位</li>
            <li>招采类型</li>
            <li>完成人</li>
            <li>操作事件</li>
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
.nuws1 .m_text{
    width:10%;
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