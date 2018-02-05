package com.test.permission;

import android.app.Activity;
import android.content.DialogInterface;
import android.support.annotation.NonNull;

import com.yanzhenjie.alertdialog.AlertDialog;
import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.PermissionListener;
import com.yanzhenjie.permission.Rationale;
import com.yanzhenjie.permission.RationaleListener;
import com.yanzhenjie.permission.RationaleRequest;

import java.util.List;


/**
 * Created by 徐敏 on 2017/8/19.
 */

public class PermissionsManager {

    private final static PermissionsManager instance=new PermissionsManager();
    private PermissionsManager(){}
    public static  PermissionsManager getInstance(){
        return instance;
    }

    public void requestPermissionsIfNecessaryForResult(final Activity activity, String[]permissions, final PermissionsResultAction action){
        RationaleRequest request = AndPermission.with(activity);
       // request.requestCode(100);
        request.permission(permissions);
        request.callback(new PermissionListener() {
            @Override
            public void onSucceed(int requestCode, @NonNull List<String> grantPermissions) {
                if (action != null) {
                    action.onGranted();
                }
            }

            @Override
            public void onFailed(int requestCode, @NonNull List<String> deniedPermissions) {
                // 用户否勾选了不再提示并且拒绝了权限，那么提示用户到设置中授权。
                if (AndPermission.hasAlwaysDeniedPermission(activity, deniedPermissions)) {
                    AndPermission.defaultSettingDialog(activity, 0)
                        .setTitle("权限申请失败")
                        .setMessage("我们需要的一些权限申请失败，请您到设置页面手动授权，否则功能无法正常使用！")
                        .setPositiveButton("设置")
                        .show();
                } else {
                    if (action != null) {
                        action.onDenied("permission denied");
                    }
                }
            }
        });
        request.rationale(new RationaleListener() {
            @Override
            public void showRequestPermissionRationale(int requestCode, final Rationale rationale) {
                // 自定义对话框。
                AlertDialog.newBuilder(activity)
                    .setTitle("授权已被拒绝")
                    .setMessage("您已经拒绝过授权此权限，没有此权限功能无法正常使用，赶快授权此权限给我们！")
                    .setPositiveButton("授权", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                            rationale.resume();
                        }
                    })
                    .setNegativeButton("拒绝", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                            rationale.cancel();
                        }
                    }).show();
            }
        });
        request.start();

    }
}
