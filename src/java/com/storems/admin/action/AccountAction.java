package com.storems.admin.action;


import com.storems.admin.utils.ResultUtil;
import com.zcs.util.MD5;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.storems.admin.entity.Account;
import com.storems.admin.service.AccountService;


import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/account")
public class AccountAction  {
	private static Logger log = Logger.getLogger(AccountAction.class);//使用指定类初始化这个class
	private static final long serialVersionUID = 607187668026853711L;

	@Autowired
    private AccountService accountService;


    /**
     * 用户管理首页action
     */
    @RequestMapping("/Account_accountIndex.action")
    public String accountIndex() {
        return "account/account.jsp";
    }

    @RequestMapping("/Account_logout.action")
    public String logout(HttpServletRequest request) {
        log.info("注销登录!");
        request.getSession().setAttribute("account", null);
        request.getSession().setAttribute("msg", null);
        return  "login.jsp";
    }

    @RequestMapping("/Account_login.action")
	public String login(Account account, String vcode, HttpServletRequest request) {
		String loginState = "loginFailed";
		String sessionCode = request.getSession().getAttribute("vCode").toString().toLowerCase();

		// 验证第一步:验证码验证
		if (!sessionCode.equals(vcode.toLowerCase())) {
		    request.getSession().setAttribute("msg", "验证码错误!");
		}
		// 验证第二步:账号密码验证
		else {
			account = accountService.login(account);
			// 登录已成功
			if (account != null) {
				// 检查账号是否可用
				if (account.getState().equals("0")) {
					log.info("该账号已被锁定,请联系管理员!");
					request.getSession().setAttribute("msg", "该账号已被锁定,请联系管理员!");
				} else {
					request.getSession().setAttribute("account", account);
					request.getSession().setAttribute("msg", "登录成功!");
					loginState = "loginSuccess";
					return "/home/Home_index.jsp";
				}
			} else {
				request.getSession().setAttribute("msg", "账号或者密码错误!");
			}
		}
		return  "login.jsp";
	}

    /**
     * 根据ID数组批量删除
     */
    @RequestMapping("/Account_deleteByIds.action")
    @ResponseBody
    public ResultUtil deleteByIds(String relationId) {
        log.info("根据id删除记录,id:" + relationId);

        accountService.batchDelete(relationId);
        return ResultUtil.success("成功删除[<font color=red> 1 </font>]条数据!");
    }

    /**
     * 根据ID获取用户对象
     */
    @RequestMapping("/Account_getById.action")
    @ResponseBody
    public ResultUtil getById(String relationId) {
       Account account = accountService.findById(relationId);
        return ResultUtil.success( account);
    }

    /**
     * 分页查询
     */
    @RequestMapping("/Account_pagelist.action")
    @ResponseBody
    public ResultUtil pagelist(int currPage) {

        int begin=(currPage-1)*10;
        int pageSize=10;
        Map map=new HashMap();
        map.put("begin",begin);
        map.put("pageSize",pageSize);

       List<Map> accountList= accountService.findAccountPage(map);
       int count = accountService.findAccountPageCount(map);


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


    @RequestMapping("/Account_save.action")
    @ResponseBody
    public ResultUtil save(String paramString) {
        // 0账号 1密码 2确认密码 3真实姓名 4性别 5年龄 6身份证号 7联系电话 8地址 9角色级别 10状态
        Account account=null;
        log.info("paramString:" + paramString);
        String[] param = paramString.split(",");
        String accountId = "";
        if (param.length == 12) {
            accountId = param[11];
        }
        log.info(accountId);
        if (StringUtils.isEmpty(accountId)) {
            account = new Account();
        } else {
            account = accountService.findById(accountId);
        }
        account.setUserName(param[0]);
        account.setPassword(MD5.getMd5(param[1]));
        account.setRealName(param[3]);
        account.setSex(param[4]);
        account.setAge(Integer.parseInt(param[5]));
        account.setIdCard(param[6]);
        account.setLinkPhone(param[7]);
        account.setAddress(param[8]);
        account.setRoleLevel(param[9]);
        account.setState(param[10]);
        if (StringUtils.isEmpty(accountId)) {
            account.setId(UUID.randomUUID().toString().replace("-","").substring(0,32));
            account.setRegDate(new Date());
            accountService.save(account);
        } else {
            accountService.update(account);
        }
        return ResultUtil.success( "数据保存成功");
    }


}
