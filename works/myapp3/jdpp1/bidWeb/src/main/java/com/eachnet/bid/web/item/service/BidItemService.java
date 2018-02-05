package com.eachnet.bid.web.item.service;

import java.io.ByteArrayInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.item.param.request.BidItemParam;
import com.eachnet.bid.web.item.util.UploadFileUtil;
import com.eachnet.bid.web.payment.param.request.BidDepositParam;

@Service
public class BidItemService {

	private static final Logger logger = LoggerFactory.getLogger(BidItemService.class);

	@Autowired
	private RestTemplate restTemplate;

	@Value("${BID_SERVICE_URL}")
	private String bidServiceUrl;

	@Value("${UPLOAD_URL}")
	private String uploadUrl;

	public String saveItem(BidItemParam itemParam) throws CommonException {
		String url = bidServiceUrl + "/bidItem/saveItem";
        logger.info("======saveItem >>>>> url:{}" , url);
		OperationResult result = restTemplate.postForObject(url, itemParam, OperationResult.class);
		if (!result.isSuccess()) {
			throw new CommonException(result.getReturnCode(), result.getReturnMsg());
		}
		return result.getData();
	}

	/**
	 * 上传图片
	 * 
	 * @param imageFile
	 * @param bussinessUnit
	 * @param userId
	 * @return
	 */
	public String uploadPic(MultipartFile imageFile, String bussinessUnit, int userId) {
		String filename = imageFile.getOriginalFilename();
		String fileType = filename.substring(filename.lastIndexOf("."), filename.length());
		String fullName = "/user_" + userId + "/product/prd#/*"+fileType;
		String url = null;
		try {
			url = UploadFileUtil.uploadFile(uploadUrl, bussinessUnit, fullName, null, imageFile
			        .getInputStream(), true);
		} catch (Exception e) {
			logger.error("uploadPic failed", e);
		}
		return url;
	}

	/**
	 * 上传详情
	 * 
	 * @param itemDetail
	 * @param bussinessUnit
	 * @param userId
	 * @return
	 */
	public String uploadItemDetail(String itemDetail, String bussinessUnit, int userId) {
		String fullName = "/user_" + userId + "/desc#/*.html";
		String url = null;
		try {
			ByteArrayInputStream tInputStringStream = new ByteArrayInputStream(itemDetail.getBytes());
			url = UploadFileUtil.uploadFile(uploadUrl, bussinessUnit, fullName, null, tInputStringStream, true);
		} catch (Exception e) {
			logger.error("uploadPic failed", e);
		}
		return url;
	}

	/**
	 * 展示商品vi页
	 * 
	 * @param itemId
	 * @return
	 * @throws CommonException
	 */
	public OperationResult showItemDetail(BidDepositParam param) throws CommonException {
		String url = bidServiceUrl + "/bidItem/detail";
        logger.info("======showItemDetail >>>>> url:{}" , url);
		OperationResult result = restTemplate.postForObject(url, param, OperationResult.class);
		if (!result.isSuccess()) {
			throw new CommonException(result.getReturnCode(), result.getReturnMsg());
		}
		return result;
	}

	public String search(BidItemParam itemParam) throws CommonException {
		String url = bidServiceUrl + "/bidItem/queryByParam";
        logger.info("======search >>>>> url:{}" , url);
		OperationResult result = restTemplate.postForObject(url, itemParam, OperationResult.class);
		if (!result.isSuccess()) {
			throw new CommonException(result.getReturnCode(), result.getReturnMsg());
		}
		return result.getData();
	}
}
