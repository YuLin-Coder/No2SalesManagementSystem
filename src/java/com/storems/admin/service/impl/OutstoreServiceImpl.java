package com.storems.admin.service.impl;



import com.storems.admin.dao.InstoreDao;
import com.storems.admin.dao.OutstoreDao;
import com.storems.admin.entity.Instore;
import com.storems.admin.entity.Outstore;
import com.storems.admin.service.InstoreService;
import com.storems.admin.service.OutstoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OutstoreServiceImpl implements OutstoreService {
    @Autowired
    private OutstoreDao atstoreDao;

    @Override
    public void batchDelete(String id) {
        atstoreDao.batchDelete(id);
    }
    @Override
    public Outstore findById(String id) {
        return atstoreDao.findById(id);
    }

    @Override
    public void save(Outstore outstore) {
        atstoreDao.save(outstore);
    }

    @Override
    public void update(Outstore outstore) {
        atstoreDao.update(outstore);
    }

    @Override
    public List<Map> findOutstorePage(Map map) {
        return atstoreDao.findOutstorePage(map);
    }

    @Override
    public int findOutstorePageCount(Map map) {
        return atstoreDao.findOutstorePageCount(map);
    }


    @Override
    public List<Outstore> statisticalByParam(Map map) {
        return atstoreDao.statisticalByParam(map);
    }
}
