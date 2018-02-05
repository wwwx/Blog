package com.eachnet.bid.web.common.exception;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by calix on 18-1-18.
 * 异常处理
 */
@RestController
@ControllerAdvice
public class GlobalExceptionHandler implements ErrorController {

    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private static final String PATH = "/error";

    @Override
    public String getErrorPath() {
        return PATH;
    }

    /**
     * 处理服务请求异常
     */
    @RequestMapping(PATH)
    void errorRequest(HttpServletRequest request) throws Exception {
        logger.info("---------------------------");
        logger.debug("检测到一次无效请求");
    }

    /**
     * 全局异常处理
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    Object exceptionHandler(Exception exception, HttpServletRequest request, HttpServletResponse response) {
        logger.error(exception.getLocalizedMessage(), exception);
        if (exception instanceof CommonException) {
            CommonException e = (CommonException) exception;
            return new OperationResult(e.getCode(), e.getMsg());
        } else {
            logger.error(exception.getLocalizedMessage(), exception);
            HttpStatus status = getStatus(request);
            return new OperationResult(status.toString(), status.getReasonPhrase());
        }
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        } catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
