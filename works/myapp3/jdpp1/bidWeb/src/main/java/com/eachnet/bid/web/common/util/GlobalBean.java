package com.eachnet.bid.web.common.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GlobalBean {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
