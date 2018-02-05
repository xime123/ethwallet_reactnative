var ClientReceiptABI = [{
    "constant": true,
    "inputs": [],
    "name": "getErrno",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_addr",
        "type": "address"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_i",
        "type": "int256"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "_version",
        "type": "string"
    }],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_str2",
        "type": "string"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "clearLog",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getSender",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getLog",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }],
    "name": "deposit",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_ui",
        "type": "uint256"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "a",
        "type": "uint256"
    }],
    "name": "multiply",
    "outputs": [{
        "name": "d",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "value",
        "type": "string"
    }],
    "name": "Deposit",
    "type": "event"
}];


var abi = [{
    "constant": false,
    "inputs": [{
        "name": "a",
        "type": "uint256"
    }],
    "name": "multiply",
    "outputs": [{
        "name": "d",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}];

var registerABI = [{
    "constant": true,
    "inputs": [{
        "name": "_contractAddr",
        "type": "address"
    }],
    "name": "IfContractRegist",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "unRegister",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "_version",
        "type": "string"
    }],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_addr",
        "type": "address"
    }],
    "name": "findResNameByAddress",
    "outputs": [{
        "name": "_contractName",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_pageNum",
        "type": "uint256"
    }, {
        "name": "_pageSize",
        "type": "uint256"
    }],
    "name": "getRegisteredContract",
    "outputs": [{
        "name": "_json",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "_version",
        "type": "string"
    }],
    "name": "getContractAddress",
    "outputs": [{
        "name": "_address",
        "type": "address"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}];

var MetaCoinABI = [{
    "constant": false,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "getBalanceInEth",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "receiver",
        "type": "address"
    }, {
        "name": "amount",
        "type": "uint256"
    }],
    "name": "sendCoin",
    "outputs": [{
        "name": "sufficient",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "getBalance",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_from",
        "type": "address"
    }, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}];


