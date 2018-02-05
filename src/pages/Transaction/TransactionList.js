import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  DeviceEventEmitter,
  TextInput,
  InteractionManager,
  ListView,TouchableOpacity
} from 'react-native';
import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../util/ToastUtil';
import MVC from '../../MVC';
import Button from '../../components/Button';
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemListView from './ItemListView';
let addresKey='addresKey';
let address='0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae';
const pages = 1;
let loadMoreTime = 0;
export default class TransactionList extends Component{
     

    constructor(props){
        super(props);
        this.state={
            dataSource:new ListView.DataSource({
                rowHasChanged:(oldRow,newRow)=>oldRow!==newRow
            }),         
        }
    }


  


    componentDidMount(){
        const { transactionActions } = this.props;
        DeviceEventEmitter.addListener('onWalletSelected', (wallet) => {
            transactionActions.requestArticleList(false, true, wallet.address);
            pages=pages+1;
        });
        InteractionManager.runAfterInteractions(() => {
            transactionActions.requestTransactionList(false, true, address);
            pages=pages+1;
          
        });
    }

    componentWillReceiveProps(nextProps){
        const { transaction } = this.props;
        if (
          transaction.isLoadMore &&
          !nextProps.transaction.isLoadMore &&
          !nextProps.transaction.isRefreshing
        ) {
          if (nextProps.transaction.noMore) {
            ToastUtil.showShort('没有更多数据了');
            pages=pages-1;
          }
        }
    }

    
 
    onRefresh = (address) => {
        const { transactionActions } = this.props;
        transactionActions.requestTransactionList(true, false, address);
        pages=1;
    };

    onEndReached = (address) => {
        
        const time = Date.parse(new Date()) / 1000;
      
        if (time - loadMoreTime > 1) {
            pages += 1;
          const { transactionActions } = this.props;
          transactionActions.requestTransactionList(false, false, address, true, pages);
          loadMoreTime = Date.parse(new Date()) / 1000;
        }
      };
    
     
      renderFooter = () => {
        const { transaction } = this.props;
        return transaction.isLoadMore ? <Footer /> : <View />;
      };
    
      renderItem = tx => (
        <ItemCell transaction={tx}  />
      );

      renderContent = (dataSource, address) => {
        const { transaction } = this.props;
        if (transaction.loading) {
          return <LoadingView />;
        }
        const isEmpty =
        transaction.txList === undefined ||
        transaction.txList.length === 0;
        if (isEmpty) {
          return (
            <EmptyView transaction={transaction} address={address} onRefresh={this.onRefresh} />
          );
        }
        return (
          <ItemListView
            dataSource={dataSource}
            address={address}
            isRefreshing={transaction.isRefreshing}
            onEndReached={this.onEndReached}
            onRefresh={this.onRefresh}
            renderFooter={this.renderFooter}
            renderItem={this.renderItem}
          />
        );
      };
    /**
     * 选择了一个钱包
     * @param {*} rowID 
     */
   selectListItem(log){
    
    // DeviceEventEmitter.emit('onWalletSelected',log);
    goBack();
   }

  
   render() {
    const { transaction } = this.props;
    
    return (
        
        <View style={styles.container}>
     
            {this.renderContent(
              this.state.dataSource.cloneWithRows(transaction.txList),
              address
            )}
        
        </View>
      );

    return (this.renderContent(
        this.state.dataSource.cloneWithRows(transaction.txList),
        address
      )
    );
   }
}

const styles = StyleSheet.create({
    base: {
      flex: 1
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff'
    },
    drawerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd'
    },
    drawerTitleContent: {
      height: 120,
      justifyContent: 'flex-end',
      padding: 20,
      backgroundColor: '#3e9ce9'
    },
    drawerIcon: {
      width: 30,
      height: 30,
      marginLeft: 5
    },
    drawerTitle: {
      fontSize: 20,
      textAlign: 'left',
      color: '#fcfcfc'
    },
    drawerText: {
      fontSize: 18,
      marginLeft: 15,
      textAlign: 'center',
      color: 'black'
    },
    timeAgo: {
      fontSize: 14,
      color: '#aaaaaa',
      marginTop: 5
    },
    refreshControlBase: {
      backgroundColor: 'transparent'
    },
    tab: {
      paddingBottom: 0
    },
    tabText: {
      fontSize: 16
    },
    tabBarUnderline: {
      backgroundColor: '#3e9ce9',
      height: 2
    }
  });
  