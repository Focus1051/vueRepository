<template>
    <div>
        <el-row> 
            <el-col :span="24">
                <div class="mess">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                     <router-link :to="{name: 'purchaser'}" tag="li" exact>
                         <el-menu-item index="1">采购人信息</el-menu-item>
                     </router-link>
                    <router-link :to="{name: 'finance'}" tag="li" >
                        <el-menu-item index="2">财政信息</el-menu-item>
                    </router-link>
                    <router-link :to="{name: 'expert'}" tag="li">
                        <el-menu-item index="3">专家管理</el-menu-item>
                    </router-link>
                    <router-link :to="{name: 'field'}" tag="li">
                        <el-menu-item index="4">场地管理</el-menu-item>
                    </router-link>
                </el-menu>
                </div>
            </el-col>
                
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>
                    <router-view></router-view>
                    
                </div>
                
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    watch:{   
    },
    mounted(){
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },




    },
}
</script>
<style scoped>
.mess li{
    display: inline-block;
}

</style>