package com.eachnet.bid.web.order.service;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.order.param.request.BidOrderParam;
import com.eachnet.bid.web.order.param.request.BidOrderSimplParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BidOrderService {

    private static final Logger logger = LoggerFactory.getLogger(BidOrderService.class);

    @Autowired
    private RestTemplate restTemplate;

    @Value("${BID_SERVICE_URL}")
    private String bidServiceUrl;

    /**
     * 增加竞拍记录
     */
    public void addOrder(BidOrderParam orderParam) throws CommonException {
        String url = bidServiceUrl + "/order/add";
        logger.info("======addOrder >>>>> url:{}" , url);
        OperationResult result = restTemplate.postForObject(url, orderParam, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
    }

    public String getById(Integer id) throws CommonException {
        String url = bidServiceUrl + "/order/get/" + id;
        logger.info("======getById >>>>> url:{}" , url);
        @SuppressWarnings("unchecked") OperationResult result = restTemplate.getForObject(url, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
        return result.getData();
    }

    @SuppressWarnings("unchecked")
    public String findOrderPage(BidOrderSimplParam orderParam) throws CommonException {
        String url = bidServiceUrl + "/order/page";
        logger.info("======findOrderPage >>>>> url:{}" , url);
        @SuppressWarnings("unchecked") OperationResult result = restTemplate.postForObject(url, orderParam, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
        return result.getData();
    }
}
