package com.eachnet.bid.web.common.util;

import com.eachnet.bid.web.common.exception.GlobalExceptionHandler;
import com.eachnet.bid.web.order.controller.BidOrderController;
import com.eachnet.bid.web.payment.controller.BidPaymentController;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

@ControllerAdvice(basePackageClasses = {BidOrderController.class, BidPaymentController.class, GlobalExceptionHandler.class})
public class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

    public JsonpAdvice() {
        super("callback", "jsonp");
    }
}
