package com.eachnet.bid.web.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.order.param.request.BidRecordParam;

@Service
public class BidRecordService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${BID_SERVICE_URL}")
    private String bidServiceUrl;

    /**
     * 增加竞拍记录
     */
    public OperationResult addRecord(BidRecordParam recordDto) throws CommonException {
        OperationResult result = restTemplate.postForObject(bidServiceUrl + "/bidRecord/add", recordDto, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
        return result;
    }

    public OperationResult findOrderPage(BidRecordParam recordDto) throws CommonException {
        String url = bidServiceUrl + "/bidRecord/records/page";
        OperationResult result = restTemplate.postForObject(url, recordDto, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
        return result;
    }

    public OperationResult findUserBidPage(BidRecordParam recordDto) throws CommonException {
        String url = bidServiceUrl + "/bidRecord/records/user/page";
        OperationResult result = restTemplate.postForObject(url, recordDto, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
        return result;
    }
}
