package com.eachnet.bid.web.common.dto.request;

import java.util.Arrays;
import java.util.Collection;

public class Range<T> {

    private T begin;
    private T end;
    private Collection<T> all;

    Range(){}

    public Range(T begin, T end) {
        this.begin = begin;
        this.end = end;
    }

    public Range(Collection<T> all) {
        this.all = all;
    }

    public Range(T[] all) {
        this.all = Arrays.asList(all);
    }

    public T getBegin() {
        return begin;
    }

    public Range setBegin(T begin) {
        this.begin = begin;
        return this;
    }

    public T getEnd() {
        return end;
    }

    public Range setEnd(T end) {
        this.end = end;
        return this;
    }

    public Collection<T> getAll() {
        return all;
    }

    public void setAll(Collection<T> all) {
        this.all = all;
    }

    @Override
    public String toString() {
        return "Range{" + "begin=" + begin + ", end=" + end + ", all=" + all + '}';
    }
}
