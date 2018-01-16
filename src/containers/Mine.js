import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image
} from 'react-native';
import MVC from '../MVC';

export default class Mine extends Component{
    static navigationOptions={
        title:'我的',
        tabBarIcon:({tintColor})=>(
           
            <Image
                source={require('../img/tabbar_mine_selected.png')}
                style={{width:26,height:26}}
            />
        ),
  
    };

 
    
    render(){
        return(
            <View style={MVC.container}>
                <Text style={{fontSize:25,color:'white'}}>
                    我的
                </Text>
            </View>
        );
    }
}