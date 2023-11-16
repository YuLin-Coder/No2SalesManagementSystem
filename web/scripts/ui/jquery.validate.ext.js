(function($) {

    /*
     * 设置debug模式，不自动提交表单
     */
	$.validator.setDefaults({
		debug : true,
		ignoreTitle : true,
		errorPlacement : function(label, element) {
			$(element).attr("title", "").poshytip('destroy');
			$(element).attr("title", label.html());
			$(element).poshytip({
				className : 'tip-red'
			});
		},
		success : function(label) {
			var element = $("#" + label.attr("for"));
			$(element).attr("title", "").poshytip('destroy');
		}
	})
    function realLength(value) {
        var vlen = 0;
        for (var i = 0; i < value.length; i++) {
            vlen++;
            if (escape(value.charAt(i)).indexOf("%u") != -1) 
                vlen++;
        }
        return vlen;
    }
    
    $.extend(true, $.validator, {
        vAttribute: "validate",
        /*
         * 覆盖方法，将原有的class属性换成vtype属性
         */
        classRules: function(element) {
            var rules = {};
            var classes = $(element).attr(this.vAttribute);
            classes &&
            $.each(classes.split(' '), function() {
                if (this in $.validator.classRuleSettings) {
                    $.extend(rules, $.validator.classRuleSettings[this]);
                }
            });
            return rules;
        },
        metadataRules: function(element) {
            if (!$.metadata) 
                return {};
            $.metadata.setType('validate', this.vAttribute);
            var meta = $.data(element.form, 'validator').settings.meta;
            return meta ? $(element).metadata()[meta] : $(element).metadata();
        },
        prototype: {
            elements: function() {
                var validator = this, rulesCache = {};
                
                // select all valid inputs inside the form (no submit or reset buttons)
                // workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
                return $([]).add($.makeArray(this.currentForm.elements)).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    !this.name && validator.settings.debug && window.console && console.error("%o has no name assigned", this);
                    
                    // select only the first element for each name, and only those with rules specified
                    if (this.name in rulesCache || !validator.objectLength($(this).rules())) 
                        return false;
                    
                    rulesCache[this.name] = true;
                    return true;
                });
            }
        },
        methods: {
            maxlength: function(value, element, param) {
                return this.optional(element) || (this.getLength($.trim(value), element) <= param && realLength(value) <= param);
            }//输入长度不能超过{0}(一个汉字占两个字符)
        }
    });
    $.extend($.fn, {
        /*
         * 验证器初始化后添加的验证
         */
        validRules: function(options) {
            //			alert(this[0])
            var validator = $.data(this[0], 'validator');
            //			var validator = $.data(this[0], 'validator');
            //用于改造验证出错信息的浮动方式 --chenlei
//            var _options = {
//                ignoreTitle: true,
//                errorPlacement: function(label, element) {
//                    $(element).attr("title", "").poshytip('destroy');
//                    $(element).attr("title", label.html());
//                    $(element).poshytip({
//                        className: 'tip-red'
//                    });
//                },
//                success: function(label) {
//                    var element = $("#" + label.attr("for"));
//                    $(element).attr("title", "").poshytip('destroy');
//                }
//            };
            var rules = options.rules;
            delete options.rules;
            $.extend(validator.settings, options);
//            $.extend(validator.settings, _options);
            validator.init();
            for (var r in rules) {
                var field = $(this[0]).find("[name=" + r + "]");
                if (typeof field.rules === 'function') {
                    field.rules("add", rules[r]);
                }
            }
            //			alert($.toJSONString(validator.settings));
            //			alert("end");
        }
    });
})(jQuery);

jQuery.validator.addMethod("regex", function(value, element, params) {
    var rex = new RegExp(params);
    return rex.test(value);
}, jQuery.validator.format("内容不符合正则表达式：{0}"));

jQuery.validator.addMethod("maxWords", function(value, element, params) {
    return this.optional(element) || value.match(/\b\w+\b/g).length < params;
}, jQuery.validator.format("Please enter {0} words or less."));

jQuery.validator.addMethod("minWords", function(value, element, params) {
    return this.optional(element) || value.match(/\b\w+\b/g).length >= params;
}, jQuery.validator.format("Please enter at least {0} words."));

