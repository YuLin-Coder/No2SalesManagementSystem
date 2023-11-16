package com.storems.admin.action;


import com.storems.admin.entity.Atstore;
import com.storems.admin.entity.Goods;
import com.storems.admin.service.AtstoreService;
import com.storems.admin.service.GoodsService;
import com.storems.admin.utils.ResultUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping("atstore")
public class AtstoreAction {
	private static Logger log = Logger.getLogger(AtstoreAction.class);
	private static final long serialVersionUID = 607187668026853711L;


	@Autowired
	private AtstoreService atstoreService;


	/**
	 * 库存管理首页action
	 */
    @RequestMapping("/Atstore_atstoreIndex.action")
	public String atstoreIndex() {
		return "atstore/atstore.jsp";
	}



	/**
	 * 根据ID数组批量删除
	 */
    @RequestMapping("/Atstore_deleteByIds.action")
    @ResponseBody
	public ResultUtil deleteByIds(String relationId) {
		System.out.println("根据relationId删除记录,relationId:" + relationId);
		atstoreService.batchDelete(relationId);
        return ResultUtil.success("成功删除[<font color=red> 1 </font>]条数据!");
    }

	/**
	 * 根据ID获取用户对象
	 */
    @RequestMapping("/Atstore_getById.action")
    @ResponseBody
	public ResultUtil getById(String relationId) {
        Atstore atstore = atstoreService.findById(relationId);
        return ResultUtil.success( atstore);
    }



	/**
	 * 分页查询
	 */
    @RequestMapping("/Atstore_pagelist.action")
    @ResponseBody
	public ResultUtil pagelist(int currPage) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);

        List<Map> accountList= atstoreService.findAtstorePage(map);
        int count = atstoreService.findAtstorePageCount(map);


        Map result=new HashMap();
        result.put("data",accountList);
        result.put("resultCount",count);
        if(count%10>0){
            result.put("pageCount",count/10+1);
        }else{
            result.put("pageCount",count/10);
        }
        result.put("currentPage",currPage);
        return ResultUtil.success( result);
	}


    @RequestMapping("/Atstore_save.action")
    @ResponseBody
	public ResultUtil save(String paramString) {
		System.out.println("paramString:" + paramString);
		String[] param = paramString.split(",");
		String atstoreId = "";
		if (param.length == 12) {
			atstoreId = param[11];
		}
		System.out.println(atstoreId);
        Atstore atstore=null;
		if (StringUtils.isEmpty(atstoreId)) {
			atstore = new Atstore();
		} else {
			atstore = atstoreService.findById(param[11]);
		}
		if (StringUtils.isEmpty(atstoreId)) {
            atstore.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
            atstoreService.save(atstore);
		} else {
			atstoreService.update(atstore);
		}
        return ResultUtil.success( "数据保存成功");
    }

	}
