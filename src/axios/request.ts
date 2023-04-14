import axios from "axios";


const instance = axios.create({
  baseURL: '',
  timeout: 5000,
//   headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


interface config{
    url: string,
    method: string,
    params?: object,
    data?:object
}
  
const request = function (params:config) {
    return new Promise((reslove, reject) => {
        
        instance(params).then((res) => {
            reslove(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export default request