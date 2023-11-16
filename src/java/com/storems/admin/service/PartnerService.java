package com.storems.admin.service;


import com.storems.admin.entity.Partner;

import java.util.List;
import java.util.Map;

public interface PartnerService {
    public void batchDelete(String id);
    public Partner findById(String id);
    public void save(Partner partner);
    public void update(Partner partner);

    List<Map> findPartnerPage(Map map);
    int  findPartnerPageCount(Map map);
    List<Partner> listByType(String type);
}
