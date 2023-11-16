package com.storems.admin.dao;


import com.storems.admin.entity.Account;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface AccountDao {
	public Account login(Account account);
    public void batchDelete(@Param("id") String id);
    public Account findById(@Param("id") String id);
    public void save(Account account);
    public void update(Account account);

    List<Map> findAccountPage(Map map);
    int  findAccountPageCount(Map map);
}