jQuery.validator.addMethod("rangeWords", function(value, element, params) {
    return this.optional(element) || value.match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1];
}, jQuery.validator.format("Please enter between {0} and {1} words."));


jQuery.validator.addMethod("letterswithbasicpunc", function(value, element) {
    return this.optional(element) || /^[a-z-.,()'\"\s]+$/i.test(value);
}, "Letters or punctuation only please");

jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, spaces or underscores only please");

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

jQuery.validator.addMethod("nowhitespace", function(value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
}, "No white space please");

jQuery.validator.addMethod("ziprange", function(value, element) {
    return this.optional(element) || /^90[2-5]\d\{2}-\d{4}$/.test(value);
}, "Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx");



jQuery.validator.addMethod("time", function(value, element) {
    return this.optional(element) || /^([01][0-9])|(2[0123]):([0-5])([0-9])$/.test(value);
}, "Please enter a valid time, between 00:00 and 23:59");
/**
 * matches US phone number format
 *
 * where the area code may not start with 1 and the prefix may not start with 1
 * allows '-' or ' ' as a separator and allows parens around area code
 * some people may want to put a '1' in front of their number
 *
 * 1(212)-999-2345
 * or
 * 212 999 2344
 * or
 * 212-999-0983
 *
 * but not
 * 111-123-5434
 * and not
 * 212 123 4567
 */
jQuery.validator.addMethod("phone", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) ||
    phone_number.length > 9 &&
    phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");

// TODO check if value starts with <, otherwise don't try stripping anything
jQuery.validator.addMethod("strippedminlength", function(value, element, param) {
    return jQuery(value).text().length >= param;
}, jQuery.validator.format("Please enter at least {0} characters"));

// same as email, but TLD is optional
jQuery.validator.addMethod("email2", function(value, element, param) {
    return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
}, jQuery.validator.messages.email);

// same as url, but TLD is optional
jQuery.validator.addMethod("url2", function(value, element, param) {
    return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}, jQuery.validator.messages.url);

// NOTICE: Modified version of Castle.Components.Validator.CreditCardValidator
// Redistributed under the the Apache License 2.0 at http://www.apache.org/licenses/LICENSE-2.0
// Valid Types: mastercard, visa, amex, dinersclub, enroute, discover, jcb, unknown, all (overrides all other settings)
jQuery.validator.addMethod("creditcardtypes", function(value, element, param) {

    if (/[^0-9-]+/.test(value)) 
        return false;
    
    value = value.replace(/\D/g, "");
    
    var validTypes = 0x0000;
    
    if (param.mastercard) 
        validTypes |= 0x0001;
    if (param.visa) 
        validTypes |= 0x0002;
    if (param.amex) 
        validTypes |= 0x0004;
    if (param.dinersclub) 
        validTypes |= 0x0008;
    if (param.enroute) 
        validTypes |= 0x0010;
    if (param.discover) 
        validTypes |= 0x0020;
    if (param.jcb) 
        validTypes |= 0x0040;
    if (param.unknown) 
        validTypes |= 0x0080;
    if (param.all) 
        validTypes = 0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0010 | 0x0020 | 0x0040 | 0x0080;
    
    if (validTypes & 0x0001 && /^(51|52|53|54|55)/.test(value)) { //mastercard
 return value.length == 16; }
    if (validTypes & 0x0002 && /^(4)/.test(value)) { //visa
 return value.length == 16; }
    if (validTypes & 0x0004 && /^(34|37)/.test(value)) { //amex
 return value.length == 15; }
    if (validTypes & 0x0008 && /^(300|301|302|303|304|305|36|38)/.test(value)) { //dinersclub
 return value.length == 14; }
    if (validTypes & 0x0010 && /^(2014|2149)/.test(value)) { //enroute
 return value.length == 15; }
    if (validTypes & 0x0020 && /^(6011)/.test(value)) { //discover
 return value.length == 16; }
    if (validTypes & 0x0040 && /^(3)/.test(value)) { //jcb
 return value.length == 16; }
    if (validTypes & 0x0040 && /^(2131|1800)/.test(value)) { //jcb
 return value.length == 15; }
    if (validTypes & 0x0080) { //unknown
 return true; }
    return false;
}, "Please enter a valid credit card number.");
