(function() {

    window.ECDSASignature = {};

    function buf2hex(byteArray) {
        return Array.from(byteArray, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    /*
    ES6  iOS 9.x not support
        function buf2hex(buffer) { // buffer is an ArrayBuffer
            return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
        }

        */

    function createHexString(arr) {
        var result = "";
        var z;

        for (var i = 0; i < arr.length; i++) {
            var str = arr[i].toString(16);

            z = 8 - str.length + 1;
            str = Array(z).join("0") + str;

            result += str;
        }

        return result;
    }

    ECDSASignature.sign = function(digest, privatekey) {
        var EC = window.elliptic.ec;
        var ec = new EC('secp256k1');
        var key = ec.keyFromPrivate(privatekey);
        var signature = key.sign(digest);
        var recid = ec.getKeyRecoveryParam(digest, signature, key.getPublic());
        var derSign = signature.toDER();
        var signatureHex = buf2hex(derSign);
        return { "recid": recid, "signatureHex": signatureHex };
    }

    ECDSASignature.publicKeyFromPrivateKey = function(privatekey) {
        var EC = window.elliptic.ec;
        var ec = new EC('secp256k1');
        var key = ec.keyFromPrivate(privatekey);
        var pub = key.getPublic();

        var pubPoint = key.getPublic();
        var x = pubPoint.getX();
        var y = pubPoint.getY();
        //usage https://github.com/indutny/elliptic
        var pub = pubPoint.encode('hex');
        return pub;
    }



})();