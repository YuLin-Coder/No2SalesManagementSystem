/**
 * @file            jQuery.tojsonstring.js
 * @description     用于支持Json与其它类型互转的扩展方法
 * @author          chenlei
 * @date            2011-06-14
**/


/**
* 将json字符串转换为对象的方法。
*
* @public
* @param json字符串
* @return 返回object,array,string等对象
**/
jQuery.extend({ 
   /** * @see 将json字符串转换为对象 * @param json字符串 * @return 返回object,array,string等对象 */ 
   evalJSON: function(strJson) { 
     return eval("(" + strJson + ")"); 
   } 
}); 


/**
* 将javascript数据类型转换为json字符串的方法。
*
* @public
* @param  {object}  需转换为json字符串的对象, 一般为Json 【支持object,array,string,function,number,boolean,regexp *】
* @return 返回json字符串
**/
jQuery.extend({ 
   toJSONString: function(object) { 
     var type = typeof object; 
     if ('object' == type) { 
       if (Array == object.constructor) type = 'array'; 
       else if (RegExp == object.constructor) type = 'regexp'; 
       else type = 'object'; 
     } 
     switch (type) { 
     case 'undefined': 
     case 'unknown': 
       return; 
       break; 
     case 'function': 
     case 'boolean': 
     case 'regexp': 
       return object.toString(); 
       break; 
     case 'number': 
       return isFinite(object) ? object.toString() : 'null'; 
       break; 
     case 'string': 
       return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() { 
         var a = arguments[0]; 
         return (a == '\n') ? '\\n': (a == '\r') ? '\\r': (a == '\t') ? '\\t': "" 
       }) + '"'; 
       break; 
     case 'object': 
       if (object === null) return 'null'; 
       var results = []; 
       for (var property in object) { 
         var value = jQuery.toJSONString(object[property]); 
         if (value !== undefined) results.push(jQuery.toJSONString(property) + ':' + value); 
       } 
       return '{' + results.join(',') + '}'; 
       break; 
     case 'array': 
       var results = []; 
       for (var i = 0; i < object.length; i++) { 
         var value = jQuery.toJSONString(object[i]); 
         if (value !== undefined) results.push(value); 
       } 
       return '[' + results.join(',') + ']'; 
       break; 
     } 
   } 
});