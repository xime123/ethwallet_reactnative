package com.test;

/**
 * Created by xumin on 2018/1/18.
 */

public class TxInfo {
    public String from;
    public String to;
    public String value;
    public String privateKey;

    @Override
    public String toString() {
        return "TxInfo{" +
            "from='" + from + '\'' +
            ", to='" + to + '\'' +
            ", value='" + value + '\'' +
            ", privateKey='" + privateKey + '\'' +
            '}';
    }
}
