package com.storems.admin.action;

import com.storems.admin.entity.Partner;
import com.storems.admin.service.PartnerService;
import com.storems.admin.utils.ResultUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Controller
@RequestMapping("partner")
public class PartnerAction  {
	private static Logger log = Logger.getLogger(PartnerAction.class);
	private static final long serialVersionUID = 607187668026853711L;


	@Autowired
	private PartnerService partnerService;


	/**
	 * 用户管理首页action
	 */
    @RequestMapping("/Partner_providerIndex.action")
	public String providerIndex() {
		return "partner/provider.jsp";
	}

    @RequestMapping("/Partner_consumerIndex.action")
	public String consumerIndex() {
		return "partner/consumer.jsp";
	}


	/**
	 * 根据ID数组批量删除
	 */
    @RequestMapping("/Partner_deleteByIds.action")
    @ResponseBody
	public ResultUtil deleteByIds(String relationId) {
		System.out.println("根据irelationId删除记录,relationId:" + relationId);
		partnerService.batchDelete(relationId);
        return ResultUtil.success("成功删除[<font color=red> 1 </font>]条数据!");
	}

	/**
	 * 根据ID获取用户对象
	 */
    @RequestMapping("/Partner_getById.action")
    @ResponseBody
	public ResultUtil getById(String relationId) {
		Partner partner = partnerService.findById(relationId);
        return ResultUtil.success( partner);
	}



	/**
	 * 分页查询
	 */
    @RequestMapping("/Partner_pagelist.action")
    @ResponseBody
	private ResultUtil pagelistByType(int currPage,String type) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);

        List<Map> accountList= partnerService.findPartnerPage(map);
        int count = partnerService.findPartnerPageCount(map);


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

	/*
	 *获取供货商列表
	 */
    @RequestMapping("/Partner_listProvider.action")
    @ResponseBody
	public ResultUtil listProvider(int currPage) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);
        map.put("type","provider");
        List<Map> accountList= partnerService.findPartnerPage(map);
        int count = partnerService.findPartnerPageCount(map);


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


    /*
     *获取客户 列表
     */
    @RequestMapping("/Partner_listConsumer.action")
    @ResponseBody
	public ResultUtil listConsumer(int currPage) {
        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);
        map.put("type","consumer");
        List<Map> accountList= partnerService.findPartnerPage(map);
        int count = partnerService.findPartnerPageCount(map);


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



    @RequestMapping("/Partner_save.action")
    @ResponseBody
	public ResultUtil save(String paramString) {
		// 0:type 1:name 2:property 3:联系人 4:联系电话 5:办公电话 6:地址 7:备注 8:id
		// paramString:provider,红旗连锁,超市,曾成顺,13880074478,028-88888888,成都市总府路,好大的超市啊啊啊啊啊啊,
		System.out.println("paramString:" + paramString);
		String[] param = paramString.split(",");
		String partnerId = "";
		if (param.length == 9) {
			partnerId = param[8];
		}
		System.out.println(partnerId);
        Partner partner = null;
		if (StringUtils.isEmpty(partnerId)) {
			partner = new Partner();
		} else {
			partner = partnerService.findById(partnerId);
		}
		// 为对象添加属性
		partner.setType(param[0]);
		partner.setName(param[1]);
		partner.setProperty(param[2]);
		partner.setLinkMan(param[3]);
		partner.setLinkPhone(param[4]);
		partner.setTelphone(param[5]);
		partner.setAddress(param[6]);
		partner.setNote(param[7]);

		if (StringUtils.isEmpty(partnerId)) {
            partner.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
			partnerService.save(partner);
		} else {
			partnerService.update(partner);
		}
        return ResultUtil.success( "数据保存成功");
	}

	}
