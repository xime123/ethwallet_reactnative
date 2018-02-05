(function() {

    var params = {
        keyBytes: 32,
        ivBytes: 16
    };

    var options = {
        kdf: "scrypt",
        cipher: "aes-128-ctr",
        kdfparams: {
            n: (1 << 4),
            dklen: 32,
            p: 1,
            r: 8,
            prf: "hmac-sha256"
        }
    };

    WalletHelper = {
        _from: "",
        _publicly: "",
        _privateKey: "",
        _isActivate: false,
        _web3: {},
    };
    WalletHelper.loadWalletFile = function(walletJson, password) {

        //ObjCLog("🤔" + "walletJson:" + walletJson + " password: " + password);

        var keythereum = window.keythereum;
        var keyObject = eval("(" + walletJson + ')');
        var generatedKey;
        //window.webkit.messageHandlers.ObjCLog.postMessage("wkwebView: " + walletJson + " address: " + password);
        try {
            generatedKey = keythereum.recover(password, keyObject);
        } catch (e) {
            //window.webkit.messageHandlers.onKeyError.postMessage(e.message);

            //onKeyError(UUID, e);
        }


        var generatedKey = keythereum.recover(password, keyObject);
        WalletHelper._from = keyObject.address;
        WalletHelper._privateKey = generatedKey;
        WalletHelper._isActivate = true;
        //ObjCLog("🍺" + "recoverKey:" + generatedKey + " address: " + keyObject.address);

        return generatedKey.toString('hex');
    }

    WalletHelper.cleanWalletFile = function() {
        WalletHelper._from = "";
        WalletHelper._privateKey = "";
        WalletHelper._isActivate = false;
    }



    WalletHelper.generateWallet = function(password) {
        var keythereumObj = window.keythereum;
        // synchronous
        var dk = keythereumObj.create(params);

        var keyObject = keythereumObj.dump(password, dk.privateKey, dk.salt, dk.iv, options);
        keyObject.address = '0x' + keyObject.address;
        var obj = JSON.stringify(keyObject);
        //ObjCLog("key obj:" + obj + " password: " + password);
        return obj;
    }

    WalletHelper.modifyPassword = function(walletJson, oldPassword, newPassword) {

        var keythereum = window.keythereum;
        var keyObject = eval("(" + walletJson + ')');
        var recoveredPriKey;

        try {
            recoveredPriKey = keythereum.recover(oldPassword, keyObject);
        } catch (e) {
            return "recoveryerror"
        }

        // synchronous
        var dk = keythereum.create(params);

        dk.privateKey = recoveredPriKey;

        var keyObject = keythereum.dump(newPassword, dk.privateKey, dk.salt, dk.iv, options);
        keyObject.address = '0x' + keyObject.address;
        var obj = JSON.stringify(keyObject);
        return obj;
    }

    WalletHelper.getFromAddress = function() {
        if (WalletHelper._from.length > 0) {
            return WalletHelper._from;
        }
        return "0x0098c263c4498c9c544c88b1357e3b15ce3c3444";
    }

    WalletHelper.getPrivateKey = function() {
        if (WalletHelper._privateKey.length > 0) {
            return WalletHelper._privateKey;
        }
        return "f8ebf968d3c91ec8ee4c6fee44de1d43464c4f0268bcc148c46056e87e649143";
    }

})();
