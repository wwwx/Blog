package com.eachnet.bid.web.order.param.response;

import java.sql.Timestamp;

public class BidRecordDto {

    private Integer id;
    private Integer itemId;
    private String itemName;
    private String itemImageUrl;
    private Integer buyerOnlyid;
    private String buyerName;
    private Double bidPrice;
    private Timestamp createTime;
    private Integer recordStatus;
    private String escOrderid;
    private Double orderAmount;
    private Integer recordDeleted;
    private Integer version;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Double getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(Double bidPrice) {
        this.bidPrice = bidPrice;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Integer getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Integer recordStatus) {
        this.recordStatus = recordStatus;
    }

    public String getEscOrderid() {
        return escOrderid;
    }

    public void setEscOrderid(String escOrderid) {
        this.escOrderid = escOrderid;
    }

    public Double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }

    public Integer getRecordDeleted() {
        return recordDeleted;
    }

    public void setRecordDeleted(Integer recordDeleted) {
        this.recordDeleted = recordDeleted;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "BidRecordDto{" + "id=" + id + ", itemId=" + itemId + ", itemName='" + itemName + '\'' + ", buyerOnlyid=" + buyerOnlyid + ", buyerName='" + buyerName + '\'' + ", bidPrice=" + bidPrice + ", createTime=" + createTime + ", recordStatus=" + recordStatus + ", escOrderid='" + escOrderid + '\'' + ", orderAmount=" + orderAmount + ", recordDeleted=" + recordDeleted + ", version=" + version + '}';
    }
}
