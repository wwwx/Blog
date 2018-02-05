package com.eachnet.bid.web.common.dto.response;

import java.util.Collection;

public class Pagination<T> {

    private int pageNum;
    private int pageSize;
    private long total;
    private Collection<T> data;

    public Pagination(int pageNum, int pageSize, long total, Collection<T> data) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.total = total;
        this.data = data;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public Collection<T> getData() {
        return data;
    }

    public void setData(Collection<T> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Pagination{" + "pageNum=" + pageNum + ", pageSize=" + pageSize + ", total=" + total + ", data.size=" + (data == null ? 0 : data.size()) + '}';
    }
}
