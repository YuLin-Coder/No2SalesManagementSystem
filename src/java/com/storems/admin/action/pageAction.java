package com.storems.admin.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class pageAction {


    //account
    @RequestMapping("/account/account")
    public String account(){
        return "/account/account.jsp";
    }
    @RequestMapping("/account/statistical-1")
    public String statistical1(){
        return "/account/statistical-1.jsp";
    }
    @RequestMapping("/account/statistical-2")
    public String statistical2(){
        return "/account/statistical-2.jsp";
    }
    @RequestMapping("/account/statistical-3")
    public String statistical3(){
        return "/account/statistical-3.jsp";
    }
    @RequestMapping("/account/statisticalInfo")
    public String statisticalInfo(){
        return "/account/statisticalInfo.jsp";
    }
    @RequestMapping("/account/systemSetting")
    public String systemSetting(){
        return "/account/systemSetting.jsp";
    }
    //atstore
    @RequestMapping("/atstore/atstore")
    public String atstore(){
        return "/atstore/atstore.jsp";
    }
    //commons
    @RequestMapping("/commons/common_include.jsp")
    public String common_include(){
        return "/commons/common_include.jsp";
    }
    //goods
    @RequestMapping("/goods/goods.jsp")
    public String goods(){
        return "/goods/goods.jsp";
    }

    //home
    @RequestMapping("/home/Home_top")
    public String Home_top(){
        return "/home/Home_top.jsp";
    }
    @RequestMapping("/home/Home_center")
    public String Home_center(){
        return "/home/Home_center.jsp";
    }
    @RequestMapping("/home/Home_down")
    public String Home_down(){
        return "/home/Home_down.jsp";
    }
    @RequestMapping("/home/Home_left")
    public String Home_left(){
        return "/home/Home_left.jsp";
    }
    @RequestMapping("/home/Home_right")
    public String Home_right(){
        return "/home/Home_right.jsp";
    }
    //instore
    @RequestMapping("/instore/instore")
    public String instore(){
        return "/instore/instore.jsp";
    }
    //outstore
    @RequestMapping("/outstore/outstore")
    public String outstore(){
        return "/outstore/outstore.jsp";
    }
    //partner
    @RequestMapping("/partner/consumer")
    public String consumer(){
        return "/partner/consumer.jsp";
    }
    @RequestMapping("/partner/provider")
    public String provider(){
        return "/partner/provider.jsp";
    }





}
