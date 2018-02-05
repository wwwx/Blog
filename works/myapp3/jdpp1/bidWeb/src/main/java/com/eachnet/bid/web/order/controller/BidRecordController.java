package com.eachnet.bid.web.order.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.order.param.request.BidRecordParam;
import com.eachnet.bid.web.order.service.BidRecordService;
import com.eachnet.bid.web.order.util.DataValidation;

@RestController
@RequestMapping("/recordWeb/")
public class BidRecordController implements BaseController {

    private static final Logger logger = LoggerFactory.getLogger(BidRecordController.class);

    @Autowired
    private BidRecordService recordService;

    /**
     * 增加竞拍记录
     *
     * @param recordDto 竞拍数据
     */
    @RequestMapping(path = "add", method = RequestMethod.POST)
    @ResponseBody
    String addRecord(BidRecordParam recordDto, HttpServletRequest request,String jsoncallback) throws CommonException {
        logger.info("biding record:{}", recordDto.toString());
        DataValidation.assertValid(recordDto);
        //TODO
        recordDto.setBuyerOnlyid(222);
        OperationResult result = recordService.addRecord(recordDto);
        logger.info("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }

    @RequestMapping(path = "records/page", method = RequestMethod.POST)
    @ResponseBody
    String findRecordPage(BidRecordParam recordParam,String jsoncallback) throws CommonException {
        logger.info("param {}", recordParam.toString());
        if (recordParam.getPageNum() == null || recordParam.getPageSize() == null) {
            return responseWithCallback(jsoncallback, new OperationResult("need page info"));
        }
        if (recordParam.getPageSize() > 50) {
        	recordParam.setPageSize(20);
        }
        OperationResult result = recordService.findOrderPage(recordParam);
        logger.debug("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }

    @RequestMapping(path = "records/user/page")
    @ResponseBody
    String findUserBidPage(BidRecordParam recordParam,String jsoncallback) throws CommonException {
        logger.info("param {}", recordParam.toString());
        if (recordParam.getPageNum() == null || recordParam.getPageSize() == null) {
            return responseWithCallback(jsoncallback, new OperationResult("need page info"));
        }
        if (recordParam.getPageSize() > 50) {
            recordParam.setPageSize(20);
        }
        OperationResult result = recordService.findUserBidPage(recordParam);
        logger.debug("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }
    
    protected String responseWithCallback(String jsoncallback, Object responseData) {
		String dataJson;
		try {
			dataJson = dataToString(responseData);
		} catch (Exception ioe) {
			logger.error("data to json failed.", ioe);
			dataJson = "{\"returnCode\":\"9999\",\"returnMsg\":\"write json failed\"}";
		}
		if (StringUtils.isNotBlank(jsoncallback)) {
			dataJson = jsoncallback + "(" + dataJson + ")";
		}
		return dataJson;
	}
}
