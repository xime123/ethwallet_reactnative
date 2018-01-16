import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,

} from 'react-native';
import MVC from '../../MVC';
import Button from'../../components/Button'
var QRCode=require('react-native-qrcode');
export default class QrCode extends Component{
    static navigationOptions=({navigation})=>({
 
        title:'收款码',
        headerRight:<Button text='分享'  style={{fontSize: 14, textAlign: 'center',color:'#ffffff'}}  />
      
    });
    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state={
            qrcode:params.address,
            address:params.address
        }
       
       
    }

    render(){
        const { params } = this.props.navigation.state;
        return(
            <View style={MVC.container}>
            <View style={MVC.LinearLayout}>
                <Text  numberOfLines={10} style={MVC.textAddress}>
                    {params.address}

                </Text>
              
                <TextInput
                    style={MVC.TextInputStyle}
                    placeholder='收款金额'
                    onChangeText={(text) => this.setState({qrcode:this.state.address+"?"+text})}

                />
                <QRCode
                    value={this.state.qrcode}
                    size={200}
                    bgColor='purple'
                    fgColor='white'
                />
                </View>
            </View>
        );
    }
}