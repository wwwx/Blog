package com.eachnet.bid.web.order.util;

import com.eachnet.bid.web.common.constant.BidConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class CookieUtil {

    private static final Logger logger = LoggerFactory.getLogger(CookieUtil.class);

    public static Long getUserOnlyId(HttpServletRequest request) {
        String value = getCookieValue(request.getCookies(), BidConstant.GLOBAL_COOKIE_NAME_USRONLYID);
        /*
        if (!StringUtils.isEmpty(value)) {
            try {
                return Long.parseLong(value);
            } catch (NumberFormatException e) {
                logger.error("get user id error", e);
                return null;
            }
        }
        return null;
        */
        return 111L;
    }
    
    public static String getUserName(HttpServletRequest request) {
    	/*
        String value = getCookieValue(request.getCookies(), BidConstant.GLOBAL_COOKIE_NAME_USRNAME);
        if (!StringUtils.isEmpty(value)) {
            return value;
        }
        return null;
        */
    	return "zhangsan";
    }

    private static String getCookieValue(Cookie[] cookies, String name) {
        if (cookies != null && cookies.length != 0) {


            return null;
        } else {
            return null;
        }
    }
}
