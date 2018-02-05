import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  DeviceEventEmitter,
  TextInput
} from 'react-native';
import MVC from '../../MVC';
import Button from '../../components/Button';
import TextUtil from '../../util/TextUtil';
export default class ImportWallet extends Component{
     
    static navigationOptions=({navigation})=>({
 
        title:'导入钱包',
       
    });
    constructor(props){
        super(props);
        this.state={
            privatekey:'',
            password:''
        }
    }

    startImport(){
        if(TextUtil.isEmpty(this.state.privatekey)){
            Alert.alert('私钥不能为空');
            return;
        }
        if(TextUtil.isEmpty(this.state.password)){
            Alert.alert('密码不能为空');
            return;
        }
        const {navigate,goBack,state} = this.props.navigation;
        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.callback(this.state.privatekey,this.state.password);
        goBack();
       //  DeviceEventEmitter.emit('createWallet', this.state.walletName,this.state.password);
      
    }

    render(){
     
        return(
            <View style={MVC.container}>
                <TextInput
                    style={MVC.TextInputStyle }
                    onChangeText={(text)=>this.setState({privatekey:text})}
                    placeholder='钱包私钥'
                />
                 <TextInput
                    style={MVC.TextInputStyle}
                    onChangeText={(text)=>this.setState({password:text})}
                    placeholder='钱包密码'
                />
                <Button text='开始导入' style={MVC.longButton} onPress={()=>this.startImport()}/>
            </View>
        );
    }
}