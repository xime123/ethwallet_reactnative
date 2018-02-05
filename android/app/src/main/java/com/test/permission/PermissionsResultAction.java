package com.test.permission;

/**
 * Created by 徐敏 on 2017/8/19.
 */

public interface PermissionsResultAction {
    void onGranted();
    void onDenied(String permission);
}
