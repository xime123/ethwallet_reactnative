(function() {

    window.Contract = {
        ABI: [],
        address: "",
        name: "",
        version: "",
        storeObj: Object
    };

    ContractManager = {
        _contracts: {}
    };

    ContractManager.initRegisterContract = function(ABI, address, version) {

        try {

            var web3 = TransactionSender.getWeb3jObj();
            var REGContract = web3.eth.contract(ABI);
            regAddress = address;
            _registerInstance = REGContract.at(regAddress);

            var registerInstance = Object.create(Contract);
            registerInstance.ABI = ABI;
            registerInstance.address = address;
            registerInstance.version = version;
            registerInstance.storeObj = _registerInstance;

            ContractManager._contracts["RegisterManager"] = registerInstance;

            nativeCaller.onRegisterInitDone();

        } catch (e) {
            nativeCaller.ObjCLog("ContractManager.initRegisterContract" + e.message);
        }

    }


    ContractManager.setAddress = function(contractName, address) {
        var contractInstance = ContractManager._contracts[contractName];
        contractInstance.storeObj.address = address;
        nativeCaller.ObjCLog("-contract:" + contractName + "-set address:" + address);
    }

    ContractManager.initContract = function(contractName, ABI, address, version) {
        var register = ContractManager._contracts["RegisterManager"].storeObj;
        //         var queryAddress = register.getContractAddress.call(contractName, version);
        //        var queryAddress = register.getContractAddress.call("SystemModuleManager","0.0.1.0",contractName, version);
        var queryAddress = "0x0000000000000000000000000000000000000000";
        if (queryAddress != "0x0000000000000000000000000000000000000000") {
            address = queryAddress;
            nativeCaller.ObjCLog("use queryAddress");
        } else if (address === null || address == "(null)") {
            address = "0x0000000000000000000000000000000000000000";
            nativeCaller.ObjCLog("use zero address");
        } else {
            nativeCaller.ObjCLog("use default address");
        }
        nativeCaller.ObjCLog("queryAddress:" + queryAddress + " contractName:" + contractName + " version: " + version + " using address:" + address);

        var web3 = TransactionSender.getWeb3jObj();
        var ContractABI = web3.eth.contract(ABI);
        contractInstance = ContractABI.at(address);

        var newInstance = Object.create(Contract);
        newInstance.ABI = ABI;
        newInstance.address = address;
        newInstance.version = version;
        newInstance.storeObj = contractInstance;

        ContractManager._contracts[contractName] = newInstance;
        nativeCaller.onContractsInitDone(contractName);
    }

    ContractManager.getContract = function(contractName) {
        return ContractManager._contracts[contractName];
    }





})();
