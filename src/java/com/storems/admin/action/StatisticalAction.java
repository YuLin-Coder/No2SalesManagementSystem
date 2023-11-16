package com.storems.admin.action;


import com.storems.admin.entity.Instore;
import com.storems.admin.entity.Outstore;
import com.storems.admin.service.GoodsService;
import com.storems.admin.service.InstoreService;
import com.storems.admin.service.OutstoreService;
import com.storems.admin.utils.ResultUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/statistical")
public class StatisticalAction  {
	private static final long serialVersionUID = -6930243145773290898L;
	private static Logger log = Logger.getLogger(StatisticalAction.class);

	@Autowired
	private GoodsService goodsService;
    @Autowired
	private InstoreService instoreService;
    @Autowired
	private OutstoreService outstoreService;


	/**
	 * 统计管理首页action
	 */
    @RequestMapping("/Statistical_statisticalIndex.action")
	public String statisticalIndex() {
		return "account/statisticalInfo.jsp";
	}

	/**
	 * 今日盘点
	 */
    @RequestMapping("/Statistical_todayInfo.action")
    @ResponseBody
	public ResultUtil todayInfo() {
		log.info("今日盘点");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String todayStr = dateFormat.format(new Date());
		String todayStrStart = todayStr + " 00:00:00";
		String todayStrEnd = todayStr + " 23:59:59";
		Date todayStart = null;
		Date todayEnd = null;
		try {
			todayStart = dateFormat2.parse(todayStrStart);
			todayEnd = dateFormat2.parse(todayStrEnd);
		} catch (ParseException e) {
			e.printStackTrace();
		}
        Map map=new HashMap();
        map.put("startDate",todayStart);
        map.put("endDate",todayEnd);
		List<Instore> inList = this.getInList(map);
		System.out.println("in:" + inList);
		List<Outstore> outList = this.getOutList(map);
		System.out.println("out:" + outList);
		List<Object> list = new ArrayList<Object>();
		list.add(inList);
		list.add(outList);
        return ResultUtil.success(list);

    }

	/**
	 * 统计本月信息
	 */
    @RequestMapping("/Statistical_monthInfo.action")
    @ResponseBody
	public ResultUtil monthInfo() {
		log.info("统计本月");
		Calendar c = Calendar.getInstance();
		int MaxDay = c.getActualMaximum(Calendar.DAY_OF_MONTH);
		String monthHead = new SimpleDateFormat("yyyy-MM").format(new Date());
		String monthStartStr = monthHead + "-1 00:00:00";
		String monthEndStr = monthHead + "-" + MaxDay + " 23:59:59";
		Date monteStart = null;
		Date monteEnd = null;
		try {
			monteStart = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(monthStartStr);
			monteEnd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(monthEndStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
        Map map=new HashMap();
        map.put("startDate",monteStart);
        map.put("endDate",monteEnd);
		List<Instore> inList = this.getInList(map);
		System.out.println("in:" + inList);
		List<Outstore> outList = this.getOutList(map);
		System.out.println("out:" + outList);
		List<Object> list = new ArrayList<Object>();
		list.add(inList);
		list.add(outList);
        return ResultUtil.success(list);
    }

	/**
	 * 自定义统计
	 * 
	 * @throws ParseException
	 */
    @RequestMapping("/Statistical_rangeInfo.action")
    @ResponseBody
	public ResultUtil rangeInfo(String startDate ,String endDate ) throws ParseException {

		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		log.info("自定义统计");
		System.out.println(startDate);
		System.out.println(endDate);
        Date startDateStr=new Date();
        Date endDateStr=new Date();
		if (startDate == null) {
            startDateStr = sdf1.parse("1111-11-11");
		}else{
            startDateStr = sdf1.parse(startDate);
        }
		if (endDate == null) {
            endDateStr = sdf1.parse("2222-11-11");
		} else {
			String str = endDate;
			System.out.println(str);
			str += " 23:59:59";
			System.out.println(str);
            endDateStr = sdf2.parse(str);
		}
		Map map=new HashMap();
		map.put("startDate",startDateStr);
		map.put("endDate",endDateStr);
		List<Instore> inList = this.getInList(map);
		System.out.println("in:" + inList);
		List<Outstore> outList = this.getOutList(map);
		System.out.println("out:" + outList);
		List<Object> list = new ArrayList<Object>();
		list.add(inList);
		list.add(outList);
        return ResultUtil.success(list);
    }

	/**
	 * 入库列表
	 */
	private List<Instore> getInList(Map map) {
		return instoreService.statisticalByParam(map);
	}

	private List<Outstore> getOutList(Map map) {
		return outstoreService.statisticalByParam(map);
	}


}
