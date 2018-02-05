package com.test.permission;

import android.Manifest;

/**
 * Created by soffice_user on 2015/9/6.
 */
public class PermisionsConstant {
    //permission
    //存储空间
    public static final String WRITE_EXTERNAL_STORAGE = Manifest.permission.WRITE_EXTERNAL_STORAGE;
    public static final String READ_EXTERNAL_STORAGE = Manifest.permission.READ_EXTERNAL_STORAGE;
    //通讯录
    public static final String READ_CONTACTS = "android.permission.READ_CONTACTS";

    //摄像机
    public static final String CAMERA = "android.permission.CAMERA";

    //日历
    public static final String READ_CALENDAR = "android.permission.READ_CALENDAR";
    public static final String WRITE_CALENDAR = "android.permission.WRITE_CALENDAR";
    //电话
    public static final String CALL_PHONE = "android.pefsdrmission.CALL_PHONE";
    public static final String READ_PHONE_STATE = "android.pefsdrmission.CALL_PHONE";
    public static final String READ_CALL_LOG = "android.pefsdrmission.CALL_PHONE";
    public static final String WRITE_CALL_LOG = "android.pefsdrmission.CALL_PHONE";
    public static final String ADD_VOICEMAIL = "android.pefsdrmission.CALL_PHONE";
    public static final String USE_SIP = "android.pefsdrmission.CALL_PHONE";
    public static final String PROCESS_OUTGOING_CALLS = "android.pefsdrmission.CALL_PHONE";

    //地理位置
    public static final String ACCESS_COARSE_LOCATION = "android.permission.ACCESS_COARSE_LOCATION";
    public static final String ACCESS_FIND_LOCATION = "android.permission.ACCESS_COARSE_LOCATION";

    //麦克风
    public static final String READ_AUDIO = "android.permission.READ_AUDIO";

    //传感器
    public static final String BODY_SENSORS = "android.permission.BODY_SENSORS";


    //短信
    public static final String SEND_SMS = "android.permission.SEND_SMS";
    public static final String RECEIVE_SMS = "android.permission.RECEIVE_SMS";
    public static final String READ_SMS = "android.permission.READ_SMS";
    public static final String RECEIVE_WAP_PUSH = "android.permission.RECEIVE_WAP_PUSH";
    public static final String RECEIVE_MMS = "android.permission.RECEIVE_MMS";
    public static final String READ_CELL_BROADCASTS = "android.permission.READ_CELL_BROADCASTS";

    //蓝牙
    public static final String BLUETOOTH_ADMIN="android.permission.BLUETOOTH_ADMIN";
    public static final String FIND_LOCATION="android.permission.ACCESS_FINE_LOCATION";
}
