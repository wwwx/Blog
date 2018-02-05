package com.eachnet.bid.web.common.exception;

import com.eachnet.bid.web.common.constant.ErrorCode;

/**
 * Created by calix on 18-1-18.
 * 系统异常，该异常会被GlobalExceptionHandler处理
 */
public class CommonException extends Exception {

    public CommonException(ErrorCode errorCode) {
        super(errorCode.desc());
        this.code = errorCode.code();
        this.msg = errorCode.desc();
    }

    public CommonException(String code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
    private String code;

    private String msg;

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
