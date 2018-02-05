package com.eachnet.bid.web.item.constants;

/**
 * 竞拍类型
 * Created by carlos on 18-1-29.
 */
public enum BidType {

    Bid ( 0 , "竞拍"),
    Price (1 , "一口价");

    private Integer value;
    private String desc;


    BidType(Integer value , String desc){
        this.value = value;
        this.desc = desc;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
