package com.eachnet.bid.web.common.util;

import com.eachnet.bid.web.user.param.response.BidUserInfoDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Created by calix on 18-1-19.
 * 配置拦截器
 */

@Configuration
public class RequestAdapter extends WebMvcConfigurerAdapter {

    private static final Logger logger = LoggerFactory.getLogger(RequestAdapter.class);

    //当前登陆用户
    public static final ThreadLocal<BidUserInfoDto> CURRENT_USER = new ThreadLocal<>();

    private static final ThreadLocal<Long> START_TIME = new ThreadLocal<>();
    private static final AtomicLong ID = new AtomicLong();

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestInterceptor());
    }

    private static class RequestInterceptor implements HandlerInterceptor {

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
            long currentTime = System.currentTimeMillis();
            //设置起始时间
            START_TIME.set(currentTime);
            //增加日志追踪码
            MDC.put("LOG_ID", currentTime + "_" + ID.getAndIncrement());
            if ("/bidWeb/error".equals(request.getRequestURI())) {
                return false;
            }
            if ("/bidWeb/user/login".equals(request.getRequestURI())) {
                return true;
            }
            //验证登陆信息
            if (!validUserInfo(request)) {
                response.sendRedirect("/bidWeb/b_user/login.html");
                return false;
            }
            return true;
        }

        @Override
        public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) {
            //打印耗时
            logger.info("cost:{}", (System.currentTimeMillis() - START_TIME.get()));
            START_TIME.remove();
            CURRENT_USER.remove();
        }

        @Override
        public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) {
        }

        /**
         * 验证用户登陆信息
         */
        private static boolean validUserInfo(HttpServletRequest request) {
            BidUserInfoDto userInfo = CookieUtil.getUserInfo(request);
            if (userInfo == null) {
                return false;
            }
            CURRENT_USER.set(userInfo);
            return true;
        }
    }
}
