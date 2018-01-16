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
  Image
} from 'react-native';


import MVC from '../MVC';
import Button from '../components/Button';
import CreateWallet from '../pages/main/CreateWallet';
import QrCode from '../pages/main/QrCode';
import WalletInfo from '../pages/main/WalletInfo';



let addresKey='addresKey';
var Web3 = require('web3');
export default class MainContrainer extends Component{

    constructor(props){
        super(props);
        this.jumpToCreateWallet=this.jumpToCreateWallet.bind(this);
        this.state={
            currentWallet:null,
            address:'',
            privateKey:'',
            balance:'点击查看余额'
        }
        this.showQrcode=this.showQrcode.bind(this);
        this.getBalance=this.getBalance.bind(this);
        this.createWallet=this.createWallet.bind(this);
        this.scanQrcode=this.scanQrcode.bind(this);
        this.initWeb3();
      
        console.log('constructor');
       
    }
 
    initWeb3(){
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.9.79:6795"));
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

           AsyncStorage.getItem(address,(error,walletJson)=>{
            if(error){
                Alert.alert('读取钱包信息失败');
                return;
            }
            var walletObj=JSON.parse(walletJson);
            this.setState({
                currentWallet:walletObj, 
                address:address
             });
           });
       });
     
     
      
       
    }

    static navigationOptions=({navigation})=>({
        title:'首页',
        tabBarIcon: ({ tintColor }) => (
             <Image source={require('../img/tabbar_homepage_selected.png')}      style={{width:26,height:26}} />
          ),
        headerRight:(<Button text='创建钱包' onPress={()=>navigation.state.params.jumpToCreateWallet()}/>) 
    });

    componentDidMount() {
        console.log('componentDidMount');
  
        this.props.navigation.setParams({ jumpToCreateWallet: this.jumpToCreateWallet });
        //设置一个监听
        // DeviceEventEmitter.addListener('createWallet', (walletName,password) => {
        //     console.log('DeviceEventEmitter.addListener');
        //    this.createWallet();
        //   });
      }

      componentWillUnmount() {
       // DeviceEventEmitter.removeAllListeners('createWallet');
      }

    jumpToCreateWallet(){
 
     this.props.navigation.navigate('CreateWallet',
        {
            callback:(walletName,password)=>{
                
                this.createWallet();
            }
        }
    );
    }



  
    /**
     *创建钱包文件
     */
    createWallet(){
        var event={type:'createWallet',password:'666666'};
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
        this.props.navigation.navigate('Qrcode',
        {
            address:this.state.address
        });
    }


    /**
     * 发起交易 
     * @param {*} to 
     * @param {*} value 
     */
    sendTransaction(to,value){
        var v = web3.fromWei(value, 'finney');
        var nonce = web3.eth.getTransactionCount(this.state.address);
        var Tx = require('ethereumjs-tx');
        var privateKey = new Buffer(this.state.privateKey, 'hex')

        var rawTx = {
             nonce: nonce,
             gasPrice: '0x09184e72a000', 
             gasLimit: '0x2710',
             to: to, 
             value: v, 
             data: ''//data不传 java版也是这样
        }

        var tx = new Tx(rawTx);
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

        //console.log(serializedTx.toString('hex'));
        //f889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (!err)
            console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        });
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
                let value=result.split('?')[1]+'000000';
                console.log('to='+to+'    value='+value);
                this.sendTransaction(to,value);
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


    saveWallet(walletObj){
        let address=walletObj.address;
        console.log('saveWallet: address='+address);
        console.log('saveWallet: walletObj='+JSON.stringify(walletObj));
        AsyncStorage.setItem(address,JSON.stringify(walletObj));
        AsyncStorage.setItem(addresKey,address);
        AsyncStorage.setItem("hehe","xime");
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
                
                //保存到本地
                this.saveWallet(walletObj);
                break;
                case 'generateKey':
                console.log(KeyObj.value);
                this.setState({privateKey:KeyObj.value});
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
        web3.eth.getBalance(this.state.address, (error, result)=>{
            if (!error){             
              console.log(result.toNumber(result)); // '1000000000000'
              console.log("ok!!!!!!");
              
              this.setState({balance:'当前余额：'+result.toNumber(result)});
            }else{
              console.log(error);
            }
             
          });
    }

    render(){
  
        return(
      
            <View style={MVC.container}>
              
            <WalletInfo
                address={this.state.address}
                balance={this.state.balance}
                getBalnce={this.getBalance}
                showQrcode={this.showQrcode}
                scanQrcode={this.scanQrcode}
                
              />
           
           <StatusBar backgroundColor={'#3e9ce9'}/>
            <WebView ref='webView'
            source={require('../html/main.html')}
            style={MVC.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(e) => {
                this.handleWebViewMessage(e)
            }}
            />    
            </View>
            
           );
         
    }
}