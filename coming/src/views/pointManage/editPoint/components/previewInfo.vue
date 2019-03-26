<template>
    <div class="previewInfo">
        <el-form ref="form" :model="formData" label-width="120px">
            <el-form-item label="标签类别：">
                <div>{{formData.Category | formatCategory}}</div>
            </el-form-item>
            <el-form-item label="地点名称：">
                <div>{{formData.ClockName}}</div>
            </el-form-item>
            <el-form-item label="地点定位：">
                <div class="address">
                    <el-select v-model="formData.Province" disabled  placeholder="省">
                        <el-option
                        v-for="item in $bus.provinceArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                    <el-select v-model="formData.City" disabled  placeholder="市">
                        <el-option
                        v-for="item in cityArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                    <el-select v-model="formData.District" disabled  placeholder="区">
                        <el-option
                        v-for="item in districtArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                </div>
                <div>{{formData.AddressDetail}}</div>
                <div>{{formData.Gps}}</div>
            </el-form-item>
            <el-form-item label="严选指数：" >
                <el-rate v-model="formData.Rate" :allow-half=true disabled></el-rate>
            </el-form-item>
            <el-form-item label="添加标签：" class="Lables">
                <span v-for="(item,index) in formData.Lables" :key="index">{{item}}</span>
            </el-form-item>
            <el-form-item label="景点印章：" >
                <img  :src="formData.Postmark" alt="" class="postmark">
            </el-form-item>
            <el-form-item label="封面图片：" >
                <img  :src="formData.CoverPhoto" alt="" class="picture">
            </el-form-item>
           <el-form-item label="打卡提示图片：">
               <img  v-for="(item,index) in formData.ClockPromptPhoto" :key="index" :src="item" alt="" class="picture">
            </el-form-item>
            <el-form-item label="打卡地描述：">
                <div>{{formData.Describe}}</div>
            </el-form-item>
             <el-form-item label="入选理由：">
                 <div>{{formData.Reason}}</div>
            </el-form-item>
            <!-- <el-form-item label="打卡地相册：">
                <img  v-for="(item,index) in formData.PhotoList" :key="index" :src="item" alt="" class="picture">
            </el-form-item> -->
            <el-form-item label="景点介绍：">
                <div class="content ql-editor" style="padding: 5px 0;" v-html="formData.ScenicSpots"></div>
            </el-form-item>
            <el-form-item class="buttonList">
                <el-button type="primary" @click="backToEdit">返回修改</el-button>
                <el-button type="primary" @click="saveBtn">{{id ? "确认修改打卡点" : "确认添加打卡点"}}</el-button>
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
            cityArr: [],
            districtArr: []
        }
    },
    created() {
        this.$bus.$on("cityArr",data => {
            this.cityArr = data;
        });
        this.$bus.$on("districtArr",data => {
            this.districtArr = data;
        });
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
    .Lables {
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
    border: 1px dashed #d9d9d9;
    width:  280px;
    margin: 0 2px 2px 0;
    border-radius: 6px;
}
.postmark{
    border: 1px dashed #d9d9d9;
    width: 200px;
    border-radius: 6px;
}
</style>

