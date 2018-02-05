package com.eachnet.bid.web.order.util;

public @interface FieldLimit {

    //最大长度
    int maxLength() default Integer.MAX_VALUE;
    //最小长度
    int minLength() default 0;
    //可为空
    boolean nullAble() default false;
}
