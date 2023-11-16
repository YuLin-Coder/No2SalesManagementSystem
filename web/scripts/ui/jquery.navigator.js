/**
 * @author chenlei
 * @copyright 2011-09-16
 * 下拉菜单组件
 */
(function($){
    var objId = '', zIndex = 80000, navNum = 10000;
    var isIE6 = $.browser.msie && $.browser.version < 7 ? true : false;
    function ulEnding(){
        if (isIE6) {
            return '<iframe class="emptyFrame"></iframe></ul>';
        }
        else {
            return '</ul>';
        }
    }
    //内部方法
    $.extend({
        createNavigator: function(obj, data, prepend){
            objId = obj.attr('id');
            var level = 1;
            var listStr = '<ul class="level-1" style="z-index:' + (zIndex++) + '">';
            if (prepend) {
                listStr += '<li class="level-1 prepend"><div class="nav-in level-1 prepend">' + prepend + '</div></li>';
            }
            $.each(data.list, function(index, list){
                listStr = $.combineStr(listStr, list, level, index);
            })
            listStr += ulEnding();
            obj.html(listStr);
            zIndex -= 1000;
        },
        //遍历子菜单
        foreachNav: function(level, string, data){
            if (data.sub && data.sub != ('' || [] || {})) {
                level++;
                string += '<ul class="level-' + level + '" style="z-index:' + (zIndex++) + '">';
                $.each(data.sub, function(index, list){
                    string = $.combineStr(string, list, level, index);
                });
                string += ulEnding();
            }
            return string;
        },
        //组合字符串
        combineStr: function(str, list, level, index){
            //是否父级元素
            var isParentLi = list.sub && list.sub != ('' || [] || {}) ? ' nav-li-parent' : '';
            //是否第一个
            var isFirstLi = index == 0 ? ' first' : '';
            //元素属性
            var attributes = {
                id: list.id ? list.id : navNum++,
                href: list.href ? list.href : '#',
                content: list.content ? list.content : ' ',
                title: list.title ? ' title="' + list.title + '"' : '',
                style: list.style ? ' style="' + list.style + '"' : '',
                click: list.click ? ' onclick="' + list.click + '"' : '',
                current: list.current ? ' current' : ''
            };
            //合成字符串数组
            var strArr = [str];
            strArr.push('<li id="');
            strArr.push(objId);
            strArr.push('_li_');
            strArr.push(attributes.id);
            strArr.push('" class="level-');
            strArr.push(level);
            strArr.push(isParentLi);
            strArr.push(isFirstLi);
            strArr.push(attributes.current);
            strArr.push('"><div class="nav-in level-');
            strArr.push(level);
            strArr.push(isParentLi);
            strArr.push(attributes.current);
            strArr.push('"><a id="');
            strArr.push(attributes.id);
            strArr.push('" href="');
            strArr.push(attributes.href);
            strArr.push('"');
            strArr.push(attributes.title);
            strArr.push(attributes.style);
            strArr.push(attributes.click);
            strArr.push('>');
            strArr.push(attributes.content);
            strArr.push('</a></div>');
            //合并字符串
            str = strArr.join('');
            //原连接字符串方法
            //str += '<li id="'+ objId +'_li_'+ attributes.id +'" class="level-'+ level + isParentLi + isFirstLi +'"><div class="nav-in level-'+ level + isParentLi +'"><a id="'+ attributes.id +'" href="'+ attributes.href +'"'+ attributes.title + attributes.style + attributes.click +'>' + attributes.content + '</a></div>';
            str = $.foreachNav(level, str, list);
            str += '</li>';
            return str;
        },
        navCurrent: function(id){
            if (id) {
                $('#' + id).parent('div').addClass('current').parent('li').addClass('current');
            }
        }
    });
    //调用方法
    $.fn.extend({
        navCreator: function(data, type, prepend){
            //初始化列表
            var self = $(this);
            self.addClass(function(){
                //菜单显示模式
                if (type) {
                    type = type == 'pos' ? 'd-pos' : type;
                    return type + ' dynamic-nav';
                }
                else {
                    return 'd-nav dynamic-nav';
                }
            }).css('z-index', zIndex - 1);
            //创建菜单
            $.createNavigator(self, data, prepend);
            //IE6的iFrame遮罩
            if (isIE6) {
                $('ul', self).each(function(){
                    var o = $(this);
                    var h = o.height(), w = o.width();
                    o.children('iframe').height(h).width(w);
                });
            }
            //菜单弹出事件
            $('li', self).hover(function(){
                $(this).children('ul').addClass('show').prev('.nav-in').addClass('show');
                if (isIE6) {
                    $(this).children('ul').each(function(){
                        var o = $(this);
                        var h = o.height(), w = o.width();
                        o.children('iframe').height(h).width(w);
                    });
                }
            }, function(){
                $(this).children('ul').removeClass('show').prev('.nav-in').removeClass('show');
            });
        }
    });
})(jQuery);
