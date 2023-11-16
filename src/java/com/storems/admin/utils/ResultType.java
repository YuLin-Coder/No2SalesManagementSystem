package com.storems.admin.utils;

public enum ResultType {
	// 执行hql语句时,无返回值,如更新,删除等
	NO_RESULT,
	// 执行hql语句时,返回值只有一个时用此类型
	UINQUE_RESULT,
	// 执行hql语句时,返回值有多个时用此类型
	MULTI_RESULT;
}
