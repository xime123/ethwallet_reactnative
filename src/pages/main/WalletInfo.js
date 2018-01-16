import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,

  TextInput,
  TouchableOpacity
} from 'react-native';
import MVC from '../../MVC';
import Button from '../../components/Button';
export default class WalletInfo extends Component{
    constructor(props){
        super(props);
      
    }

    render(){


        return(
            <View style={MVC.container_center}>
        
                <Text     numberOfLines={10} style={MVC.textAddress}>
                    {this.props.address}
                </Text>
                <Text  numberOfLines={10} style={MVC.textAddress}
                    onPress={this.props.getBalnce}
                >
                     {this.props.balance}
                </Text>
                <Button text='查看收款码' style={MVC.longButton} onPress={this.props.showQrcode}/>
                <Button text='扫码转币' style={MVC.longButton} onPress={this.props.scanQrcode}/>
            </View>
        );
    }
}