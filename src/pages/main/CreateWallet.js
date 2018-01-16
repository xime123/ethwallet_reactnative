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
export default class CreateWallet extends Component{
     
    static navigationOptions=({navigation})=>({
 
        title:'创建钱包',
      
    });
    constructor(props){
        super(props);
        this.state={
            walletName:'',
            password:''
        }
    }

    startCreate(){
        const {navigate,goBack,state} = this.props.navigation;
        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.callback(this.state.walletName,this.state.password);
        goBack();
       //  DeviceEventEmitter.emit('createWallet', this.state.walletName,this.state.password);
      
    }

    render(){
     
        return(
            <View style={MVC.container}>
                <TextInput
                    style={MVC.TextInputStyle }
                    onChangeText={(text)=>this.setState({walletName:text})}
                    placeholder='钱包名称'
                />
                 <TextInput
                    style={MVC.TextInputStyle}
                    onChangeText={(text)=>this.setState({password:text})}
                    placeholder='钱包密码'
                />
                <Button text='创建钱包' style={MVC.longButton} onPress={()=>this.startCreate()}/>
            </View>
        );
    }
}