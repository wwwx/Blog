package com.eachnet.bid.web.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * Created by calix on 18-1-19.
 * 服务启动初始化
 */

@Component
public class ServerInitialization implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ServerInitialization.class);

    @Override
    public void run(String... args) {
        logger.info("================服务初始化开始================");
        try {
            initParameter();
            verifyResources();
            logger.info("================服务初始化结束================");
        } catch (Exception e) {
            logger.error("！！！！！！服务初始化异常！！！！！", e);
        }
    }

    /**
     * 初始化服务参数
     */
    private void initParameter() throws Exception {
        logger.info("加载服务参数...");
    }

    /**
     * 检查网络、数据库等资源是否有效
     */
    private void verifyResources() throws Exception {
        logger.info("验证服务资源...");
    }
}