var ActionManagerABI = [{
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "userExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getErrno",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "deleteById",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "actionUsed",
    "outputs": [{
        "name": "_used",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_addr",
        "type": "address"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_i",
        "type": "int256"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "_version",
        "type": "string"
    }],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_addr",
        "type": "address"
    }, {
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "checkWritePermission",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_str2",
        "type": "string"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "findById",
    "outputs": [{
        "name": "_actionJson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_roleId",
        "type": "string"
    }, {
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkRoleAction",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_contractName",
        "type": "string"
    }],
    "name": "listContractActions",
    "outputs": [{
        "name": "_actionListJson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "clearLog",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getSender",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "eraseAdminByAddress",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getChildIdByIndex",
    "outputs": [{
        "name": "_childDepartmentId",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkDepartmentAction",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "departmentExists",
    "outputs": [{
        "name": "_exists",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "listAll",
    "outputs": [{
        "name": "_actionListJson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "index",
        "type": "uint256"
    }],
    "name": "getUserRoleId",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "getUserCountByDepartmentId",
    "outputs": [{
        "name": "_count",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkActionExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "index",
        "type": "uint256"
    }],
    "name": "getDepartmentRoleId",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getLog",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getCount",
    "outputs": [{
        "name": "_count",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_roleId",
        "type": "string"
    }],
    "name": "roleUsed",
    "outputs": [{
        "name": "_used",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "actionExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "getUserDepartmentId",
    "outputs": [{
        "name": "_departId",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkUserAction",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_actionJson",
        "type": "string"
    }],
    "name": "insert",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_ui",
        "type": "uint256"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_roleId",
        "type": "string"
    }],
    "name": "checkDepartmentRole",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_resKey",
        "type": "string"
    }, {
        "name": "_opKey",
        "type": "string"
    }],
    "name": "findByKey",
    "outputs": [{
        "name": "_actionJson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_roleId",
        "type": "string"
    }],
    "name": "roleExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_contractAddr",
        "type": "address"
    }, {
        "name": "_funcSha3",
        "type": "string"
    }],
    "name": "checkUserPrivilege",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "getAdmin",
    "outputs": [{
        "name": "_admin",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }, {
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getRoleIdByActionIdAndIndex",
    "outputs": [{
        "name": "_roleId",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }, {
        "name": "_contractAddr",
        "type": "address"
    }, {
        "name": "_opSha3Key",
        "type": "string"
    }],
    "name": "checkActionWithKey",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_errno",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "_info",
        "type": "string"
    }],
    "name": "Notify",
    "type": "event"
}];


var UserManagerABI = [{
    "constant": true,
    "inputs": [{
        "name": "_account",
        "type": "string"
    }],
    "name": "getAccountState",
    "outputs": [{
        "name": "_state",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_pageNum",
        "type": "uint256"
    }, {
        "name": "_pageSize",
        "type": "uint256"
    }],
    "name": "findByDepartmentIdTree",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_mobile",
        "type": "string"
    }],
    "name": "findByMobile",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "userExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getRevision",
    "outputs": [{
        "name": "_revision",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getErrno",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_roleId",
        "type": "string"
    }],
    "name": "checkUserRole",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_status",
        "type": "uint256"
    }],
    "name": "updatePasswordStatus",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "actionUsed",
    "outputs": [{
        "name": "_used",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_addr",
        "type": "address"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_account",
        "type": "string"
    }],
    "name": "login",
    "outputs": [{
        "name": "_json",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_i",
        "type": "int256"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_accountStatus",
        "type": "uint256"
    }, {
        "name": "_pageNo",
        "type": "uint256"
    }, {
        "name": "_pageSize",
        "type": "uint256"
    }],
    "name": "pageByAccountStatus",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userJson",
        "type": "string"
    }],
    "name": "update",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "_version",
        "type": "string"
    }],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "getUserState",
    "outputs": [{
        "name": "_state",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_addr",
        "type": "address"
    }, {
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "checkWritePermission",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_email",
        "type": "string"
    }],
    "name": "findByEmail",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_str2",
        "type": "string"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_roleId",
        "type": "string"
    }, {
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkRoleAction",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }],
    "name": "findByLoginName",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "clearLog",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getSender",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "eraseAdminByAddress",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getChildIdByIndex",
    "outputs": [{
        "name": "_childDepartmentId",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkDepartmentAction",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "departmentExists",
    "outputs": [{
        "name": "_exists",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "listAll",
    "outputs": [{
        "name": "_userListJson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getUserRoleId",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "getUserCountByDepartmentId",
    "outputs": [{
        "name": "_count",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkActionExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "deleteByAddress",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_roleId",
        "type": "string"
    }],
    "name": "addUserRole",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "index",
        "type": "uint256"
    }],
    "name": "getDepartmentRoleId",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getLog",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "findByAddress",
    "outputs": [{
        "name": "_ret",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_account",
        "type": "string"
    }],
    "name": "findByAccount",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_roleId",
        "type": "string"
    }],
    "name": "roleUsed",
    "outputs": [{
        "name": "_used",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "actionExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }],
    "name": "getUserDepartmentId",
    "outputs": [{
        "name": "_departId",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_actionId",
        "type": "string"
    }],
    "name": "checkUserAction",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userJson",
        "type": "string"
    }],
    "name": "insert",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getUserCount",
    "outputs": [{
        "name": "_count",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_str",
        "type": "string"
    }, {
        "name": "_ui",
        "type": "uint256"
    }],
    "name": "log",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }, {
        "name": "_roleId",
        "type": "string"
    }],
    "name": "checkDepartmentRole",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }],
    "name": "getUserCountByActionId",
    "outputs": [{
        "name": "_count",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_roleId",
        "type": "string"
    }],
    "name": "roleExists",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "findByDepartmentId",
    "outputs": [{
        "name": "_strjson",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_contractAddr",
        "type": "address"
    }, {
        "name": "_funcSha3",
        "type": "string"
    }],
    "name": "checkUserPrivilege",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_departmentId",
        "type": "string"
    }],
    "name": "getAdmin",
    "outputs": [{
        "name": "_admin",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }, {
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getRoleIdByActionIdAndIndex",
    "outputs": [{
        "name": "_roleId",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_actionId",
        "type": "string"
    }, {
        "name": "_resKey",
        "type": "address"
    }, {
        "name": "_opSha3Key",
        "type": "string"
    }],
    "name": "checkActionWithKey",
    "outputs": [{
        "name": "_ret",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_userAddr",
        "type": "address"
    }, {
        "name": "_status",
        "type": "uint256"
    }],
    "name": "updateAccountStatus",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_errno",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "_info",
        "type": "string"
    }],
    "name": "Notify",
    "type": "event"
}];

var mutiplyABI = [{
    "constant": false,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "Notify3LongString",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "mutiplyByWithConstant",
    "outputs": [{
        "name": "resutl",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "mutiplyByWithEvent",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "a",
        "type": "uint256"
    }],
    "name": "multiply7",
    "outputs": [{
        "name": "d",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "mutiplyByWithEventReturn99",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "callWithLongString",
    "outputs": [{
        "name": "result",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "stringValue",
        "type": "string"
    }],
    "name": "mutiplyConcatString",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "getBalanceInEth",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "result",
        "type": "string"
    }],
    "name": "justReturnWhatUGet",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "by",
        "type": "uint256"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "mutiplyBy",
    "outputs": [{
        "name": "resutl",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_value",
        "type": "uint256"
    }],
    "name": "Notify1LongString",
    "outputs": [{
        "name": "_ret",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "receiver",
        "type": "address"
    }, {
        "name": "amount",
        "type": "uint256"
    }],
    "name": "sendCoin",
    "outputs": [{
        "name": "sufficient",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "obj",
        "type": "uint256"
    }],
    "name": "setStoreObj",
    "outputs": [{
        "name": "result",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "getBalance",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_info",
        "type": "string"
    }],
    "name": "Notify1",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_errno",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "_info",
        "type": "string"
    }],
    "name": "Notify",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_errno",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "_info",
        "type": "string"
    }, {
        "indexed": false,
        "name": "_data",
        "type": "string"
    }],
    "name": "Notify3",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_from",
        "type": "address"
    }, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}]
