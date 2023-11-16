package com.storems.admin.dao;


import com.storems.admin.entity.Partner;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface PartnerDao {
    public void batchDelete(@Param("id") String id);
    public Partner findById(@Param("id") String id);
    public void save(Partner partner);
    public void update(Partner partner);

    List<Map> findPartnerPage(Map map);
    int  findPartnerPageCount(Map map);

    List<Partner> listByType(@Param("type") String type);
}
