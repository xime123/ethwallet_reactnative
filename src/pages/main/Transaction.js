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
export default class Transaction extends Component{

    static navigationOptions=({navigation})=>({
 
        title:'转账',
       
    });
    constructor(props){
        super(props);
        this.state={
            to:'',
            value:'',
            password:'',
        }
    }

    startTransaction(){

        if(TextUtil.isEmpty(this.state.password)){
            Alert.alert('密码不能为空');
            return;
        }

        const {navigate,goBack,state} = this.props.navigation;
        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.transactionCallback(this.state.to,this.state.value,this.state.password);
        goBack();
       //  DeviceEventEmitter.emit('createWallet', this.state.walletName,this.state.password);
      
    }

    render(){
        const { params } = this.props.navigation.state;
        return(
            <View style={MVC.container}>

                <Text style={MVC.txtextAddress}>
                    收款地址：{params.to}
                </Text>
                <Text style={MVC.textAddress}>
                    转账金额：{params.value}
                </Text>
              
                 <TextInput
                    style={MVC.TextInputStyle}
                    onChangeText={(text)=>this.setState({password:text})}
                    placeholder='钱包密码'
                />
                <Button text='确认转账' style={MVC.longButton} onPress={()=>this.startTransaction()}/>
            </View>
        );
    }
}