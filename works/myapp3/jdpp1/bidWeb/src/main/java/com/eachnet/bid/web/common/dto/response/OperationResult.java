package com.eachnet.bid.web.common.dto.response;

/**
 * http request result
 */
public class OperationResult {

    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";

    private String returnCode;
    private String returnMsg;
    private String data;

    public OperationResult() {
        this.returnCode = SUCCESS;
    }

    public OperationResult(String data) {
        this.returnCode = SUCCESS;
        this.data = data;
    }

    public boolean isSuccess() {
        return SUCCESS.equals(this.returnCode);
    }

    public OperationResult(String returnCode, String returnMsg, String data) {
        this.returnCode = returnCode;
        this.returnMsg = returnMsg;
        this.data = data;
    }

    public OperationResult(String returnCode, String returnMsg) {
        this.returnCode = returnCode;
        this.returnMsg = returnMsg;
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMsg() {
        return returnMsg;
    }

    public void setReturnMsg(String returnMsg) {
        this.returnMsg = returnMsg;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "OperationResult{" + "returnCode='" + returnCode + '\'' + ", returnMsg='" + returnMsg + '\'' + ", data=" + data + '}';
    }
}
