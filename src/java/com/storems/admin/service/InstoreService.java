package com.storems.admin.service;


import com.storems.admin.entity.Atstore;
import com.storems.admin.entity.Instore;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface InstoreService {

    public void batchDelete(@Param("id") String id);
    public Instore findById(@Param("id") String id);
    public void save(Instore instore);
    public void update(Instore instore);

    List<Map> findInstorePage(Map map);
    int  findInstorePageCount(Map map);

    List<Instore> statisticalByParam(Map map);
}
