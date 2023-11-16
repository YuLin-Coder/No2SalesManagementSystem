package com.storems.admin.action;

import com.storems.admin.entity.Atstore;
import com.storems.admin.entity.Goods;
import com.storems.admin.entity.Instore;
import com.storems.admin.entity.Partner;
import com.storems.admin.service.*;
import com.storems.admin.utils.ResultUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping("instore")
public class InstoreAction {
	private static Logger log = Logger.getLogger(InstoreAction.class);
	private static final long serialVersionUID = 607187668026853711L;


	@Autowired
	private InstoreService instoreService;
    @Autowired
	private GoodsService goodsService;
    @Autowired
	private PartnerService partnerService;
    @Autowired
	private AccountService accountService;
    @Autowired
	private AtstoreService atstoreService;



	/**
	 * 用户管理首页action
	 */
    @RequestMapping("/Instore_instoreIndex.action")
	public String instoreIndex() {
		return "instore/instore.jsp";
	}

	/**
	 * 获取商品下拉列表
	 */

    @RequestMapping("/Instore_getGoodsSelect.action")
    @ResponseBody
	public ResultUtil getGoodsSelect() {
		StringBuffer sb = new StringBuffer();
		List<Goods> list = goodsService.findAll();
		sb.append("<option value='none'>-- 请选择 --</option>");
		for (Goods g : list) {
			sb.append("<option value='" + g.getId() + "'>" + g.getName() + "[" + g.getUnit() + "]</option>");
		}
        return ResultUtil.success(sb.toString());
    }

	/**
	 * 获取供应商下拉列表
	 */
    @RequestMapping("/Instore_getProviderSelect.action")
    @ResponseBody
	public ResultUtil getProviderSelect() {
		StringBuffer sb = new StringBuffer();
		List<Partner> list = partnerService.listByType("provider");
		sb.append("<option value='none'>-- 请选择 --</option>");
		for (Partner p : list) {
			sb.append("<option value='" + p.getId() + "'>" + p.getName() + "</option>");
		}
        return ResultUtil.success(sb.toString());
    }


	/**
	 * 根据ID数组批量删除
	 */

    @RequestMapping("/Instore_deleteByIds.action")
    @ResponseBody
	public ResultUtil deleteByIds(String relationId) {
		System.out.println("根据relationId删除记录,relationId:" + relationId);
		instoreService.batchDelete(relationId);
        return ResultUtil.success("成功删除[<font color=red> 1 </font>]条数据!");
    }

	/**
	 * 根据ID获取用户对象
	 */
    @RequestMapping("/Instore_getById.action")
    @ResponseBody
	public ResultUtil getById(String relationId) {
		Instore instore = instoreService.findById(relationId);
        return ResultUtil.success( instore);
    }


	/**
	 * 分页查询
	 */
    @RequestMapping("/Instore_pagelist.action")
    @ResponseBody
	public ResultUtil pagelist(int currPage) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);

        List<Map> accountList= instoreService.findInstorePage(map);
        int count = instoreService.findInstorePageCount(map);


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

    @RequestMapping("/Instore_save.action")
    @ResponseBody
	public ResultUtil save(String paramString) {
		// 0商品ID 1数量 2单价 3供应商id 4备注 5id
		// paramString:40289a813f69f88b013f6a023cfe0004,200,1,provider-2,备注信息啊,id
		System.out.println("paramString:" + paramString);
		String[] param = paramString.split(",");
		String instoreId = "";
		if (param.length == 8) {
			instoreId = param[7];
		}
		System.out.println(instoreId);
		Instore instore=null;
		if (StringUtils.isEmpty(instoreId)) {
			instore = new Instore();
		} else {
			instore = instoreService.findById(instoreId);
		}
		// 为对象设置属性
		instore.setGoodsId(param[0]);
		instore.setAmount(Integer.parseInt(param[1]));
		instore.setPrice(param[2]);
		instore.setProviderId(param[3]);
		instore.setNote(param[4]);
		instore.setGoodsName(param[5]);
		instore.setProviderName(param[6]);

		instore.setUserId("currentLoginUserId");
		instore.setUserName("管理员");

		if (StringUtils.isEmpty(instoreId)) {
			instore.setInDate(new Date());
            instore.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
            instoreService.save(instore);
		} else {
			instoreService.update(instore);
		}
		this.updateAtstoreInfo(instore);
        return ResultUtil.success( "数据保存成功");
    }

	/**
	 * 更新在库信息 1.根据关联ID获取在库信息 2.根据商品ID获取在库信息
	 */
	private void updateAtstoreInfo(Instore obj) {
		Atstore atstore = atstoreService.getByRelationId(obj.getId());
		if (atstore != null) {
			atstore.setAmount(obj.getAmount());
			atstore.setGoodsId(obj.getGoodsId());
			atstore.setRelationId(obj.getId());
			atstoreService.update(atstore);
		} else {
			atstore = atstoreService.getByGoodsId(obj.getGoodsId());
			if (atstore == null) {
				Goods goods = goodsService.findById(obj.getGoodsId());
				atstore = new Atstore();
                atstore.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
                atstore.setAmount(obj.getAmount());
				atstore.setGoodsId(obj.getGoodsId());
				atstore.setRelationId(obj.getId());
				atstore.setUnit(goods.getUnit());
				atstore.setGoodsName(goods.getName());
				atstoreService.save(atstore);
			} else {
				atstore.setAmount(atstore.getAmount() + obj.getAmount());
				atstore.setRelationId(obj.getId());
				atstoreService.update(atstore);
			}
		}
	}

	}
