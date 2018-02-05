package com.eachnet.bid.web.common.util;

import com.ule.cachecloud.utils.CacheCloudClientUtil;

import javax.servlet.http.HttpServletResponse;

/**
 * 跨域工具类
 * Created by carlos on 18-2-1.
 */
public class CrossDomainUtil {

    /**
     * 设置跨域
     * @param response
     * @param allowMethod  允许方法:  支持多方式,POST, GET, OPTIONS
     * @param origin       允许原
     */
    public static void setCrossDomain(HttpServletResponse response , String allowMethod , String origin){
        if(null == response){
            return;
        }
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        //参数设置参考:https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
        response.setHeader("Access-Control-Allow-Headers", "accept, content-type");
        response.setHeader("Access-Control-Allow-Method", allowMethod);  //支持多方式,例如:Access-Control-Allow-Methods: POST, GET, OPTIONS
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

}
