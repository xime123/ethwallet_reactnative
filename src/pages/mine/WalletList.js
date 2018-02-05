import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  DeviceEventEmitter,
  TextInput,
  ListView,TouchableOpacity
} from 'react-native';
import MVC from '../../MVC';
import Button from '../../components/Button';

export default class ImportWallet extends Component{
     
    static navigationOptions=({navigation})=>({
 
        title:'钱包列表',
       
    });
    constructor(props){
        super(props);
        this.state={
            walletListSrc:new ListView.DataSource({
                rowHasChanged:(oldRow,newRow)=>oldRow!==newRow
            }),         
        }
        this.renderListItem=this.renderListItem.bind(this);
    }


    componentWillMount(){
        const { params } = this.props.navigation.state;
        console.log('componentWillMount');
        if(params.walletList===null)return;
      
        this.setState({
            walletListSrc:this.state.walletListSrc.cloneWithRows(params.walletList)
        });
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        const { params } = nextProps.navigation.state;
        this.setState({
            walletListSrc:this.state.walletListSrc.cloneWithRows(params.walletList)
        });
    }


    /**
     * 选择了一个钱包
     * @param {*} rowID 
     */
   selectListItem(log){
    const {navigate,goBack,state} = this.props.navigation;
    DeviceEventEmitter.emit('onWalletSelected',log);
    goBack();
   }

    /**
     * 渲染item
     */
    renderListItem(log,selectionID,rowID){
        console.log('renderListItem');
   
        return(
         
        <TouchableOpacity onPress={()=>this.selectListItem(log)}>
        <View style={MVC.secondRow}>
            <Image
                style={MVC.moodStyle}
                source={require('../../img/nav.png')}
            />
            <View style={MVC.subViewInReader}>       
                    <Text style={MVC.textInReader}>
                    {log.name}
                    </Text>
                <Text style={MVC.textInReader}>
                     {log.address}
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        );
    }


    render(){
        const { params } = this.props.navigation.state;
   
  
        return(
            <View style={MVC.container}>
            {
                (
                        (params.walletList.lenght!==0)?
                            (
                                <ListView dataSource={this.state.walletListSrc}
                                    enableEmptySections={true}
                                    renderRow={(log,selectionID,rowID)=>this.renderListItem(log,selectionID,rowID)}                   
                                    />
                            
                            ):
                            (
                                <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={{fontSize:18,color:'black'}}>您还没创建钱包哦！</Text>
                                </View>
                            )
                )
            }
            </View>
        );
    }
}