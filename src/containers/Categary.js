import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as txCreators from '../actions/transactions';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ListView
} from 'react-native';
import MVC from '../MVC';
import TransactionList from'../pages/Transaction/TransactionList';
 class Categary extends Component{
    static navigationOptions={
        title:'交易',
        tabBarIcon:({tintColor})=>(
          
            <Image
            source={require('../img/tabbar_order_selected.png')}
            style={{width:26,height:26}}
            />
        )
    };

 
    
    render(){
        return <TransactionList {...this.props} />;
    }
}


const mapStateToProps = (state) => {
    const { transaction } = state;
    return {
      transaction
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    const transactionActions = bindActionCreators(txCreators, dispatch);
    return {
        transactionActions
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Categary);