package com.eachnet.bid.web.user.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.order.param.request.BidRecordParam;
import com.eachnet.bid.web.user.param.request.BidUserParam;
import com.eachnet.bid.web.user.service.BidUserService;
import com.ule.web.util.Tools;

@RestController
@RequestMapping("/user/")
public class BidUserController {
	
	
	  private static final Logger logger = LoggerFactory.getLogger(BidUserController.class);

	    @Autowired
	    private BidUserService userService;

	    @RequestMapping(path = "login", method = RequestMethod.POST)
	    @ResponseBody
	    Map<String, Object> userLogin(@RequestBody BidUserParam userDto, HttpServletRequest request,HttpServletResponse response) throws CommonException {
	        
	    	String remoteAddr = getIP(request);
	    	userDto.setLoginIp(remoteAddr);
	    	Map<String, Object> data= new HashMap<String, Object>();
	    	System.out.println("===>>BidUserParam:"+userDto.getLoginName()+":"+userDto.getPassword()+":"+remoteAddr);
	    	String reg = "[\\w]+@[\\w]+.[\\w]+";
			 //判断是否匹配邮箱的正则表达式。
			if(userDto.getLoginName().matches(reg)) {
				 data = userService.loginEmailVerify(userDto,response);
			}else {
				 data = userService.loginAccountVerify(userDto,response);
			}
	        logger.info("BidUserController userLogin:{}", data);
	        return data;
	    }
	    
	    
	    private String getIP(HttpServletRequest request) {
			logger.info("BidUserController getIP.");
			try {
				return Tools.getIpAddr(request);
			} catch (Exception e) {
				logger.error("BidUserController getIP. Exception", e);
		    } 
			return null;
		}

}
