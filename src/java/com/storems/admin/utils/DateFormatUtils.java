package com.storems.admin.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatUtils {
    public static Date strToDate(String s) {
        Date d = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        try {
            d = sdf.parse(s);
        } catch (Exception var4) {
        }

        return d;
    }
}
