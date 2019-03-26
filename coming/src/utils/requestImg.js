import axios from 'axios';//引入axios
import { Message,MessageBox } from 'element-ui'
import { getToken,removeToken,removeUserInfo  } from '@/utils/auth'

let config = {
  //baseURL: 'http://192.168.0.139:7793',
  baseURL: 'http://193.112.201.116:7793',
  timeout: 60 * 1000,                                          // Timeout
 // withCredentials: true, // Check cross-site Access-Control
};

// 创建axios实例
const service = axios.create(config)

// request拦截器
service.interceptors.request.use(
  config => {
      //config.headers['access-token'] = getToken(),  // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Content-Type'] = 'multipart/form-data'
      return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // if (res.Code == "400") {
    // 	 MessageBox.confirm(res.Message,'确定登出',{
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       removeToken();
    //       removeUserInfo();
    //       router.push('/login');
    //     })
      
    //   return Promise.reject('error')
    // }else if(res.Code != "0"){
	  //   	Message({
	  //   		showClose: true,
	  //       message: res.Message,
	  //       type: 'error',
	  //       duration: 3 * 1000
	  //     })
    // 		return Promise.reject('error')
    // } else {
    //   	return response.data
    // }
    if(res.state == "success"){
      return response.data
    }else{
      Message({
        showClose: true,
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
    	showClose: true,
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service





