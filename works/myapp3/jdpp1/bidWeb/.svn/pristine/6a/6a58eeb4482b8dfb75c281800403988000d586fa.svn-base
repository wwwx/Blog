package com.eachnet.bid.web.order.controller;

import java.util.Arrays;
import java.util.List;

import com.eachnet.bid.web.common.constant.ErrorCode;
import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.common.exception.CommonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public interface BaseController {
	List<Class> PRIMITIVES = Arrays.asList(Byte.class, Short.class, Character.class, Integer.class, Long.class, Float.class, Double.class, Boolean.class);
	ObjectMapper mapper = new ObjectMapper();
	
    default OperationResult customerResult(OperationResult result) {
        if (!OperationResult.SUCCESS.equals(result.getReturnCode())) {
            //custom error message
        }

        return result;
    }
    
    default String dataToString(Object o) throws CommonException {
        if (o == null) {
            return null;
        }
        if (o instanceof String) {
            return (String) o;
        }
        if (PRIMITIVES.contains(o.getClass())) {
            return o.toString();
        }
        try {
            return mapper.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            throw new CommonException(ErrorCode.SYSTEM_ERROR);
        }
    }
}
