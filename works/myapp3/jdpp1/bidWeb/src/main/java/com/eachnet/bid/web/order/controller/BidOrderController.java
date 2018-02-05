package com.eachnet.bid.web.order.controller;

import com.eachnet.bid.web.common.constant.ErrorCode;
import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.common.util.CookieUtil;
import com.eachnet.bid.web.common.util.RequestAdapter;
import com.eachnet.bid.web.order.param.request.BidOrderParam;
import com.eachnet.bid.web.order.param.request.BidOrderSimplParam;
import com.eachnet.bid.web.order.service.BidOrderService;
import com.eachnet.bid.web.order.util.DataValidation;
import com.eachnet.bid.web.user.param.response.BidUserInfoDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/order")
public class BidOrderController {

    private static final Logger logger = LoggerFactory.getLogger(BidOrderController.class);

    @Autowired
    private BidOrderService orderService;

    /**
     * 增加竞拍记录
     *
     * @param recordDto 竞拍数据
     */
    @RequestMapping(path = "add", method = RequestMethod.POST)
    @ResponseBody
    OperationResult addOrder(@RequestBody BidOrderParam recordDto, HttpServletRequest request) throws CommonException {
        logger.info("biding record:{}", recordDto.toString());
        DataValidation.assertValid(recordDto);
        BidUserInfoDto userInfo = RequestAdapter.CURRENT_USER.get();
        recordDto.setBuyerOnlyid(Integer.parseInt(userInfo.getUsrOnlyId()));
        recordDto.setBuyerName(userInfo.getUsrNameCn());
//        recordDto.setBuyerIpAddr(userInfo.get);
        orderService.addOrder(recordDto);
        OperationResult result = new OperationResult();
        logger.info("operation result:{}", result);
        return result;
    }

    @RequestMapping(path = "get/{id}", method = RequestMethod.GET)
    @ResponseBody
    OperationResult getOrder(@PathVariable("id") Integer id) throws CommonException {
        logger.info("order id:{}", id);
        if (id == null) {
            throw new CommonException(ErrorCode.PARAM_ERROR);
        }
        String recordDto = orderService.getById(id);
        OperationResult result = new OperationResult(recordDto);
        logger.info("operation result:{}", result);
        return result;
    }

    @RequestMapping(path = "page", produces = "application/json")
    @ResponseBody
    OperationResult findOrderPage(BidOrderSimplParam orderParam, HttpServletRequest request) throws CommonException {
        logger.info("param {}", orderParam.toString());
        if (orderParam.getPageNum() == null || orderParam.getPageSize() == null) {
            return new OperationResult("need page info");
        }
        if (orderParam.getPageSize() > 50) {
            orderParam.setPageSize(20);
        }
        BidUserInfoDto userInfo = RequestAdapter.CURRENT_USER.get();
        orderParam.setBuyerOnlyid(Integer.parseInt(userInfo.getUsrOnlyId()));
        String page = orderService.findOrderPage(orderParam);
        OperationResult result = new OperationResult(page);
        logger.debug("operation result:{}", result);
        return result;
    }
}
