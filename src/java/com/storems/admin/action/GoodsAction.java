package com.storems.admin.action;


import com.storems.admin.entity.Goods;
import com.storems.admin.entity.Partner;
import com.storems.admin.service.GoodsService;
import com.storems.admin.utils.DateFormatUtils;
import com.storems.admin.utils.ResultUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping("goods")
public class GoodsAction {
	private static Logger log = Logger.getLogger(GoodsAction.class);
	private static final long serialVersionUID = 607187668026853711L;


	@Autowired
	private GoodsService goodsService;


	/**
	 * 用户管理首页action
	 */
    @RequestMapping("/Goods_goodsIndex.action")
	public String goodsIndex() {
		return "goods/goods.jsp";
	}


	/**
	 * 根据ID数组批量删除
	 */
    @RequestMapping("/Goods_deleteByIds.action")
    @ResponseBody
	public ResultUtil deleteByIds(String relationId) {
		System.out.println("根据relationId删除记录,relationId:" + relationId);
		goodsService.batchDelete(relationId);
        return ResultUtil.success("成功删除[<font color=red> 1 </font>]条数据!");
    }

	/**
	 * 根据ID获取用户对象
	 */
    @RequestMapping("/Goods_getById.action")
    @ResponseBody
	public ResultUtil getById(String relationId) {
        Goods goods = goodsService.findById(relationId);
        return ResultUtil.success( goods);
    }

	
	/**
	 * 分页查询
	 */
    @RequestMapping("/Goods_pagelist.action")
    @ResponseBody
	public ResultUtil pagelist(int currPage) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);

        List<Map> accountList= goodsService.findGoodsPage(map);
        int count = goodsService.findGoodsPageCount(map);


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

    @RequestMapping("/Goods_save.action")
    @ResponseBody
	public ResultUtil save(String paramString) {
		// 0名称 1编码 2类型 3规格 4单位 5单价 6生产日期 7保质期 8备注 9ID
		
		System.out.println("paramString:" + paramString);
		String[] param = paramString.split(",");
		String goodsId = "";
		if (param.length == 10) {
			goodsId = param[9];
		}
        Goods goods = null;
		System.out.println(goodsId);
		if (StringUtils.isEmpty(goodsId)) {
			goods = new Goods();
		} else {
			goods = goodsService.findById(param[9]);
		}
		// 为对象填充属性
		goods.setName(param[0]);
		goods.setCode(param[1]);
		goods.setType(param[2]);
		goods.setSpecification(param[3]);
		goods.setUnit(param[4]);
		goods.setPrice(param[5]);
		goods.setProductionDate(DateFormatUtils.strToDate(param[6]));
		goods.setShelfLife(param[7]);
		goods.setNote(param[8]);

		if (StringUtils.isEmpty(goodsId)) {
            goods.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
            goodsService.save(goods);
		} else {
			goodsService.update(goods);
		}
        return ResultUtil.success( "数据保存成功");
	}
}
