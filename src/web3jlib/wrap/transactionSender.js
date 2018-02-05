(function() {

    window.TransactionSender = {
        _web3: {},
        _UUIDHash: Array(),
        _provider: "",
        //nonce 默认-1
        _nonce: -1,
        //key:合约名 value:合约事件对象
        _eventObj: {}
    };

    TransactionSender.getWeb3jObj = function(arg) {
        var web3 = TransactionSender._web3["web3"];
        window.web3 = web3;
        if (web3 == null || web3 == undefined) {
            //var provideAddr = "http://192.168.8.127:6789";
            try {
                var provideAddr = TransactionSender._provider;
                nativeCaller.ObjCLog("provider:" + TransactionSender._provider);
                var web3 = new Web3(new Web3.providers.HttpProvider(provideAddr));
                TransactionSender._web3["web3"] = web3;
            } catch (e) {
                nativeCaller.onWeb3InitErr(e);
            }

        }
        return web3;
    }

    TransactionSender.toType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }


    TransactionSender.call = function(contractName, methodName, argumentList) {

        var contractInstance = ContractManager.getContract(contractName).storeObj;
        nativeCaller.ObjCLog(" contractInstance: " + contractInstance + "contractName: " + contractName + " methodName: " + methodName + " argumentList: " + argumentList);
        var result;
        nativeCaller.ObjCLog("contractInstance address:" + contractInstance.address);
        if (argumentList.indexOf("[") >= 0) {
            var arrayFromiOS = JSON.parse(argumentList);
            result = contractInstance[methodName].call.apply(this, arrayFromiOS)
        } else {
            result = contractInstance[methodName].call();
        }

        nativeCaller.ObjCLog("result:" + result);
        return result.toString();
    }


    TransactionSender.setProvider = function(providers) {
        TransactionSender._provider = providers;
    }

    function print_array(arr) {
        for (var key in arr) {
            if (typeof(arr[key]) == 'array' || typeof(arr[key]) == 'object') { //递归调用    
                nativeCaller.ObjCLog(arr[key]);
            } else {
                nativeCaller.ObjCLog(key + ' = ' + arr[key] + '<br>');
            }
        }
    }

    TransactionSender.getData = function(contractName, methodName, argumentList) {

        var contractInstance = ContractManager.getContract(contractName).storeObj;
        var result;
        nativeCaller.ObjCLog("argumentList " + argumentList);
        if (argumentList.startsWith("[")) {
            //合约方法多个参数
            nativeCaller.ObjCLog("begin JSON parse");
            var arrayFromiOS = JSON.parse(argumentList);
            nativeCaller.ObjCLog("mutiply param " + arrayFromiOS);
            result = contractInstance[methodName].getData.apply(this, arrayFromiOS)
        } else {
            if (typeof(argumentList) == "undefined" || argumentList === "(null)") {
                //合约方法0个参数
                nativeCaller.ObjCLog("zero param " + arrayFromiOS);
                result = contractInstance[methodName].getData();
            } else if (typeof(arrayFromiOS) == "undefined") {
                //合约方法1个参数，且参数为string
                nativeCaller.ObjCLog("one string param " + argumentList);
                result = contractInstance[methodName].getData(argumentList);
            } else {
                //合约方法1个参数，且参数为string，并且为可解析的json
                nativeCaller.ObjCLog("one json param " + arrayFromiOS);
                result = contractInstance[methodName].getData(arrayFromiOS);
            }

        }
        return {
            "data": result,
            "address": contractInstance.address
        };

    }

    TransactionSender.signWithPrivateKey = function(privateKeyHex,nonceHex, gasPriceHex, gasLimitHex, to, valueHex, data) {

        try {

            var Buffer = window.buffer.Buffer;
            var BN = window.BN;

            var gasPrice = Buffer.from(nonceHex, 'hex')
            var gasLimit = Buffer.from(nonceHex, 'hex')
            var value = Buffer.from(nonceHex, 'hex')
            var nonceBuff = Buffer.from(nonceStr, 'hex')

            var rawTx = {
                gasPrice: 21000000000,
                gasLimit: 9999999999999,
                value: 0,
                nonce: nonceBuff,
                to: to,
                data: data
            }

            var Tx = EthJS.Tx;
            var tx = new Tx(rawTx);


            var privateKeyTxt = privateKeyHex;
            
            var privateKey = new Buffer(privateKeyTxt, 'hex');
            tx.sign(privateKey);

            var serializedTx = tx.serialize();
            var serializedTxHex = "0x" + serializedTx.toString('hex');

            return serializedTxHex;

        } catch (exception) {
            nativeCaller.ObjCLog(exception.message);
            nativeCaller.ObjCLog("exception: " + exception);
            return "";
        }

    }


    TransactionSender.getSignedRLPWithNonce = function(UUID, contractName, methodName, argumentList, nonceHex, privateKeyHex) {

        try {

            var web3 = TransactionSender.getWeb3jObj();
            var contractInstance = ContractManager.getContract(contractName).storeObj;

            var Buffer = window.buffer.Buffer;
            var nonce = new Buffer(nonceHex, 'hex');

            var executeData = TransactionSender.getData(contractName, methodName, argumentList).data;

            var rawTx = {
                gasPrice: 21000000000,
                gasLimit: 9999999999999,
                value: 0,
                nonce: nonce,
                to: contractInstance.address,
                data: executeData
            }

            var Tx = EthJS.Tx;
            var tx = new Tx(rawTx);


            var privateKeyTxt = privateKeyHex;
            var Buffer = window.buffer.Buffer;
            var privateKey = new Buffer(privateKeyTxt, 'hex');
            tx.sign(privateKey);

            var serializedTx = tx.serialize();
            var serializedTxHex = "0x" + serializedTx.toString('hex');
            return {
                "serializedTxHex": serializedTxHex,
                "address": contractInstance.address
            };


        } catch (exception) {
            nativeCaller.ObjCLog(exception.message);
            nativeCaller.ObjCLog("exception: " + exception);
            return e;
        }
    }



    /*
    获取未签名的rawTX，需要在外部签名
    */
    TransactionSender.geUnSignedRLPWithNonce = function(nonceHex, contractName, methodName, argumentList) {
        var web3 = TransactionSender.getWeb3jObj();
        var contractInstance = ContractManager.getContract(contractName).storeObj;

        try {
            var Buffer = window.buffer.Buffer;
            var nonce = new Buffer(nonceHex, 'hex');

            var executeData = TransactionSender.getData(contractName, methodName, argumentList).data;

            var rawTx = {
                gasPrice: 21000000000,
                gasLimit: 9999999999999,
                value: 0,
                nonce: nonce,
                to: contractInstance.address,
                data: executeData
            }

            var Tx = EthJS.Tx;
            var tx = new Tx(rawTx);

            var serializedTx = tx.serialize();
            // nativeCaller.ObjCLog("executeData: " + executeData);
            var serializedTxHex = "0x" + serializedTx.toString('hex');
            return {
                "serializedTxHex": serializedTxHex,
                "address": contractInstance.address
            };


        } catch (exception) {
            nativeCaller.ObjCLog(exception.message);
            nativeCaller.ObjCLog("exception: " + exception);
            return e;
        }


    }

    TransactionSender.sendRawTrasactionWithRLP = function(UUID, serializedTxHex) {
        nativeCaller.ObjCLog("sendRawTrasactionWithRLP serializedTxHex: " + serializedTxHex);
        var web3 = TransactionSender.getWeb3jObj();
        var hash = web3.eth.sendRawTransaction(serializedTxHex);
        nativeCaller.ObjCLog("after send hash:" + hash);
        nativeCaller.onMappingHashUUID([UUID, hash]);
        return hash;
    }


    TransactionSender.sendRawTrasaction = function(UUID, contractName, methodName, argumentList, eventName, privateKeyHex, from) {

        try {
            var serializedTxHex = TransactionSender.RawTrancactionRLP(UUID, contractName, methodName, argumentList, eventName, privateKeyHex, from);
            var web3 = TransactionSender.getWeb3jObj();
            var hash = web3.eth.sendRawTransaction(serializedTxHex);

            if (hash.length > 0) {
                nativeCaller.ObjCLog("sendRawTransaction hash: " + hash + "    UUID: " + UUID + " from: " + externalAccout + " to: " + contractInstance.address + " privateKey: " + privateKeyHex + " data: " + executeData);
                TransactionSender._UUIDHash[hash] = UUID;
            }
        } catch (e) {
            nativeCaller.ObjCLog(e.message);
        }


        nativeCaller.onMappingHashUUID([UUID, hash]);


    }


    //obj.nonce,obj.to,obj.value,obj.privateKey
    TransactionSender.sendEthRawTransaction=function(nonceHex,to,value,privateKeyHex,callback){
        try {

            var web3 = TransactionSender.getWeb3jObj();
          

            var Buffer = window.buffer.Buffer;
            // var nonce = new Buffer(nonceHex, 'hex');
            // alert('sendEthRawTransaction  var nonce = new Buf=');
            var executeData = '';

            var rawTx = {
                gasPrice: 21000000000,
                gasLimit: 9999999999999,
                value: value,
                nonce: nonceHex,
                to: to,
                data: executeData
            }

            var Tx = EthJS.Tx;
            var tx = new Tx(rawTx);


            var privateKeyTxt = privateKeyHex;
            var Buffer = window.buffer.Buffer;
            var privateKey = new Buffer(privateKeyTxt, 'hex');
            tx.sign(privateKey);

            var serializedTx = tx.serialize();
            var serializedTxHex = "0x" + serializedTx.toString('hex');
            alert('serializedTxHex='+serializedTxHex);
            var web3 = TransactionSender.getWeb3jObj();
            // web3.eth.sendRawTransaction(serializedTxHex,(error,result)=>{
            //         if(error){
            //             alert('innererror='+error);
                  
            //             callback('innererror='+error)
            //         }else{
            //             callback(result)
            //         }
            // });
           var hash = web3.eth.sendRawTransaction(serializedTxHex);
           return hash;
        } catch (exception) {
            nativeCaller.ObjCLog(exception.message);
            nativeCaller.ObjCLog("exception: " + exception);
          //  callback(exception.message)
            return 'exchange failed error='+exception.message;
        }
    }



    TransactionSender.RawTrancactionRLP = function(UUID, contractName, methodName, argumentList, eventName, privateKeyHex, from) {
        var web3 = TransactionSender.getWeb3jObj();
        var contractInstance = ContractManager.getContract(contractName).storeObj;

        var externalAccout = from;
        var nonce = web3.nonce();

        //var nonceHex = web3.toHex(nonce);

        var executeData = TransactionSender.getData(contractName, methodName, argumentList).data;

        var rawTx = {
            gasPrice: 21000000000,
            gasLimit: 9999999999999,
            value: 0,
            nonce: nonce,
            to: contractInstance.address,
            data: executeData
        }

        TransactionSender._nonce = nonce + 1;

        var Tx = EthJS.Tx;
        var tx = new Tx(rawTx);

        var privateKeyTxt = privateKeyHex;
        var Buffer = window.buffer.Buffer;
        var privateKey = new Buffer(privateKeyTxt, 'hex');
        tx.sign(privateKey);

        var serializedTx = tx.serialize();
        var serializedTxHex = "0x" + serializedTx.toString('hex');
        nativeCaller.ObjCLog("serializedTxHex:" + serializedTxHex);
        return serializedTxHex;
    }


    TransactionSender.getTransactionReceipt = function(contractName, eventName, hash) {
        var web3 = TransactionSender.getWeb3jObj();
        result = web3.eth.getTransactionReceipt(hash);
        var resultJSON = JSON.stringify(result)
        nativeCaller.onContractEvent(resultJSON)

        // function(result) {
        //     ObjCLog("getTransactionReceipt:" + result);
        //     var resultJSON = JSON.stringify(result)
        //     try {
        //         onContractEvent(resultJSON)
        //     } catch (e) {

        //     }
        // }
    }



    TransactionSender.watchEvent = function(contractName, eventName) {

        var web3 = TransactionSender.getWeb3jObj();
        var contractInstance = ContractManager.getContract(contractName).storeObj;
        var eventKey = contractName + eventName;

        var existevent = TransactionSender._eventObj[eventKey];
        if (typeof(existevent) == "object") {
            nativeCaller.ObjCLog("will stopWatch previous event!");
            existevent.stopWatching(function() {
                nativeCaller.ObjCLog("did stopWatching previous event!");
            });

        }


        nativeCaller.ObjCLog("eventKey:" + eventKey + " address" + contractInstance.address);
        var event = TransactionSender._eventObj[eventKey];
        if (true) {
            //event = contractInstance[eventName]({ _info: contractInstance.address }, { fromBlock: 0, toBlock: 'latest' });
            event = contractInstance[eventName]({ fromBlock: 0, toBlock: 'latest' });
            nativeCaller.ObjCLog("eventTransactionSender.watchEvent aways create event object!");
            TransactionSender._eventObj[eventKey] = event;
        } else {
            nativeCaller.ObjCLog("eventTransactionSender.watchEvent using exist event object!");
        }

        event.watch(function(error, result) {
            var resultJSON = JSON.stringify(result)
            try {
                nativeCaller.onContractEvent(resultJSON)
            } catch (e) {

            }
        });

    }


    TransactionSender.stopWatch = function(contractName, eventName) {
        var eventKey = contractName + eventName;
        var event = TransactionSender._eventObj[eventKey];
        if (typeof(event) == "undefined") {
            nativeCaller.ObjCLog("eventTransactionSender.stopWatch can't find event object!");
        }

        event.stopWatching(function() {
            nativeCaller.ObjCLog("eventTransactionSender.stopWatch did stop watcher!");
        });
    }



















})();
