package com.test;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.test.permission.PermisionsConstant;
import com.test.permission.PermissionsManager;
import com.test.permission.PermissionsResultAction;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "test";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        PermissionsManager.getInstance().requestPermissionsIfNecessaryForResult(this, new String[]{PermisionsConstant.WRITE_EXTERNAL_STORAGE, PermisionsConstant.READ_EXTERNAL_STORAGE,PermisionsConstant.CAMERA}, new PermissionsResultAction() {
            @Override
            public void onGranted() {

            }

            @Override
            public void onDenied(String permission) {
                finish();
            }
        });
    }
}
