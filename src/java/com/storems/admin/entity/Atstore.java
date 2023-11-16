package com.storems.admin.entity;

import java.io.Serializable;


public class Atstore implements Serializable {
    private static final long serialVersionUID = -6277004683668540400L;

    private String id;// 主键
    private String relationId;// 关联入库/出库ID
    private String goodsId;// 商品ID
    private Integer amount;// 数量
    private String note;// 备注
    private String goodsName;// 商品名称
    private String unit;// 单位



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getRelationId() {
        return relationId;
    }

    public void setRelationId(String relationId) {
        this.relationId = relationId;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
