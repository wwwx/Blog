package com.eachnet.bid.web.order.param.request;

import com.eachnet.bid.web.common.dto.request.QueryParam;
import com.eachnet.bid.web.order.util.FieldLimit;

public class BidRecordParam extends QueryParam {

    @FieldLimit
    private Integer itemId;
    private String itemName;
    private String itemImageUrl;
    @FieldLimit
    private Double bidPrice;
    private Integer buyerOnlyid;
    private String buyerName;

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

    public Double getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(Double bidPrice) {
        this.bidPrice = bidPrice;
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

    @Override
    public String toString() {
        return "BidRecordParam{" + "itemId=" + itemId + ", itemName='" + itemName + '\'' + ", itemImageUrl='" + itemImageUrl + '\'' + ", bidPrice=" + bidPrice + ", buyerOnlyid=" + buyerOnlyid + ", buyerName='" + buyerName + '\'' + "} " + super.toString();
    }
}
