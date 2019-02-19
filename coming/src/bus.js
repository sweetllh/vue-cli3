import Vue from 'vue';
const EventBus = new Vue({
  data: {
    msg         : 'Hello world',
    clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
    //类别
    typeList: [{
        value: '0',
        label: '全部类别'
        }, {
        value: '1',
        label: '风景区'
        }, {
        value: '2',
        label: '美食'
        }, {
        value: '3',
        label: '购物'
        }, {
        value: '4',
        label: '娱乐'
    }],
    //类型
    classList: [{
        value: '0',
        label: '全部类型'
        }, {
        value: '1',
        label: '基础标签'
        }, {
        value: '2',
        label: '个性化标签'
    }],

    //打卡点详情,预览
    formData:{
        type: '风景区',
        pointName: '安徽黄山风景名胜区',
        province: '安微省',
        city: '黄山市',
        area: '黄山区',
        detailedAddress: '安徽省黄山市黄山区汤口镇',
        GPSInfo: "东经118°01'—118°17'，北纬30°01'—30°18'（启动Ruuvi tag后自动获取）",
        rate: 4.5,
        coverPhoto: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',          //封面图
        labelList: ['安徽','黄山','5A级景区','迎客松','奇松','怪石','温泉','80后必去'],
        description: "黄山位于安徽南部黄山市境内，山境南北长约40千米，东西宽约30千米，总面积约1200平方千米。其中，黄山风景区面积160.6平方千米，地跨东经118°01'—118°17'，北纬30°01'—30°18'，东起黄狮，西至小岭脚，北始二龙桥，南达汤口镇，分为温泉、云谷、玉屏、北海、松谷、钓桥、浮溪、洋湖、福固九个管理区。缓冲区面积490.9平方千米，以与景区相邻的五镇一场（黄山区汤口镇、谭家桥镇、三口镇、耿城镇、焦村镇和洋湖林场）的行政边界为界。",
        reason: "黄山位于安徽南部黄山市境内，山境南北长约40千米，东西宽约30千米，总面积约1200平方千米。其中，黄山风景区面积160.6平方千米，地跨东经118°01'—118°17'，北纬30°01'—30°18'，东起黄狮，西至小岭脚，北始二龙桥，南达汤口镇，分为温泉、云谷、玉屏、北海、松谷、钓桥、浮溪、洋湖、福固九个管理区。缓冲区面积490.9平方千米，以与景区相邻的五镇一场（黄山区汤口镇、谭家桥镇、三口镇、耿城镇、焦村镇和洋湖林场）的行政边界为界。",
        introduce: "黄山位于安徽南部黄山市境内，山境南北长约40千米，东西宽约30千米，总面积约1200平方千米。其中，黄山风景区面积160.6平方千米，地跨东经118°01'—118°17'，北纬30°01'—30°18'，东起黄狮，西至小岭脚，北始二龙桥，南达汤口镇，分为温泉、云谷、玉屏、北海、松谷、钓桥、浮溪、洋湖、福固九个管理区。",
        tipPicture: ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100','https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'],        //打卡点图片
        photoAlbum: ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100','https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'],       //打卡地相册
        scenicPictures: [],   //景点图片
    }

  },
  computed: {
  	
  },
  watch: {
    // 这里为了实现对象引用监听，然后触发change事件，实现状态同步
    msg(val) {
      this.$emit('msg-change', { value: val });
    },
    
    // formData: {
    // 	handler(val, oldVal){
	  //       //但是这两个值打印出来却都是一样的
	  //   },
	  //   deep: true
    // }
   
  },
  created() {
  	
  },
  
  methods: {
  
  },
  
});

EventBus.$on('msg-change', (payload) => {
  //console.log(`Msg has changed to ${payload.value}`);
  EventBus.msg = payload.value;
});

export default EventBus;
