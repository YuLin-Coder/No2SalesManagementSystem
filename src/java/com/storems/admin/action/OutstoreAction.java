package com.storems.admin.action;

import com.storems.admin.entity.*;
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
@RequestMapping("outstore")
public class OutstoreAction  {
	private static Logger log = Logger.getLogger(OutstoreAction.class);
	private static final long serialVersionUID = 607187668026853711L;

    @Autowired
	private OutstoreService outstoreService;
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
    @RequestMapping("/Outstore_outstoreIndex.action")
	public String outstoreIndex() {
		return "outstore/outstore.jsp";
	}

	/**
	 * 获取商品下拉列表
	 */

    @RequestMapping("/Outstore_getGoodsSelect.action")
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
	 * 获取消费者下拉列表
	 */
    @RequestMapping("/Outstore_getConsumerSelect.action")
    @ResponseBody
    public ResultUtil getProviderSelect() {
        StringBuffer sb = new StringBuffer();
        List<Partner> list = partnerService.listByType("consumer");
        sb.append("<option value='none'>-- 请选择 --</option>");
        for (Partner p : list) {
            sb.append("<option value='" + p.getId() + "'>" + p.getName() + "</option>");
        }
        return ResultUtil.success(sb.toString());
    }


	/**
	 * 根据ID数组批量删除
	 */
    @RequestMapping("/Outstore_deleteByIds.action")
    @ResponseBody
    public ResultUtil deleteByIds(String relationId) {
		System.out.println("根据relationId删除记录,relationId:" + relationId);
		outstoreService.batchDelete(relationId);
        return ResultUtil.success("成功删除[<font color=red> 1 </font>]条数据!");
    }

	/**
	 * 根据ID获取用户对象
	 */
    @RequestMapping("/Outstore_getById.action")
    @ResponseBody
    public ResultUtil getById(String relationId) {
        Outstore outStore = outstoreService.findById(relationId);
        return ResultUtil.success( outStore);
    }


	
	/**
	 * 分页查询
	 */
    @RequestMapping("/Outstore_pagelist.action")
    @ResponseBody
	public ResultUtil pagelist(int currPage) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);

        List<Map> accountList= outstoreService.findOutstorePage(map);
        int count = outstoreService.findOutstorePageCount(map);


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



    @RequestMapping("/Outstore_save.action")
    @ResponseBody
    public ResultUtil save(String paramString) {
		// 0商品ID 1数量 2单价 3供应商id 4备注 5商品名称 6消费者名称 7id
		// paramString:40289a813f69f88b013f6a023cfe0004,200,1,provider-2,备注信息啊,商品名称,消费者名称,id
		System.out.println("paramString:" + paramString);
		String[] param = paramString.split(",");
		String outstoreId = "";
		if (param.length == 8) {
			outstoreId = param[7];
		}
		System.out.println(outstoreId);
		Outstore outstore=null;
		if (StringUtils.isEmpty(outstoreId)) {
			outstore = new Outstore();
		} else {
			outstore = outstoreService.findById(outstoreId);
		}
		// 为对象设置属性
		outstore.setGoodsId(param[0]);
		outstore.setAmount(Integer.parseInt(param[1]));
		outstore.setPrice(param[2]);
		outstore.setConsumerId(param[3]);
		outstore.setNote(param[4]);
		outstore.setGoodsName(param[5]);
		outstore.setConsumerName(param[6]);

		outstore.setUserId("currentLoginUserId");
		outstore.setUserName("管理员");

		if (StringUtils.isEmpty(outstoreId)) {
			outstore.setOutDate(new Date());
            outstore.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
            outstoreService.save(outstore);
		} else {
			outstoreService.update(outstore);
		}
		this.updateAtstoreInfo(outstore);
        return ResultUtil.success( "数据保存成功");
    }

	/**
	 * 更新在库信息 1.根据关联ID获取在库信息 2.根据商品ID获取在库信息
	 */
	private void updateAtstoreInfo(Outstore obj) {
		Atstore atstore = atstoreService.getByGoodsId(obj.getGoodsId());
		if (atstore != null) {
			atstore.setAmount(atstore.getAmount() - obj.getAmount());
			atstore.setRelationId(obj.getId());
			atstoreService.update(atstore);
		}
	}

}
