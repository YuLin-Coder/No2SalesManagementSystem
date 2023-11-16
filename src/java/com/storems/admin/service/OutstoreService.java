package com.storems.admin.service;


import com.storems.admin.entity.Instore;
import com.storems.admin.entity.Outstore;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface OutstoreService {

    public void batchDelete(@Param("id") String id);
    public Outstore findById(@Param("id") String id);
    public void save(Outstore outstore);
    public void update(Outstore outstore);

    List<Map> findOutstorePage(Map map);
    int  findOutstorePageCount(Map map);

    List<Outstore> statisticalByParam(Map map);
}
