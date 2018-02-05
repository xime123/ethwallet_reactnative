(function() {

    window.WebThreeRLP = {};

    var Buffer = window.buffer.Buffer;
    var BN = window.BN;
    var rlp = window.rlp;


    //rlp(gasPrice||gas||receiveAddress||value||data||v+27||r||s)进行编码，返回结果用来进行广播加密
    WebThreeRLP.privateTXEncode4Enc = function(gasPriceHex, gasHex, toHex, valueStr, dataHex, VHex, RHex, SHex) {
        var gasPriceBuff = new Buffer(gasPriceHex, 'hex');
        var gasBuff = new Buffer(gasHex, 'hex');
        var toBuff = new Buffer(toHex, 'hex');
        var valueNum = Number(valueStr);
        var dataBuff = new Buffer(dataHex, 'hex');
        var vBuff = new Buffer(VHex, 'hex');
        var rBuff = new Buffer(RHex, 'hex');
        var sBuff = new Buffer(SHex, 'hex');

        var rlpBuff = rlp.encode(gasPriceBuff, gasBuff, toBuff, valueNum, dataBuff, vBuff, rBuff, sBuff);
        var resultHex = rlpBuff.toString('hex');

        return resultHex;
    }



    WebThreeRLP.decode = function(dataHex) {
        var StringArray;
        try {
            var buff = new Buffer(dataHex, 'hex');
            var decodedBytesArray = rlp.decode(buff);

            var hexArray = new Array()
            for (var i = 0; i < decodedBytesArray.length; i++) {
                var bytes = decodedBytesArray[i];
                var bytesHex = bytes.toString('hex');
                hexArray.push(bytesHex);

            }
            StringArray = JSON.stringify(hexArray)

        } catch (e) {
            nativeCaller.printErrorMsg(e);
        }


        return StringArray;

    }

    /*
    将nonce||cipherText||gs||广播加密的公钥个数，返回结果直接发送json prc
    nonceHex : 十六进制字符串的nonce
    cipherTextHex : 十六进制字符串密文
    GSHex : 十六进制字符串的群签名
    publicKeyLenStr : 整型 公钥列表个数
    */
    WebThreeRLP.privateTXEncode4JSONRPC = function(nonceStr, nonceType, cipherTextHex, GSHex, publicKeyLenStr) {

        var nonce = WebThreeRLP.nonceWithType(nonceStr, nonceType);

        // nativeCaller.ObjCLog("----->nonceHex:" + nonceHex);
        // nativeCaller.ObjCLog("----->cipherTextHex:" + cipherTextHex);
        // nativeCaller.ObjCLog("----->GSHex:" + GSHex);
        // nativeCaller.ObjCLog("----->publicKeyLenStr:" + publicKeyLenStr);

        var cipherBuffer = new Buffer(cipherTextHex, 'hex');

        var GSBuff = new Buffer(GSHex, 'hex');

        var publicKeyLenNum = Number(publicKeyLenStr);

        var rlpBuff = window.rlp.encode([nonce, cipherBuffer, GSBuff, publicKeyLenNum]);
        var resultHex = rlpBuff.toString('hex');

        return resultHex;
    }





    /*
    nonceStr : 0
    nonceType: 0:通过eth_getTransactionCount返回的nonce 1:时间戳nonce
    gasPriceStr: 0
    gasLimitStr: 0
    toHex: 0
    value: 0
    valueStr: 0
    dataBufferHex: 0
    appendSign: 0:不带签名，此时VHex，RHex ，SHex不传 1：0:不带签名，此时VHex，RHex ，SHex必须传入
    VHex: 0
    RHex: 0
    SHex: 0
    */

    WebThreeRLP.nonceWithType = function(nonceStr, nonceType) {
        var nonce;
        try {
            nonceType = Number(nonceType);
            if (nonceType == 1 || true) {
                nativeCaller.ObjCLog("----------> nonce is BN:" + nonceStr);
                // var nonceBuff = new Buffer(nonceStr, 'hex');
                var nonceBuff = Buffer.from(nonceStr, 'hex')
                nonce = new BN(nonceBuff);
            } else if (nonceType == 0) {
                nativeCaller.ObjCLog("----------> nonce is Number " + nonceStr);
                nonce = Number(nonceStr);
            }
        } catch (e) {

        }

        return nonce;
    }

    WebThreeRLP.encodeRLP4ECCSign = function(nonceStr, nonceType, gasPriceStr, gasLimitStr, toHex, valueStr, dataBufferHex, appendSign, VHex, RHex, SHex) {
        var resultHex;
        try {
            var nonce = WebThreeRLP.nonceWithType(nonceStr, nonceType);

            var gasPrice = Number(gasPriceStr);

            var gasLimit = Number(gasLimitStr);

            var tobuf = new Buffer(toHex, 'hex');
//            var toBigInt = new BN(tobuf);

            var valueBuff = new Buffer(valueStr, 'hex');
            var valueBigInt = new BN(valueBuff);

            var dataBuff = new Buffer(dataBufferHex, 'hex');

            shouldAppend = Number(appendSign);

            if (shouldAppend == 1) {
                var vBuff = new Buffer(VHex, 'hex');
                var rBuff = new Buffer(RHex, 'hex');
                var sBuff = new Buffer(SHex, 'hex');
                nativeCaller.ObjCLog("yessss appendSign!!!!!!");
                rlpBuff = rlp.encode([nonce, gasPrice, gasLimit, tobuf, 0, dataBuff, vBuff, rBuff, sBuff]);
            } else {
                nativeCaller.ObjCLog("nooooo appendSign!!!!!!");
                rlpBuff = rlp.encode([nonce, 21000000000, 999999999999, tobuf, 0, dataBuff]);
            }

            resultHex = rlpBuff.toString('hex');
            nativeCaller.ObjCLog(resultHex);

        } catch (e) {
            nativeCaller.ObjCLog(e.message);
            nativeCaller.ObjCLog(e.lineNumber);
            nativeCaller.printErrorMsg(e);
        }

        return resultHex;
    }

    WebThreeRLP.nonceWithTimeStamp = function(nonceHex) {
        var nonce = TransactionSender.getWeb3jObj().nonceWithTimeStamp(nonceHex);
        return nonce.toString('hex');
    }
    WebThreeRLP.signWithPrivateKey = function(privateKeyHex, nonceHex, gasPriceHex, gasLimitHex, toAddress, valueHex, data) {

        try {

            //nonce需要去掉0x，因为js端直接转buffer data和to需要加0x
            var nonceBuff = Buffer.from(nonceHex, 'hex');

            var gasPriceBuff = Buffer.from(gasPriceHex, 'hex');
            var gasPriceBN = new BN(gasPriceBuff);

            var gasLimitBuff = Buffer.from(gasLimitHex, 'hex');
            var gasLimitBN = new BN(gasLimitBuff);

            var valueBuff = Buffer.from(valueHex, 'hex');
            var valueBN = new BN(valueBuff);


            var rawTx = {
                gasPrice: gasPriceBN,
                gasLimit: gasLimitBN,
                value: valueBN,
                nonce: nonceBuff,
                to: toAddress,
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

    WebThreeRLP.signWithPrivateKeyTest = function() {

        var tmpbuffer = new Buffer("400", 'hex');
        var bn = new BN(tmpbuffer);

        var privateKey = "86bbc63847c1ab89253e6225fd61a811f3a413e592d5ab9301b6685d424233d4";
        var nonceHex = "000001608c48156ea1c8b15e2a9fcd914b26265bb40f10c893d8612b7a5ce5eb";


        var gasPrice = "21000000000"; //0x4E3B29200
        var gasLimit = "9999999999999"; //0x9184E729FFF

        gasPrice = "4E3B292000";
        gasLimit = "9184E729FFF";

        var to = "0xe6c925b676cfb621718d61b97ef7152778a002d2";
        var value = "00";
        var data = "0x3484496c00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000063";
        WebThreeRLP.signWithPrivateKey(privateKey, nonceHex, gasPrice, gasLimit, to, value, data);
    }

    WebThreeRLP.test = function() {

        var nonce = new Buffer("015d7281fc2b47784188140c114f9380176877d4daf0194486e32f1a0702", 'hex');
        var nonceBigInt = new BN(nonce)
        var privateKey = new Buffer("ffffff", 'hex');
        var nonceHex = nonce.toString('hex');

        var dataBuffer = new Buffer('3484496c00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000063', 'hex');

        var vbuf = new Buffer('1c', 'hex')
        var rbuf = new Buffer('f6a3a3ee668069d2f41c5f8f7dca57855fce05005692e9e1212adeafd0fd6017', 'hex')
        var sbuf = new Buffer('2e42866ba4608bfe6f8f0ffb6f21e8e0c4230d59a19def7e2042e7035623169c', 'hex')

        //var tobuf = new Buffer('60980196be4c8e2d958c7be1158b30f506a8cece', 'hex')
        var tobuf = new Buffer('000000000000000000000000000000000000eeee', 'hex')
        var toBigInt = new BN(tobuf)

        var result = window.rlp.encode([nonceBigInt, 21000000000, 9999999999999, tobuf, 0, dataBuffer, vbuf, rbuf, sbuf]).toString('hex')
        var result = window.rlp.encode([nonceBigInt, 21000000000, 9999999999999, toBigInt, 0, dataBuffer, vbuf, rbuf, sbuf])
        var resultHex = result.toString('hex');


    }



})();
