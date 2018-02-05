import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class QrcodeScan extends Component {
    static navigationOptions=({navigation})=>({
 
        title:'扫码支付',
        
      
    });

    scanResult(responseJson){
        const {navigate,goBack,state} = this.props.navigation;
        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.onScanSuccessed(responseJson);
        goBack();
    }
　//解析数据
  parseData(pdata){
      var ptype = pdata.type;
      var data = pdata.data;

      fetch(data)
          .then((response) => response.json())
          .then((responseJson) => {
              this.scanResult(responseJson);
              console.log(responseJson);
          })
          .catch((error) => {
              console.error(error);
          });
  }

  render() {
    let scanArea = null
    scanArea = (
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
    )

    return (
      <Text
        onBarCodeRead={  this.parseData.bind(this)  }
        style={styles.camera}
      >
        {scanArea}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
    camera: {
    flex: 1
  },
    rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
    rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  }
});