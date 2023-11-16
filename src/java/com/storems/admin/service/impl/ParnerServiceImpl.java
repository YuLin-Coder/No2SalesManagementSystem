package com.storems.admin.service.impl;


import com.storems.admin.dao.PartnerDao;
import com.storems.admin.entity.Partner;
import com.storems.admin.service.PartnerService;
import com.zcs.util.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ParnerServiceImpl implements PartnerService {
    @Autowired
    private PartnerDao partnerDao;

    @Override
    public void batchDelete(String id) {
        partnerDao.batchDelete(id);
    }
    @Override
    public Partner findById(String id) {
        return partnerDao.findById(id);
    }

    @Override
    public void save(Partner partner) {
        partnerDao.save(partner);
    }

    @Override
    public void update(Partner partner) {
        partnerDao.update(partner);
    }

    @Override
    public List<Map> findPartnerPage(Map map) {
        return partnerDao.findPartnerPage(map);
    }

    @Override
    public int findPartnerPageCount(Map map) {
        return partnerDao.findPartnerPageCount(map);
    }


    @Override
    public List<Partner> listByType(String type) {
        return partnerDao.listByType(type);
    }
}
