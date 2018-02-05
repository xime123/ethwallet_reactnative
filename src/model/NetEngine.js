/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage
} from 'react-native';

let common_url = 'https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=U3Q36ZS9HXA8H1Y6FPS42TZ1A17SPAG11E';  //服务器地址
let token = '';   
export default class NetEngine extends Component{
      /**
        * @param {string} url 接口地址
        * @param {string} method 请求方法：GET、POST，只能大写
        * @param {JSON} [params=''] body的请求参数，默认为空
        * @return 返回Promise
      */
    static fetchRequest(url, method, params = ''){
        let header = {
            "Content-Type": "application/json;charset=UTF-8",
            "accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
        };
        console.log('request url:',url,params);  //打印请求参数
        if(params == ''){   //如果网络请求中带有参数
            return new Promise(function (resolve, reject) {
                fetch(common_url + url, {
                    method: method,
                    headers: header
                }).then((response) => response.json())
                    .then((responseData) => {
                        console.log('res:',url,responseData);  //网络请求成功返回的数据
                        resolve(responseData);
                    })
                    .catch( (err) => {
                        console.log('err:',url, err);     //网络请求失败返回的数据        
                        reject(err);
                    });
            });
        }else{   //如果网络请求中没有参数
            return new Promise(function (resolve, reject) {
                fetch(common_url + url, {
                    method: method,
                    headers: header,
                    body:JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
                }).then((response) => response.json())
                    .then((responseData) => {
                        console.log('res:',url, responseData);   //网络请求成功返回的数据
                        resolve(responseData);
                    })
                    .catch( (err) => {
                        console.log('err:',url, err);   //网络请求失败返回的数据  
                        reject(err);
                    });
            });
        }
    }
}

