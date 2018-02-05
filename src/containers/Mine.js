import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image
} from 'react-native';
import MVC from '../MVC';
import MineInfo from '../pages/mine/MineInfo';
import DataHandler from '../util/DataHandler';
import TextUtil from '../util/TextUtil';
var {NativeModules}=require('react-native');
export default class Mine extends Component{

    constructor(props){
        super(props);
        this.state={
            walletList:[],
          }
        this.importWallet=this.importWallet.bind(this);
        this.walletList=this.walletList.bind(this);
        this.jumpImportWallet=this.jumpImportWallet.bind(this);
        this.initData();
    }

    static navigationOptions={
        title:'我的',
        tabBarIcon:({tintColor})=>(
           
            <Image
                source={require('../img/tabbar_mine_selected.png')}
                style={{width:26,height:26}}
            />
        ),
    };

    
    initData(){
        DataHandler.getAllWallet().then(
            (result)=>{
                let length=result.length;
                console.log("length:"+length);
                this.setState({          
                    walletList:result
                });
             
            }
          ).catch(
            (error)=>{
              Alert.alert(error);
            }
          );
    }

    jumpImportWallet(){
        this.props.navigation.navigate('ImportWallet',
         {
                callback:(privateKey,password)=>{
                
                 this.importWallet(privateKey,password);
             }
        }
     );
    }

    /**
     * 创建钱包的回调
     * @param {*} privateKey 
     * @param {*} password 
     */
    importWallet(privateKey,password){
   
        let ReactNativeMessageHandler=NativeModules.ReactNativeMessageHandler;
        var ImportWalletInfo={
            privateKey:privateKey,
            password:password,
        }
 
 
        NativeModules.ReactNativeMessageHandler.onImportWallet(JSON.stringify(ImportWalletInfo)).then(
            (result)=>{
                console.log('importWallet:'+result);
                var KeyObj=JSON.parse(result);
                DataHandler.saveWallet(KeyObj.address,'JZ新钱包',result);
                 Alert.alert('导入成功');
            }
        ).catch(
            (error)=>{
                console.log('importWallet  error'+error.message);
                Alert.alert('导入失败');
            }
        );
    }

    walletList(){
        this.props.navigation.navigate('WalletList',{
            walletList:this.state.walletList
        });
    }

    
    render(){
          
        return(
      
        <View style={MVC.container}>
              
            <MineInfo
               
                jumpImportWallet={this.jumpImportWallet}
                walletList={this.walletList}
                
              />
            </View>
            
           );
    }
}