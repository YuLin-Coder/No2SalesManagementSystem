package com.storems.admin.service;


import com.storems.admin.entity.Atstore;
import com.storems.admin.entity.Goods;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface AtstoreService {

    public void batchDelete(@Param("id") String id);
    public Atstore findById(@Param("id") String id);
    public void save(Atstore atstore);
    public void update(Atstore atstore);

    List<Map> findAtstorePage(Map map);
    int  findAtstorePageCount(Map map);

    public Atstore  getByRelationId(@Param("relationId") String relationId);
    public Atstore  getByGoodsId(@Param("goodsId") String goodsId);
}
