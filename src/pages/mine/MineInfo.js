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
        
        
                <Button text='导入钱包' style={MVC.longButton} onPress={this.props.jumpImportWallet}/>
                <Button text='我的钱包' style={MVC.longButton} onPress={this.props.walletList}/>
            </View>
        );
    }
}