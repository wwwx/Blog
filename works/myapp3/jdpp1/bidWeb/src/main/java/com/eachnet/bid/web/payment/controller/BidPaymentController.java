package com.eachnet.bid.web.payment.controller;

import com.eachnet.bid.web.common.constant.ErrorCode;
import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.common.util.CookieUtil;
import com.eachnet.bid.web.order.constants.BidOrderConstant;
import com.eachnet.bid.web.payment.param.request.BidDepositParam;
import com.eachnet.bid.web.payment.service.BidPaymentService;
import com.eachnet.bid.web.user.param.response.BidUserInfoDto;
import com.ule.cachecloud.utils.CacheCloudClientUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/payment")
public class BidPaymentController {

    private static final Logger logger = LoggerFactory.getLogger(BidPaymentController.class);

    @Autowired
    private BidPaymentService paymentService;

    @RequestMapping("checkout")
    void redirectToCahier(HttpServletResponse response) {
        try {
            response.sendRedirect(getFakePayUrl());
        } catch (Exception e) {
            logger.error("跳转失败", e);
        }
    }

    @RequestMapping("pay/deposit")
    void payDeposit(@RequestBody BidDepositParam depositParam, HttpServletRequest request, HttpServletResponse response) throws CommonException {
        logger.info("param:", depositParam);
        BidUserInfoDto userInfo = CookieUtil.getUserInfo(request);
        if (userInfo == null) {
            throw new CommonException(ErrorCode.NO_USER_FOUND);
        }
        depositParam.setUserOnlyid(Integer.parseInt(userInfo.getUsrOnlyId()));
        depositParam.setUserName(userInfo.getUsrNameCn());
        OperationResult result = paymentService.payDeposit(depositParam);
        logger.info("result", result);
        redirectToCahier(response);
    }

    private static String getFakePayUrl() {
        String fakePayUrl = null;
        try {
            fakePayUrl = CacheCloudClientUtil.getString(BidOrderConstant.FAKE_PAY_URL);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        if(StringUtils.isEmpty(fakePayUrl)) {
            fakePayUrl = "https://pay.beta.ule.com/cashier/pay/order-pay!index.do?reqNo=100016282018020121532385700324&payReqNo=20180201215323657035";
        }
        return fakePayUrl;
    }
}
