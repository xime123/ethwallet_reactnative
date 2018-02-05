package com.test;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.test.bean.ImportWalletInfo;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.Wallet;
import org.web3j.crypto.WalletFile;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.math.BigDecimal;

import static android.app.Activity.RESULT_OK;

/**
 * Created by xumin on 2018/1/16.
 */

public class ReactNativeMessageHandler extends ReactContextBaseJavaModule {
    public static final String START_QRCODE_SCAN="scan_qrcod";
    public static final String TAG="MessageHandler";
    private final int REQUEST_CODE=100;
    private ReactApplicationContext mContext;
    private Promise mPromise;
    public static final String WEB_URL="http://192.168.9.79:6795";
    public ReactNativeMessageHandler(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext=reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    private final ActivityEventListener mActivityEventListener=new BaseActivityEventListener(){
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//            super.onActivityResult(activity, requestCode, resultCode, data);不需要super
            Log.i(TAG, "requestCode:" + requestCode+"     resultCode="+resultCode);
            if(requestCode==REQUEST_CODE&&resultCode==RESULT_OK) {
                String result = data.getExtras().getString("result");//得到新Activity关闭后返回的数据
                Log.i(TAG, "result:" + result);
                mPromise.resolve(result);
            }else {
                Log.i(TAG, "resultfunkdjflkajd:" );
            }
        }
    };

    @Override
    public String getName() {
        return "ReactNativeMessageHandler";
    }

    @ReactMethod
    public void handleMessage(String msg, Promise promise){
        mPromise=promise;
        if(START_QRCODE_SCAN.equals(msg)){
            Intent intent=new Intent(mContext,QrcodeActivity.class);
//            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mContext.startActivityForResult(intent,REQUEST_CODE,new Bundle());
        }else {
           TxInfo txInfo=GsonUtil.jsonToObject(msg,TxInfo.class);
            if(txInfo!=null) {
                sendTransaction(txInfo, promise);
            }else {
                promise.reject("txInfo is null");
            }
        }
    }

    @ReactMethod
    public void onImportWallet(String msg, Promise promise){

        if(!TextUtils.isEmpty(msg)){
            try {
                ImportWalletInfo importWalletInfo=GsonUtil.jsonToObject(msg,ImportWalletInfo.class);
                Credentials credentials= Credentials.create(importWalletInfo.privateKey);
                WalletFile walletFile=Wallet.create(importWalletInfo.password,credentials.getEcKeyPair(),16,1);
                String jsonValue=GsonUtil.objectToJson(walletFile,WalletFile.class);
                promise.resolve(jsonValue);
            }catch (Exception e){
                e.printStackTrace();
                promise.reject("导入钱包失败：Error="+e.getMessage());
            }

        }
    }

    private void sendTransaction(TxInfo txInfo,Promise promise){
        try {
            Log.i("JavaSendTx",txInfo.toString());
            Credentials credentials= Credentials.create(txInfo.privateKey);
            Web3j web3j = Web3jFactory.build(new HttpService(WEB_URL));  // defaults to http://localhost:8545/
            double v=Double.valueOf(txInfo.value);
            TransactionReceipt transactionReceipt = Transfer.sendFunds(web3j, credentials, txInfo.to, BigDecimal.valueOf(v), Convert.Unit.ETHER).send();

            String hash=transactionReceipt.getTransactionHash();
            EthGetTransactionReceipt ethGetTransactionReceipt =
                web3j.ethGetTransactionReceipt(hash).sendAsync().get();
            String info="hash="+hash+" \nvalue="+BigDecimal.valueOf(1.0)+"\ntoAddress="+txInfo.to+"\nformAddress="+txInfo.from;
            promise.resolve(info);
        }catch (Exception e){
            promise.reject(e.getMessage());
            e.printStackTrace();
        }

    }
}
