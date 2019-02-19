<template>
    <div class="previewInfo">
        <el-form ref="form" :model="formData" label-width="120px">
            <el-form-item label="标签类别：">
                <div>{{formData.type}}</div>
            </el-form-item>
            <el-form-item label="地点名称：">
                <div>{{formData.pointName}}</div>
            </el-form-item>
            <el-form-item label="地点定位：">
                <div>
                    <span>{{formData.province}}</span>
                    <span>{{formData.city}}</span>
                    <span>{{formData.area}}</span>
                </div>
                <div>{{formData.detailedAddress}}</div>
                <div>{{formData.GPSInfo}}</div>
            </el-form-item>
            <el-form-item label="严选指数：" >
                <el-rate v-model="formData.rate" :allow-half=true disabled></el-rate>
            </el-form-item>
            <el-form-item label="添加标签：" class="labelList">
                <span v-for="(item,index) in formData.labelList" :key="index">{{item}}</span>
            </el-form-item>
            <el-form-item label="封面图片：" >
                <img  :src="formData.coverPhoto" alt="" class="picture">
            </el-form-item>
           <el-form-item label="打卡提示图片：">
               <img  v-for="(item,index) in formData.tipPicture" :key="index" :src="item" alt="" class="picture">
            </el-form-item>
            <el-form-item label="打卡地描述：">
                <div>{{formData.description}}</div>
            </el-form-item>
             <el-form-item label="入选理由：">
                 <div>{{formData.reason}}</div>
            </el-form-item>
            <el-form-item label="打卡地相册：">
                <img  v-for="(item,index) in formData.photoAlbum" :key="index" :src="item" alt="" class="picture">
            </el-form-item>
            <el-form-item label="景点介绍：">
                <div class="content ql-editor" style="padding: 5px 0;" v-html="formData.introduce"></div>
            </el-form-item>
            <el-form-item class="buttonList">
                <el-button type="primary" @click="backToEdit">返回修改</el-button>
                <el-button type="primary" @click="saveBtn" :loading="loading">{{id ? "确认修改打卡点" : "确认添加打卡点"}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "preview",
    props: {
            loading: {
                type: Boolean,
                default: false
            },
            formData: {
                type: Object,
                default: {}
            },
            id: null
         },
    data(){
        return {

        }
    },
    created() {
        
    },
    methods: {
        //确定按钮
        saveBtn(){
            this.$emit('saveBtn')
        },

        //返回修改
        backToEdit(){
            this.$emit('activeNameChange',"second")
        }
    },
}
</script>

<style scoped lang="scss">
.addPoint{
    .labelList {
        span{
            display: inline-block;
            margin: 0 10px 10px 0;
            padding: 0px 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
            color: #333;
            background: #fff;
        }
        
    }
    span + span,img + img {
        margin-left: 10px;
    }
    .buttonList{
        text-align: center;
    }
    code {
      width: 100%;
      margin: 0;
    //   padding: 1rem;
    //   border: 1px solid #ccc;
    //   border-top: none;
    //   border-radius: 0;
    //   height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }

}
.picture{
    width: 375px;
    margin: 0 8px 8xp 0;
}
</style>

