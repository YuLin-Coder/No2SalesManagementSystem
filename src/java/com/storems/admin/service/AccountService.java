package com.storems.admin.service;


import com.storems.admin.entity.Account;

import java.util.List;
import java.util.Map;

public interface AccountService {
	public Account login(Account account);
    public void batchDelete(String id);
    public Account findById(String id);
    public void save(Account account);
    public void update(Account account);

    List<Map> findAccountPage(Map map);
    int  findAccountPageCount(Map map);

}
