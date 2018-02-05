import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
  WebView,
  DeviceEventEmitter,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ScrollView,
  Platform
} from 'react-native';


import MVC from '../MVC';
import Button from '../components/Button';
import CreateWallet from '../pages/main/CreateWallet';
import QrCode from '../pages/main/QrCode';
import WalletInfo from '../pages/main/WalletInfo';
import { 
    DrawerNavigator ,
    DrawerItems ,
    } from 'react-navigation';
import DataHandler from '../util/DataHandler';

//let provider="http://192.168.9.79:6795";
let provider="https://junode2.juzhen.io:443";
let addresKey='addresKey';
var Web3 = require('web3');



let to='';
let value='';
 export default class MainContrainer extends Component{
    constructor(props){
        super(props);
        this.jumpToCreateWallet=this.jumpToCreateWallet.bind(this);
        this.state={
            walletJson:'',
            address:'',
            privateKey:'',
            balance:'点击查看余额',
            value:'',
            to:'',
        }
        this.showQrcode=this.showQrcode.bind(this);
        this.getBalance=this.getBalance.bind(this);
        this.createWallet=this.createWallet.bind(this);
        this.scanQrcode=this.scanQrcode.bind(this);
        this.jumpToTransaction=this.jumpToTransaction.bind(this);
        this.initWeb3();
      
        console.log('constructor');
       
    }
 
    initWeb3(){
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider(provider));
        }
    }

    componentWillMount(){
        console.log('componentWillMount');
        this.initLoadWllet();
    }

    initLoadWllet(){

        //同步读取得到的结果都是object，不知道为什么，先用异步读取
       let address= AsyncStorage.getItem(addresKey,(error,address)=>{
           if(error){
               Alert.alert('读取钱包地址失败');
               return;
           }

           AsyncStorage.getItem(address,(error,KeyObjJSON)=>{
            if(error){
                Alert.alert('读取钱包信息失败');
                return;
            }
            var KeyObj=JSON.parse(KeyObjJSON);
            
            this.setState({
                walletJson:KeyObj.walletJson, 
                address:address
             });
           });
       });
     
     
      
       
    }

    static navigationOptions=({navigation})=>({
        title:'资产',
        tabBarIcon: ({ tintColor }) => (
             <Image source={require('../img/tabbar_homepage_selected.png')}      style={{width:26,height:26}} />
          ),
       headerRight:(<Button text='创建钱包' onPress={()=>navigation.state.params.jumpToCreateWallet()}/>) ,
       

    });

    componentDidMount() {
        console.log('componentDidMount');
 

        this.props.navigation.setParams({ jumpToCreateWallet: this.jumpToCreateWallet });
        //设置一个监听
        DeviceEventEmitter.addListener('onWalletSelected', (walletObj) => {
            console.log('DeviceEventEmitter.addListener');
           this.setState({
               address:walletObj.address,
               balance:'点击查看余额',
               walletJson:walletObj.walletJson
           });
           
           DataHandler.saveCurrentWallet(JSON.parse(walletObj.walletJson));
          });
      }

      componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('onWalletSelected');
      }

  

    /**
     * 加载钱包文件
     * @param {*} walletJson 
     */
    loadWallet(walletJson,password){
        console.log('loadWallet@@@@@@@@@@@ walletJson='+walletJson);
        var event={type:'loadWallet',password:password,walletJson:walletJson};
        let eventStr=JSON.stringify(event);
        this.refs.webView.postMessage(eventStr);
    }
    

    /**
     *创建钱包文件
     */
    createWallet(walletName,password){
        var event={type:'createWallet',walletName:walletName,password:password};
        let eventStr=JSON.stringify(event);
        this.refs.webView.postMessage(eventStr);
    }

    /**
     * 扫码成功
     */
    onScanSuccessed(result){
        Alert.alert(result);
    }

    showQrcode(){
        console.log("address="+this.state.address);
        this.props.navigation.navigate('Qrcode',
        {
            address:this.state.address
        });
    }



    jumpToCreateWallet(){
       
        //  this.props.navigation.navigate('DrawerOpen')
       this.props.navigation.navigate('CreateWallet',
          {
              callback:(walletName,password)=>{
                  
                  this.createWallet(walletName,password);
              }
          }
      );
    }

    jumpToTransaction(){
   
        console.log("jumpToTransaction="+this.state.address);
        this.props.navigation.navigate('Transaction',
        {
            to:this.state.to,
            value:this.state.value,
            transactionCallback:(to,value,password)=>{
                this.loadWallet(this.state.walletJson,password);
            }
        });

    }

    /**
     * 发起交易 
     * @param {*} to 
     * @param {*} value 
     */
    sendTransaction(privateKey){

        console.log('sendTransaction privateKey='+privateKey);
       //this.props.navigation.navigate('QrcodeScan');
       var {NativeModules}=require('react-native');
       let ReactNativeMessageHandler=NativeModules.ReactNativeMessageHandler;
       var TxInfo={
           from:this.state.address,
           to:this.state.to,
           value:this.state.value,
           privateKey:privateKey
       }
       Alert.alert('正在交易，请耐心等待...');

       NativeModules.ReactNativeMessageHandler.handleMessage(JSON.stringify(TxInfo)).then(
           (result)=>{
               console.log('sendTransaction:'+result);
                Alert.alert('交易成功');
           }
       ).catch(
           (error)=>{
               console.log('sendTransaction:error'+error.message);
               Alert.alert('交易失败');
           }
       );








        
        // var v = web3.fromWei(value, 'finney');
        // console.log('sendTransaction to='+to+'    value='+v);
  
        //  web3.eth.getTransactionCount(this.state.address,(error,nonce)=>{
        //      if(!error){
        //         console.log('sendTransaction nonce='+nonce);
        //         //var hexValue = web3.toHex(v);
        //         var hexNonce = web3.toHex(nonce);   
        //         console.log('sendTransaction v='+v+'    hexNonce='+hexNonce);           
        //         var event={type:'sendTransaction',from:this.state.address,to:to,value:v,privateKey:this.state.privateKey,nonce:hexNonce,provider:provider};
        //         let eventStr=JSON.stringify(event);
        //         this.refs.webView.postMessage(eventStr);

        //      }else{
        //         console.log('获取Nonce失败');
        //      }
        //  });
       
    }


    /**
     * 扫码
     */
    scanQrcode(){
        //this.props.navigation.navigate('QrcodeScan');

        var {NativeModules}=require('react-native');
        let ReactNativeMessageHandler=NativeModules.ReactNativeMessageHandler;
        NativeModules.ReactNativeMessageHandler.handleMessage('scan_qrcod').then(
            (result)=>{
                console.log('scanQrcode:'+result);
                let to=result.split('?')[0];
                let value=result.split('?')[1];
                this.setState({
                    to:to,
                    value:value
                });
                this.jumpToTransaction(to,value);
                
            }
        ).catch(
            (error)=>{
                console.log('scanQrcode:error'+error.message);
            }
        );
    }

    showCreateWalletView(){
        return(
         
        <View style={MVC.container}>
          
        <CreateWallet
            address={this.state.address}
          />
        </View>
        
       );
    }



    /**
     * 处理webview发送过来的数据
     * @param {*} data 
     */
    handleWebViewMessage(data){
       
        let variable1=data.nativeEvent.data;
        console.log('variable1='+variable1);
        if(variable1 !== null && variable1 !== undefined && variable1 !== ''){
            var KeyObj=JSON.parse(variable1);
           
            switch(KeyObj.type){
                case 'walletJson':
                console.log(KeyObj.value);
                var walletObj=JSON.parse(KeyObj.value);
                this.setState({
                    currentWallet:walletObj,
                    address:walletObj.address
                });
                console.log('KeyObj='+JSON.stringify(KeyObj));
         
                //保存到本地
                DataHandler.saveWallet(walletObj.address,KeyObj.walletName,KeyObj.value);
               
                break;

                case 'generateKey':
                let privateKey=KeyObj.value;
           
                this.sendTransaction(privateKey);
                break;

                case 'sendTransaction':
                console.log('sendTransaction hash='+KeyObj.value);
                break;
                case 'balance':
                console.log('balance balance='+KeyObj.value);
                break;
            }
        }
    
      
    }

    showQrcodeView(){
        return(
         
            <View style={MVC.container}>
            <QrCode
                address={this.state.address}
              />
            </View>
        
           );
    }

  

    getBalance(){
        
        var event={type:'getBalance',address:this.state.address,provider:provider};
        let eventStr=JSON.stringify(event);
        this.refs.webView.postMessage(eventStr);
        
        // web3.eth.getBalance(this.state.address, (error, result)=>{
        //     if (!error){   
        //       console.log("ok!!!!!!");          
        //       console.log(result.toNumber(result));
              
        //       this.setState({balance:'当前余额：'+result.toNumber(result)});
        //     }else{
        //       console.log('outer:'+error);
        //     }
             
        //   });

         
    }

    render(){
       
        return(
      
            <View style={MVC.container}>
              
            <WalletInfo
                privateKey={this.state.privateKey}
                address={this.state.address}
                balance={this.state.balance}
                getBalnce={this.getBalance}
                showQrcode={this.showQrcode}
                scanQrcode={this.scanQrcode}
                
              />
           
           <StatusBar backgroundColor={'#3e9ce9'}/>
            <WebView ref='webView'
            source={require('../html/main.html')}
         
           // source={{uri:'http://www.jianshu.com/u/d5b531888b2b'}}
            style={MVC.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          //  allowUniversalAccessFromFileURLs={true}
            onMessage={(e) => {
                this.handleWebViewMessage(e)
            }}
            />    
            </View>
            
           );
         
    }
}



