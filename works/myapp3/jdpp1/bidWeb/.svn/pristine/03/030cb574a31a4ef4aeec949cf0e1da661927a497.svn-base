package com.eachnet.bid.web.payment.service;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.order.param.request.BidOrderParam;
import com.eachnet.bid.web.order.param.request.BidOrderSimplParam;
import com.eachnet.bid.web.payment.param.request.BidDepositParam;
import org.omg.CORBA.INTERNAL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Service
public class BidPaymentService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${BID_SERVICE_URL}")
    private String bidServiceUrl;

    /**
     * 增加竞拍记录
     */
    @ResponseBody
    public OperationResult payDeposit(BidDepositParam depositParam) throws CommonException {
        String url = bidServiceUrl + "/deposit/pay";
        OperationResult result = restTemplate.postForObject(url, depositParam, OperationResult.class);
        if (!result.isSuccess()) {
            throw new CommonException(result.getReturnCode(), result.getReturnMsg());
        }
        return result;
    }

}
