package com.eachnet.bid.web.order.util;

import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.common.constant.ErrorCode;

public class DataValidation {

    public static ErrorCode check(Object data) {

        return null;
    }

    public static void assertValid(Object data) throws CommonException {
        if (true) {
            return;
        }
        ErrorCode errorCode = ErrorCode.SYSTEM_ERROR;
        if (errorCode != null) {
            throw new CommonException(errorCode.desc(), errorCode.desc());
        }
    }
}
