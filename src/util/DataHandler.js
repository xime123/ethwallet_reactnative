import{AsyncStorage, Alert}from'react-native';
let addresKey='addresKey';
export default class DataHandler{
    static wallets=[];
    static listIndex=0;
    static getAllWallet(){
        return new Promise(
            function(resolve,reject){
                AsyncStorage.getAllKeys().then(
                    (Keys)=>{
                        if(Keys.length===0){
                            resolve(DataHandler.wallets);
                            console.log('注意，resolve后的语句还会被执行，因此resolve后如果有代码，结束处理必须要跟return语句');
                            return;
                        }
                  
                        AsyncStorage.multiGet(Keys).then(
                            (results)=>{
                                let resultLength=results.length;
                                for(let i=0;i<resultLength;i++){
                                    //获取数据 并利用JSON类的parse方法生成对象，插入日记列表
                                    let key=results[i][0];
                                    if(!key.startsWith('0x'))continue;
                                    DataHandler.wallets[i]=JSON.parse(results[i][1]);                           
                                    console.log('getAllWallet name='+DataHandler.wallets[i].name);
                                    console.log('getAllWallet wallet='+JSON.stringify(DataHandler.wallets[i]));
                                }
                                resolve(DataHandler.wallets);
                            }
                        );
                    }
                ).catch(
                    (error)=>{
                        Alert.alert("获取钱包列表失败:"+error.message);
                       
                        resolve(DataHandler.wallets);
                    }
                );
            }
        );
    }
    static bubleSortDiaryList(){

    }



    /**
     * 
     * @param {*} newDiaryMood 心情的code
     * @param {*} newDiaryBody 日记正文
     * @param {*} newDiaryTitle 日记标题
     */
    static saveWallet(address,name,walletJson){
        return new Promise(function(resolve,reject){
            
            let mWallet=Object();
            if(!address.startsWith('0x')){
                address='0x'+address;
            }
            mWallet.address=address;
            mWallet.name=name;
            mWallet.walletJson=walletJson;
        
       
            AsyncStorage.setItem(''+mWallet.address,JSON.stringify(mWallet)).then(
                ()=>{
                    let totalLength=DataHandler.wallets.length;
                    DataHandler.wallets[totalLength]=mWallet;
                    DataHandler.listIndex=totalLength;
                    DataHandler.saveCurrentWallet(JSON.parse(walletJson));

                    let aValue={          
                        wallets:DataHandler.wallets
                    }
                    resolve(aValue);
                }
            ).catch(
                (error)=>{
                   
                    console.log('save wallet error:'+error.message)
                }
            );
        });
    }

    static saveCurrentWallet(walletObj){
        let address=walletObj.address;
        console.log('saveCurrentWallet: address='+address);
       
        AsyncStorage.setItem(addresKey,address);
    }
}