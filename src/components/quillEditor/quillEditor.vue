<template>
	<!--富文本编辑器-->
	<div class="edit_container">
		<quill-editor
			v-model="content"
			ref="myQuillEditor"
			:options="editorOption"
			@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
			@change="onEditorChange($event)">
		</quill-editor>
	</div>
</template>

<script type="text/ecmascript-6">
  import { addQuillTitle } from '../../script/quill-title.js';
  export default {
    name: 'App',
       data(){
         return {
           content: ``,
           // 定义富文本编辑器显示
           editorOption: {
              modules:{
                  toolbar:[
                       ['bold','italic','underline','strike'], // 加粗、倾斜、下划线、删除线
                       [{'header':1},{'header':2}], // 标题一、标题二
                       [{'list':'ordered'},{'list':'bullet'}], // 列表
					   [{'color':[]},{'background':[]}], // 字体颜色、背景颜色
                  ]
            }
 	  },
   }
},
computed: {
    editor() {
         return this.$refs.myQuillEditor.quill;
   }
},
methods: {
	  // 准备编辑器
      onEditorReady(editor) {},
      // 失去焦点事件
      onEditorBlur(){}, 
      // 获得焦点事件
      onEditorFocus(){}, 
       // 内容改变事件
      onEditorChange(){},
      saveHtml:function(event){
         alert(this.content);
      }
    },
   mounted(){  addQuillTitle(); }
}
</script>