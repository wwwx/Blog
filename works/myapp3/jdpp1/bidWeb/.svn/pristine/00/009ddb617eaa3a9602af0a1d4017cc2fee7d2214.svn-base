package com.eachnet.bid.web.common.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.eachnet.bid.web.common.constant.BidConstant;
import com.eachnet.bid.web.common.constant.ErrorCode;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.user.param.response.BidUserInfoDto;
import com.ule.common.rsa.UleRsa;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * cookie 工具类
 * Created by carlos on 16-10-13.
 */
public class CookieUtil {

    private static final Logger logger = LoggerFactory.getLogger(CookieUtil.class);

    private static final String EACHNET_COOKIE = "eachnet_cookie";

    /**
     * 从cookie中获取用户信息
     */
    public static BidUserInfoDto getUserInfo(HttpServletRequest request){
        Map<String,Cookie> cookieMap = readCookieMap(request);
        try{
            Cookie cookie = cookieMap.get(EACHNET_COOKIE);
            if (cookie == null) {
                return null;
            }
            String value = URLDecoder.decode(cookie.getValue(), "UTF-8");
            String decode = UleRsa.decode(value);
            return JSON.parseObject(decode, BidUserInfoDto.class);
        }catch (Exception e){
            logger.error(e.getMessage(), e);
        }
        return null;
    }

    /**
     * 根据name取cookie对应的cookie ， 该方法适用cookie value存明文
     * @param request
     * @param name
     * @return
     */
    public static Cookie getCookieByName(HttpServletRequest request, String name){
        Map<String,Cookie> cookieMap = readCookieMap(request);
        if(cookieMap.containsKey(name)){
            Cookie cookie = cookieMap.get(name);
            return cookie;
        }else{
            return null;
        }
    }

    /**
     * 读取 HttpRequest中所有的cookies ，转存到Map
     * @param request
     * @return
     */
    public static  Map<String,Cookie> readCookieMap(HttpServletRequest request){
        Map<String,Cookie> cookieMap = new HashMap<String,Cookie>();
        Cookie[] cookies = request.getCookies();
        logger.info("======cookies>>>>> name: [{}]", null == cookies ? 0 : cookies.length);
        if(null!=cookies){
            for(Cookie cookie : cookies){
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }

    /**
     * 添加cookie 加密
     * @param response
     * @param name
     * @param value
     * @param maxAge
     */
    public static void addCookieByEncrypt(HttpServletResponse response, String name, String value, int maxAge){
        try{
            String encryptionValue = UleRsa.encode(value);
            logger.info("======addCookieByEncrypt>>>>> name: [{}], encryptionValue:[{}]", name, encryptionValue);
            addCookie(response , name , encryptionValue , maxAge);
        }catch ( Exception e){
            e.printStackTrace();
        }
    }

    /**
     * 添加cookie 明文保存
     * @param response
     * @param name
     * @param value
     * @param maxAge
     */
    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge){
       try{
           Cookie cookie = new Cookie(name, URLEncoder.encode(value, "UTF-8"));
           cookie.setPath("/");
           cookie.setDomain(BidConstant.GLOBAL_COOKIE_DOMAIN); 
           if(maxAge>0){
               cookie.setMaxAge(maxAge*60);
           }
           response.addCookie(cookie);
       }catch (Exception e){
           e.printStackTrace();
       }
    }

    /**
     * 清空domain下的所有 cookie
     * @param response
     * @param cookieName
     * @param domain
     */
    public static void clearSessionCookie(HttpServletResponse response, String cookieName, String domain) {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setMaxAge(0);
        cookie.setDomain(domain);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    /**
     * 删除Cookie
     * @param response Response
     * @param name 名
     */
    public static void remove(HttpServletResponse response, String name) {
        addCookie(response, name, null, 0);
    }


}
