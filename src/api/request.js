/****   request.js   ****/
// 导入axios
import axios from "axios";
// 做消息提醒
// import { getCurrentInstance } from 'vue'
// const { proxy } = getCurrentInstance()

// 创建新的axios实例
const requests = axios.create({
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5 * 1000,
  // 设置全局重试请求次数
  retry: 3,
  // 设置全局请求间隔
  retryDelay: 500,
  // 允许携带cookie
  withCredentials: true,
});

// 请求拦截器
requests.interceptors.request.use(
  (config) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8", //配置请求头
    };
    //如有需要：注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    //const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
    //if(token){
    //config.params = {'token':token} //如果要求携带在参数中
    //config.headers.token= token; //如果要求携带在请求头中
    //}
    //
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  (response) => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等

    return response.data;
  },
  (error) => {
    // 超时处理
    var config = error.config;
    if (!config || !config.retry) return Promise.reject(error);

    //如果有响应内容，就直接返回错误信息，不再发送请求
    if (error.response.data) {
      return Promise.reject({ type: "error", msg: error.response.data });
    }

    // __retryCount用来记录当前是第几次发送请求
    config.__retryCount = config.__retryCount || 0;

    // 如果当前发送的请求大于等于设置好的请求次数时，不再发送请求，返回最终的错误信息
    if (config.__retryCount >= config.retry) {
      if (error.message === "Network Error") {
        //message为"Network Error"代表断网了
        // proxy.$mui.toast('网络连接已断开，请检查网络')
        return Promise.reject({
          type: "warning",
          msg: "网络连接已断开，请检查网络",
        });
      } else if (error.message === "timeout of 5000ms exceeded") {
        //网太慢了，5秒内没有接收到数据，这里的5000ms对应上方timeout设置的值
        // proxy.$mui.toast('请求超时，请检查网络')
        return Promise.reject({ type: "warning", msg: "请求超时，请检查网络" });
      } else {
        //除以上两种以外的所有错误，包括接口报错 400 500 之类的
        // proxy.$mui.toast('出现错误，请稍后再试')
        return Promise.reject({ type: "error", msg: "出现错误，请稍后再试" });
      }
    }

    // 记录请求次数+1
    config.__retryCount += 1;

    // 设置请求间隔 在发送下一次请求之前停留一段时间，时间为上方设置好的请求间隔时间
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });

    // 再次发送请求
    return backoff.then(function () {
      return requests(config);
    });
  }
);
// 导出文件
export default requests;
