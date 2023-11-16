package com.storems.admin.service;


import com.storems.admin.entity.Goods;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface GoodsService {
    public void batchDelete(@Param("id") String id);
    public Goods findById(@Param("id") String id);
    public void save(Goods goods);
    public void update(Goods goods);
    List<Map> findGoodsPage(Map map);
    int  findGoodsPageCount(Map map);
    public List<Goods> findAll();
}
