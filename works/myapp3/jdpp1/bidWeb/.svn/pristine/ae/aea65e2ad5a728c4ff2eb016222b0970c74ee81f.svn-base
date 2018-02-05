package com.eachnet.bid.web.common.constant;

public enum ErrorCode {

    PARAM_ERROR("1000", "参数错误"),
    NO_USER_FOUND("1001", "用户信息未找到"),
    //...
    NO_BUYER("1001","卖家不能参与竞拍"),
    SYSTEM_ERROR("9999", "系统异常")
    ;

    private String code;
    private String desc;

    ErrorCode(String value, String desc) {
        this.code = value;
        this.desc = desc;
    }

    public String code() {
        return code;
    }

    public String desc() {
        return desc;
    }
}
