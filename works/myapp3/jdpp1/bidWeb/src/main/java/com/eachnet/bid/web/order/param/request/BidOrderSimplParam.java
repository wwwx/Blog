package com.eachnet.bid.web.order.param.request;

import com.eachnet.bid.web.common.dto.request.QueryParam;

public class BidOrderSimplParam extends QueryParam {

    private Integer id;
    private String escOrderid;
    private Integer itemId;
    private Integer bidRecordId;
    private Integer buyerOnlyid;
    private Integer orderStatus;
    private Integer orderSubstatus;
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

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
