<template>
    <div id="sidebar-left">
    	<!--background-color= "#eef1f6"-->
      <el-menu
        :collapse = "isCollapse"
        :default-active = "$route.path"
          @open = "handleopen"
          @close = "handleclose"
          @select = "handleselect"
          class = "el-menu-vertical-demo"
        unique-opened router>
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :key="item.index"  :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-if="!child.hidden" v-for="child in item.children" 
                	:index="child.path" :key="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :key="index" :index="item.children[0].path">
              <template>
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </template>
            </el-menu-item>
        </template>
        
      </el-menu>

    </div>
</template>

<script>
    export default {
        name : 'Sidebar',
        props: {
        	isCollapse: {
        		type   : Boolean,
        		default: false
        	}
        },
        data () {
            return {
              	
                    
        
            }
        },
	    computed:{
	      	
	    },
	    methods:{
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
				
			},
	    },
    }
</script>
<style scoped>
	
</style>
