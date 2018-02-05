package com.eachnet.bid.web.order.param.request;

import com.eachnet.bid.web.common.dto.request.QueryParam;

import java.util.Date;

public class BidOrderParam extends QueryParam {

    private Integer id;
    private String escOrderid;
    private Integer itemId;
    private String itemName;
    private String itemImageUrl;
    private Integer bidRecordId;
    private Integer buyerOnlyid;
    private String buyerName;
    private String buyerIpAddr;
    private String transUsrName;
    private String transUsrPhone;
    private String transAddress;
    private String transPostalCode;
    private String transProvinceCode;
    private String transProvince;
    private String transCityCode;
    private String transCity;
    private String transAreaCode;
    private String transArea;
    private Integer orderStatus;
    private Integer orderSubstatus;
    private String channel;
    private String salesChannel;
    private Double orderAmount;
    private Double paymentAmount;
    private Double payedAmount;
    private Date buyerPayTime;
    private Date paymentStartTime;
    private Integer payType;
    private Integer paySubtype;
    private Integer orderDeleted;
    private Integer cancelType;
    private String cancelNote;
    private Date orderTerminalTime;
    private Date orderCreateTime;
    private Date updateTime;
    private String remark;
    private Integer version;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEscOrderid() {
        return escOrderid;
    }

    public void setEscOrderid(String escOrderid) {
        this.escOrderid = escOrderid;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemImageUrl() {
        return itemImageUrl;
    }

    public void setItemImageUrl(String itemImageUrl) {
        this.itemImageUrl = itemImageUrl;
    }

    public Integer getBidRecordId() {
        return bidRecordId;
    }

    public void setBidRecordId(Integer bidRecordId) {
        this.bidRecordId = bidRecordId;
    }

    public Integer getBuyerOnlyid() {
        return buyerOnlyid;
    }

    public void setBuyerOnlyid(Integer buyerOnlyid) {
        this.buyerOnlyid = buyerOnlyid;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getBuyerIpAddr() {
        return buyerIpAddr;
    }

    public void setBuyerIpAddr(String buyerIpAddr) {
        this.buyerIpAddr = buyerIpAddr;
    }

    public String getTransUsrName() {
        return transUsrName;
    }

    public void setTransUsrName(String transUsrName) {
        this.transUsrName = transUsrName;
    }

    public String getTransUsrPhone() {
        return transUsrPhone;
    }

    public void setTransUsrPhone(String transUsrPhone) {
        this.transUsrPhone = transUsrPhone;
    }

    public String getTransAddress() {
        return transAddress;
    }

    public void setTransAddress(String transAddress) {
        this.transAddress = transAddress;
    }

    public String getTransPostalCode() {
        return transPostalCode;
    }

    public void setTransPostalCode(String transPostalCode) {
        this.transPostalCode = transPostalCode;
    }

    public String getTransProvinceCode() {
        return transProvinceCode;
    }

    public void setTransProvinceCode(String transProvinceCode) {
        this.transProvinceCode = transProvinceCode;
    }

    public String getTransProvince() {
        return transProvince;
    }

    public void setTransProvince(String transProvince) {
        this.transProvince = transProvince;
    }

    public String getTransCityCode() {
        return transCityCode;
    }

    public void setTransCityCode(String transCityCode) {
        this.transCityCode = transCityCode;
    }

    public String getTransCity() {
        return transCity;
    }

    public void setTransCity(String transCity) {
        this.transCity = transCity;
    }

    public String getTransAreaCode() {
        return transAreaCode;
    }

    public void setTransAreaCode(String transAreaCode) {
        this.transAreaCode = transAreaCode;
    }

    public String getTransArea() {
        return transArea;
    }

    public void setTransArea(String transArea) {
        this.transArea = transArea;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Integer getOrderSubstatus() {
        return orderSubstatus;
    }

    public void setOrderSubstatus(Integer orderSubstatus) {
        this.orderSubstatus = orderSubstatus;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getSalesChannel() {
        return salesChannel;
    }

    public void setSalesChannel(String salesChannel) {
        this.salesChannel = salesChannel;
    }

    public Double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }

    public Double getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(Double paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public Double getPayedAmount() {
        return payedAmount;
    }

    public void setPayedAmount(Double payedAmount) {
        this.payedAmount = payedAmount;
    }

    public Date getBuyerPayTime() {
        return buyerPayTime;
    }

    public void setBuyerPayTime(Date buyerPayTime) {
        this.buyerPayTime = buyerPayTime;
    }

    public Date getPaymentStartTime() {
        return paymentStartTime;
    }

    public void setPaymentStartTime(Date paymentStartTime) {
        this.paymentStartTime = paymentStartTime;
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    public Integer getPaySubtype() {
        return paySubtype;
    }

    public void setPaySubtype(Integer paySubtype) {
        this.paySubtype = paySubtype;
    }

    public Integer getOrderDeleted() {
        return orderDeleted;
    }

    public void setOrderDeleted(Integer orderDeleted) {
        this.orderDeleted = orderDeleted;
    }

    public Integer getCancelType() {
        return cancelType;
    }

    public void setCancelType(Integer cancelType) {
        this.cancelType = cancelType;
    }

    public String getCancelNote() {
        return cancelNote;
    }

    public void setCancelNote(String cancelNote) {
        this.cancelNote = cancelNote;
    }

    public Date getOrderTerminalTime() {
        return orderTerminalTime;
    }

    public void setOrderTerminalTime(Date orderTerminalTime) {
        this.orderTerminalTime = orderTerminalTime;
    }

    public Date getOrderCreateTime() {
        return orderCreateTime;
    }

    public void setOrderCreateTime(Date orderCreateTime) {
        this.orderCreateTime = orderCreateTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
