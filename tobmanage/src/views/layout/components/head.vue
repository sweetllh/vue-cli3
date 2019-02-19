<template>
  <header class="head">
    <div class="logo" :style="{'display': isCollapse ? 'none' :'block'}">LOGO</div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="getCollapse">
    	<img src="../../../assets/imgs/collepse.png"/>
      <!--<i class="el-icon-menu"></i>-->
    </div>
    <breakcrumb></breakcrumb>
    <div class="top-nav">
      <!--消息中心-->
	    <el-tooltip class="news" effect="dark" :content="message?`您有${message}条未读消息`:`消息中心`" placement="bottom">
	      <div>
	        <i class="el-icon-bell"></i>
	        <span class="msg" v-if="message"></span>
	      </div>
	    </el-tooltip>
      <!--退出or设置-->
      <!-- 用户头像 -->
      <div class="user-avator"><img src="../../../assets/imgs/avatar.png"></div>
	    <el-dropdown placement="bottom">
	      <span class="el-dropdown-link">
           {{userName || "某某"}} <i class="el-icon-caret-bottom"></i>
        </span>
	      <el-dropdown-menu slot="dropdown">
	        <el-dropdown-item>关于我</el-dropdown-item>
	        <el-dropdown-item>设置</el-dropdown-item>
	        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
	      </el-dropdown-menu>
	    </el-dropdown>


    </div>
  </header>
</template>
<script>
	 import {removeToken,getUserInfo,removeUserInfo } from '@/utils/auth'
	 import breakcrumb from "./breakcrumb"
    export default {
        name      : 'Head',
        components: {
        	breakcrumb
        },
        props: {
        	isCollapse: {
        		type   : Boolean,
        		default: false
        	}
        },
        data () {
            return {
              message   : 1,       //消息
              fullscreen: false,
            }
        },
        mounted(){

        },
        computed: {
        userName(){
            const userInfo = getUserInfo();
                    if(userInfo){
                        return  userInfo.Mobil;
                    }
        }
        },
        methods:{
        getCollapse(){
            this.$emit('collapseChange')
        },
        
        //退出登录
        logout () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                removeToken();
                removeUserInfo();
                _this.$router.push('/login');
                
            }).catch(() => {

            });
        },
        
        
        
        }
    }
</script>
<style scoped lang="scss">
@import '@/assets/css/vars.scss';
	.user-avator{
		margin-right: 10px;
	}
	.user-avator img{
		width         : 40px;
		height        : 40px;
		border-radius : 50%;
		vertical-align: middle;
	}
	.el-dropdown-link{
		font-size  : 14px;
		font-weight: normal;
	}
	.logo{
		width     : 225px;
		text-align: center;
		font-size : 20px;
		background: $color-primary;
		color     : #fff;
	}
	
</style>
