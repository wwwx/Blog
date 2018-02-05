package com.eachnet.bid.web.item.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.eachnet.bid.web.common.util.CrossDomainUtil;
import com.google.common.base.Strings;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.item.constants.ItemStatus;
import com.eachnet.bid.web.item.param.request.BidItemParam;
import com.eachnet.bid.web.item.service.BidItemService;
import com.eachnet.bid.web.order.controller.BaseController;
import com.eachnet.bid.web.order.util.CookieUtil;
import com.eachnet.bid.web.payment.param.request.BidDepositParam;

@RestController
@RequestMapping("/itemWeb/")
public class BidItemController implements BaseController{

	private static final Logger logger = LoggerFactory.getLogger(BidItemController.class);
	
	@Autowired
	private BidItemService itemService;

    @Value("${SYS_DEFAULT_COOKIE_DOMAIN}")
    private String crossDomainorigin;

    /**
     * 发布商品
     *
     */
    @RequestMapping(path = "save", method = RequestMethod.POST)
    @ResponseBody
    String saveItem(BidItemParam itemParam, HttpServletRequest request, String jsoncallback) throws CommonException {
        logger.info("saveItem itemParam:{}", itemParam);
        OperationResult result = new OperationResult();
        int userId = CookieUtil.getUserOnlyId(request).intValue();
        String itemDescHtml = itemParam.getDescHtml();
        if(!Strings.isNullOrEmpty(itemDescHtml)){   //商品描述html
            String url = itemService.uploadItemDetail(itemDescHtml,"item",userId);
            logger.info(" =====>>>> save item upload item desc html,item Name:{} , descHtml:{}" , itemParam.getItemName() , url);
            if(!Strings.isNullOrEmpty(url)){
                itemParam.setItemDetailUrl(url);
            }
        }
        String sellerName = CookieUtil.getUserName(request);
        itemParam.setSellerOnlyid(userId);
        itemParam.setSellerName(sellerName);
        itemParam.setStatus(ItemStatus.Trailer.getValue());
        String data  = itemService.saveItem(itemParam);
        result.setData(data);
        result.setReturnCode(OperationResult.SUCCESS);
        result.setReturnMsg("success");
        logger.info("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }
    
    /**
     * 上传商品图片
     *
     * @param recordDto 竞拍数据
     */
    @RequestMapping(path = "uploadPic", method = RequestMethod.POST)
    @ResponseBody
    String uploadPic(MultipartFile imageFile, HttpServletRequest request, HttpServletResponse response, String jsoncallback) throws CommonException {
        logger.info("item uploadPic:{}");
        int userId = CookieUtil.getUserOnlyId(request).intValue();
        String url = itemService.uploadPic(imageFile,"pic",userId);
        OperationResult result = new OperationResult();
        if (url == null) { //上传失败，无url返回
        	result.setReturnCode(OperationResult.FAIL);
        	result.setReturnMsg("上传失败");
        } else {
        	result.setReturnCode(OperationResult.SUCCESS);
        	result.setReturnMsg("上传成功");
        	result.setData(url);
		}

        CrossDomainUtil.setCrossDomain(response, RequestMethod.POST.name() , crossDomainorigin);
        logger.info("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }
    
    /**
     * 上传商品详情
     *
     * @param recordDto 竞拍数据
     */
    @RequestMapping(path = "uploadItemDetail", method = RequestMethod.POST)
    @ResponseBody
    String uploadItemDetail(String itemDetail, HttpServletRequest request, String jsoncallback) throws CommonException {
        OperationResult result = new OperationResult();
        int userId = CookieUtil.getUserOnlyId(request).intValue();
        String url = itemService.uploadItemDetail(itemDetail,"item",userId);
        if (url == null) { //上传失败，无url返回
        	result.setReturnCode(OperationResult.FAIL);
        	result.setReturnMsg("上传失败");
        } else {
        	result.setReturnCode(OperationResult.SUCCESS);
        	result.setReturnMsg("上传成功");
        	result.setData(url);
		}
        logger.info("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }
    
    /**
     * 竞拍商品查询
     *
     * @param recordDto 竞拍数据
     */
    @RequestMapping(path = "search", method = RequestMethod.POST)
    @ResponseBody
    String search(BidItemParam itemParam, HttpServletRequest request, String jsoncallback) throws CommonException {
        logger.info("search itemParam:{}", itemParam);
        OperationResult result = new OperationResult();
        String data = null;
        try {
        	data = itemService.search(itemParam);
        } catch (Exception e) {
	        logger.error("search failed",e);
	        result.setReturnCode(OperationResult.FAIL);
	        result.setReturnMsg("search failed");
        }
        result.setReturnCode(OperationResult.SUCCESS);
        result.setReturnMsg("search success");
        result.setData(data);
        logger.info("operation result:{}", result);
        return responseWithCallback(jsoncallback, result);
    }
    
    /**
     * 竞拍商品vi详情
     *
     * @param recordDto 竞拍数据
     */
    @RequestMapping(path = "detail", method = RequestMethod.GET)
    @ResponseBody
    String detail(Integer itemId, HttpServletRequest request, String jsoncallback) throws CommonException {
    	logger.info("biding itemId:{}", itemId);
        BidDepositParam param = new BidDepositParam();
        param.setItemId(itemId);
        //TODO 
        param.setUserOnlyid(222);
        OperationResult result = itemService.showItemDetail(param);
        logger.info("operation result:{}", result);
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
