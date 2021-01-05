<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="mess">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                    <el-button type="primary" @click="addRoutes1">导出</el-button>
                     <!--<el-button type="primary" @click="newProject">新增项目</el-button>
                    <el-button type="primary" @click="addRoutes1">招采文件模板</el-button> -->
                     <router-link :to="{name: 'project'}" tag="li" exact>
                         <el-menu-item index="1">完成项目</el-menu-item>
                     </router-link>
                    <router-link :to="{name: 'newProject'}" tag="li" >
                        <el-menu-item index="2">新增项目</el-menu-item>
                    </router-link>
                    <router-link :to="{name: 'template'}" tag="li">
                        <el-menu-item index="3">招采文件模板</el-menu-item>
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

 import JSZip from 'pizzip';
 import Docxtemplater from 'docxtemplater';
 import JSZipUtils from 'jszip-utils';
 import { saveAs } from 'file-saver';

  


export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        visible :false,
        value:"选择类型",//记录选中哪个
        vaList:[//筛选类型
            {va:"1",state:false},
            {va:"2",state:false},
            {va:"3",state:false},
            {va:"4",state:false},
        ],
        screen:false,//筛选弹窗 
        screen2:false,//日期筛选
        value1: '',//日期
        value2: '',//日期,
        time1:"",
        time2:"",//记录日期变化
      };
    },
    watch:{
        value1:{
            handler(newValve,oldvalue){
                let date=newValve;
                let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
                // + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();   时分秒
                 this.time1=date_value;
            }
        },
        value2:{
            handler(newValve,oldvalue){
                let date=newValve;
                let date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
                // + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();   时分秒
                 this.time2=date_value;
                 console.log(this.time2)
            }
        }
    },
    mounted(){
        this.fn()
    },
     methods: {





    

// 点击导出word
addRoutes1:function(){
    alert("a");
        let _this = this;
        // 读取并获得模板文件的二进制内容
        JSZipUtils.getBinaryContent("/input.docx", function(error, content) {
            // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
            // 抛出异常
            if (error) {
                throw error;
            }

            // 创建一个JSZip实例，内容为模板的内容
            let zip = new JSZip(content);
            // 创建并加载docxtemplater实例对象
            let doc = new Docxtemplater().loadZip(zip);
            // 设置模板变量的值
            doc.setData({
                one:"lala",
                two:"sss",
            });

            try {
                // 用模板变量的值替换所有模板变量
                doc.render();
            } catch (error) {
                // 抛出异常
                let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties
                };
                console.log(JSON.stringify({ error: e }));
                throw error;
            }


            // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
            let out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            // 将目标文件对象保存为目标类型的文件，并命名
            saveAs(out, "MYWORDS.docx");
        });
    

},



         

    // newProject(){
    //     this.$router.push("/government/newProject");
    // },

      fn(){//获取筛选类型
            let arr =this.vaList;
        },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      eject1(i){
           let arr=this.vaList;
           this.value=arr[i].va
      },
      clickScreen(){//点击出现弹窗
        let i=this.screen;
        if(i==false){
            this.screen=true;
        }else{
            this.screen=false;
        }
      },
      clickScreen2(){//点击出现弹窗
        let i=this.screen2;
        if(i==false){
            this.screen2=true;
        }else{
            this.screen2=false;
        }
      },
      cancel(){//筛选取消
        this.screen=false
      },
      cancel2(){//日期筛选取消
        this.screen2=false
      }

    },
}
</script>
<style scoped>
.mess li{
    display: inline-block;
}
i{
    cursor:pointer;
    font-size: 25px;
    color: rgb(141, 141, 141);
}
/* i:hover{
    color: rgb(58, 58, 58);
} */
.m_i{
    float: left;
    font-size: 30px;
    line-height: 30px;
}
.m_title{
    width:80%;
}


.m_left{
    position: relative;
    margin-top: 13px;
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
.m_left .m_span{
    position: relative;
}
.car{
    margin:0 20px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
.eject{
    position:absolute;
    z-index: 5;
    top:45px;
    left: -200px;
    width:200px;
    padding: 20px;
    cursor: pointer;
    box-shadow: 0 5px 7px 2px #ccc;
    background-color: #fff;
}
.eject p{
    display: inline-block;
    font-size: 16px;
}
.eject .div{
    margin:20px 0 0 50px;
}
.date{
    font-weight: 300;
    margin:10px
}
</style>