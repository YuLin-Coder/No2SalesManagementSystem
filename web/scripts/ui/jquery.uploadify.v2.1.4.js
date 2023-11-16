/*
Uploadify v2.1.4
Release Date: November 8, 2010

Copyright (c) 2010 Ronnie Garcia, Travis Nickels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

if(jQuery)(
	function(jQuery){
		jQuery.extend(jQuery.fn,{
			uploadify:function(options) {
				jQuery(this).each(function(){
					var settings = jQuery.extend({
					id              : jQuery(this).attr('id'), // The ID of the object being Uploadified
					deleteUrl		: commonRoot + 'commons/uploadify_delete.action',
					updateUrl		: commonRoot + 'commons/uploadify_relation.action',
					downUrl			: commonRoot + 'commons/uploadify_download.action?uploadAttachmentId={0}',
					listUrl			: commonRoot + 'commons/uploadify_list.action',
					script          : commonRoot + 'commons/uploadify_upload.action', // The path to the uploadify backend upload script
					uploader        : commonRoot + 'scripts/ui/res/uploadify/uploadify.swf', // The path to the uploadify swf file
					cancelImg       : commonRoot + 'scripts/ui/res/uploadify/cancel.png', // The path to the cancel image for the default file queue item container
					buttonImg		: commonRoot  +'scripts/ui/res/uploadify/but.png', //上传按钮图标
					expressInstall  : commonRoot + 'scripts/ui/res/uploadify/expressInstall.swf', // The path to the express install swf file
					folder          : '', // The path to the upload folder
					wmode           : 'opaque', // The wmode of the flash file
					scriptAccess    : 'always', // Set to "always" to allow script access across domains
					fileDataName    : 'file', // The name of the file collection object in the backend upload script
					method          : 'POST', // The method for sending variables to the backend upload script
					queueSizeLimit  : 999, // The maximum size of the file queue
					simUploadLimit  : 1, // The number of simultaneous uploads allowed
					queueID         : false, // The optional ID of the queue container
					displayData     : 'percentage', // Set to "speed" to show the upload speed in the default queue item
					removeCompleted : false, // Set to true if you want the queue items to be removed when a file is done uploading
//					rollover		: true,
					
					fileDesc		: '支持格式:', //如果配置了以下的'fileExt'属性，那么这个属性是必须的  
					fileExt			: '*.*',//允许的格式
					width			: '55',
					height			: '27',
					scriptData		: {},  //表单中上传的参数
					auto           	: true,	//自动上传
					multi          	: true, //允许多个文件上传 
					readOnly       	: false,//只读
					sizeLimit		: 1024000000, //设置单个文件大小限制，单位为byte  
					attachmentType	: 'normal',//当一个表单中存在多个附件域时，需要设置此属性已示多个域之间的区别
					
					onInit          : function() {}, // Function to run when uploadify is initialized
					onSelect        : function() {}, // Function to run when a file is selected
					onSelectOnce    : function() {}, // Function to run once when files are added to the queue
					onQueueFull     : function() {
						return true;
					}, // Function to run when the queue reaches capacity
					onCheck         : function() {}, // Function to run when script checks for duplicate files on the server
					onCancel        : function() {}, // Function to run when an item is cleared from the queue
					onClearQueue    : function() {}, // Function to run when the queue is manually cleared
					onError         : function() {}, // Function to run when an upload item returns an error
					onProgress      : function() {}, // Function to run each time the upload progress is updated
					onComplete      : function() {}, // Function to run when an upload is completed
					onAllComplete   : function() {},  // Function to run when all uploads are completed
					onQueueLoad		: function() {}, //列表加载事件
					onOpen			: function() {},
					onUpdataRef		: function() {},
					onUpdataRefError: function() {hError("更新附件引用失败！")},
					onBeforeDelete	: function() {},
					onDelete		: function() {hAlert("删除附件成功！")},
					onDeleteError	: function() {hError("删除附件失败！")}
				}, options);
				//if(!settings.attachmentType || settings.attachmentType.lenght==0) throw "附件上传控件，附件类型设置不能为空";
				if(!settings.id){ 
					settings.id = ('upd' + (new Date()).getTime() + Math.round(Math.random()*100));
					$(this).attr('id', settings.id);
				}
				if($.browser.mozilla){
					function addSessionId(url){
						if(url.indexOf('\?')>0){
							url += "&JSESSIONID=" + Constant.sessionId;
						}else{
							url += "?JSESSIONID=" + Constant.sessionId;
						}
						return url;
					}
					settings.deleteUrl = addSessionId(settings.deleteUrl);
					settings.updateUrl = addSessionId(settings.updateUrl);
					settings.downUrl = addSessionId(settings.downUrl);
					settings.listUrl = addSessionId(settings.listUrl);
					settings.script = addSessionId(settings.script);
				}
				jQuery(this).data('settings',settings);
				var pagePath = location.pathname;
				pagePath = pagePath.split('/');
				pagePath.pop();
				pagePath = pagePath.join('/') + '/';
				var data = {};
				data.uploadifyID = settings.id;
				data.pagepath = pagePath;
				if (settings.buttonImg) data.buttonImg = escape(settings.buttonImg);
				if (settings.buttonText) data.buttonText = escape(settings.buttonText);
				if (settings.rollover) data.rollover = true;
				data.script = settings.script;
				data.folder = escape(settings.folder);
				if (settings.scriptData) {
					settings.scriptData.attachmentType = settings.attachmentType;
					var scriptDataString = '';
					for (var name in settings.scriptData) {
						scriptDataString += '&' + name + '=' + settings.scriptData[name];
					}
					data.scriptData = escape(scriptDataString.substr(1));
				}
				data.width          = settings.width;
				data.height         = settings.height;
				data.wmode          = settings.wmode;
				data.method         = settings.method;
				data.queueSizeLimit = settings.queueSizeLimit;
				data.simUploadLimit = settings.simUploadLimit;
				if (settings.hideButton)   data.hideButton   = true;
				if (settings.fileExt)      data.fileExt      = settings.fileExt;
				if (settings.fileDesc)    data.fileDesc     = settings.fileDesc + settings.fileExt;
				if (settings.multi)        data.multi        = true;
				if (settings.readOnly)  data.readOnly     = true;   //上传附件只读
				if (settings.auto)         data.auto         = true;
				if (settings.sizeLimit)    data.sizeLimit    = settings.sizeLimit;
				if (settings.checkScript)  data.checkScript  = settings.checkScript;
				if (settings.fileDataName) data.fileDataName = settings.fileDataName;
				if (settings.queueID)      data.queueID      = settings.queueID;
				jQuery(this).data('data',data);
				if (settings.onInit() !== false) {
					if(document.getElementById(jQuery(this).attr('id') + 'Uploader')) return;
//					jQuery(this).css('display','none');
					jQuery(this).append('<div id="' + jQuery(this).attr('id') + 'Uploader"></div>');
					var readOnly  = settings.readOnly;//false;  					
					if(!readOnly){//当前为编辑状态，显示上传的flash
						swfobject.embedSWF(settings.uploader, settings.id + 'Uploader', settings.width, settings.height, '9.0.24', settings.expressInstall, data, {'quality':'high','wmode':settings.wmode,'allowScriptAccess':settings.scriptAccess},{},function(event) {
							if (typeof(settings.onSWFReady) == 'function' && event.success) settings.onSWFReady();
						});
					}
					jQuery(this).append('<input type="hidden" name="' + jQuery(this).attr('id') + 'Data" id="' + jQuery(this).attr('id') + 'Data"/>');
	   				//在页面加入隐藏域，保存已附件标识串，
	   				jQuery(this).append("<input type='hidden' name='" + jQuery(this).attr('id') + "_uploadAttachmentIds' id='" + jQuery(this).attr('id') + "_uploadAttachmentIds'/>");		   							   					   				    
					jQuery(this).append("<input type='hidden' name='" + jQuery(this).attr('id') + "ifComplete' id='" + jQuery(this).attr('id') + "ifComplete' value='1'/>");
					$("#" + jQuery(this).attr('id') + "ifComplete").val("1")
					var initData = settings.initData;
					if(initData){
						jQuery(this).uploadifyRef(initData);
					}
					var queue;
					if (settings.queueID == false) {
						jQuery("#" + jQuery(this).attr('id') + "Uploader").after('<div id="' + jQuery(this).attr('id') + 'Queue" class="uploadifyQueue"></div>');
					} else {
						jQuery("#" + settings.queueID).addClass('uploadifyQueue');
					}
				}
				if (typeof(settings.onOpen) == 'function') {
					jQuery(this).bind("uploadifyOpen", settings.onOpen);
				}
				jQuery(this).bind("uploadifySelect", {'action': settings.onSelect, 'queueID': settings.queueID}, function(event, ID, fileObj) {
					if (event.data.action(event, ID, fileObj) !== false) {						
					    var byteSize = jQuery("#" + jQuery(this).attr('id') + "Uploader").getFileSize(fileObj.size);	
					    fileName = jQuery("#" + jQuery(this).attr('id') + "Uploader").getAttachmentName(fileObj.name);
						queue = '#' + jQuery(this).attr('id') + 'Queue';
						if (event.data.queueID) {
							queue = '#' + event.data.queueID;
						}
						//上传开始
						jQuery('#' + jQuery(this).attr('id') + 'ifComplete').val('0');
						jQuery(queue).append('<div id="' +jQuery(this).attr('id') + ID + '" class="uploadifyQueueItem">\
								<div class="cancel">\
									<a href="javascript:$(\'#' + jQuery(this).attr('id') + '\').uploadifyCancel(\'' + ID + '\')"><img src="' + settings.cancelImg + '" border="0"  alt="取消上传"/></a>\
								</div>\
								<span class="fileName">' + fileName + ' (' + byteSize + ')</span><span class="percentage"></span>\
								<div class="uploadifyProgress">\
									<div id="' + jQuery(this).attr('id') + ID + 'ProgressBar" class="uploadifyProgressBar"><!--Progress Bar--></div>\
								</div>\
							</div>');
					}
				});
				jQuery(this).bind("uploadifySelectOnce", {'action': settings.onSelectOnce}, function(event, data) {
					event.data.action(event, data);
					if (settings.auto) {
						if (settings.checkScript) { 
							jQuery(this).uploadifyUpload(null, false);
						} else {
							jQuery(this).uploadifyUpload(null, true);
						}
					}
				});
				jQuery(this).bind("uploadifyQueueFull", {'action': settings.onQueueFull}, function(event, queueSizeLimit) {
					if (event.data.action(event, queueSizeLimit) !== false) {
						hError('最多允许上传  ' + queueSizeLimit + ' 个文件.');
					}
				});
				jQuery(this).bind("uploadifyCheckExist", {'action': settings.onCheck}, function(event, checkScript, fileQueueObj, folder, single) {
					var postData = new Object();
					postData = fileQueueObj;
					postData.folder = (folder.substr(0,1) == '/') ? folder : pagePath + folder;
					if (single) {
						for (var ID in fileQueueObj) {
							var singleFileID = ID;
						}
					}
					jQuery.post(checkScript, postData, function(data) {
						for(var key in data) {
							if (event.data.action(event, data, key) !== false) {
								var replaceFile = confirm("Do you want to replace the file " + data[key] + "?");
								if (!replaceFile) {
									document.getElementById(jQuery(event.target).attr('id') + 'Uploader').cancelFileUpload(key,true,true);
								}
							}
						}
						if (single) {
							document.getElementById(jQuery(event.target).attr('id') + 'Uploader').startFileUpload(singleFileID, true);
						} else {
							document.getElementById(jQuery(event.target).attr('id') + 'Uploader').startFileUpload(null, true);
						}
					}, "json");
				});
				jQuery(this).bind("uploadifyCancel", {'action': settings.onCancel}, function(event, ID, fileObj, data, remove, clearFast) {
					if (event.data.action(event, ID, fileObj, data, clearFast) !== false) {
						if (remove) { 
							var fadeSpeed = (clearFast == true) ? 0 : 250;
							jQuery("#" + jQuery(this).attr('id') + ID).fadeOut(fadeSpeed, function() { jQuery(this).remove() });
						}
					}
					jQuery(this).uploadifyFileCount();
				});
				jQuery(this).bind("uploadifyClearQueue", {'action': settings.onClearQueue}, function(event, clearFast) {
					var queueID = (settings.queueID) ? settings.queueID : jQuery(this).attr('id') + 'Queue';
					if (clearFast) {
						jQuery("#" + queueID).find('.uploadifyQueueItem').remove();
					}
					if (event.data.action(event, clearFast, settings.queueSizeLimit, jQuery("#" + queueID).find('.uploadifyQueueItem').length) !== false) {
						jQuery("#" + queueID).find('.uploadifyQueueItem').each(function() {
							var index = jQuery('.uploadifyQueueItem').index(this);
							jQuery(this).delay(index * 100).fadeOut(250, function() { 
								jQuery(this).remove();
								jQuery("#"+settings.id).uploadifyFileCount();
							});
						});
					}
				});
				var errorArray = [];
				jQuery(this).bind("uploadifyError", {'action': settings.onError}, function(event, ID, fileObj, errorObj) {
					if (event.data.action(event, ID, fileObj, errorObj) !== false) {
						var fileArray = new Array(ID, fileObj, errorObj);
						errorArray.push(fileArray);
						jQuery("#" + jQuery(this).attr('id') + ID).find('.percentage').text(" - " + errorObj.type + " Error");
						jQuery("#" + jQuery(this).attr('id') + ID).find('.uploadifyProgress').hide();
						jQuery("#" + jQuery(this).attr('id') + ID).addClass('uploadifyError');
					}
				});
				if (typeof(settings.onUpload) == 'function') {
					jQuery(this).bind("uploadifyUpload", settings.onUpload);
				}
				jQuery(this).bind("uploadifyProgress", {'action': settings.onProgress, 'toDisplay': settings.displayData}, function(event, ID, fileObj, data) {
					if (event.data.action(event, ID, fileObj, data) !== false) {
						jQuery("#" + jQuery(this).attr('id') + ID + "ProgressBar").animate({'width': data.percentage + '%'},250,function() {
							if (data.percentage == 100) {
								jQuery(this).closest('.uploadifyProgress').fadeOut(250,function() {jQuery(this).remove()});
							}
						});
						if (event.data.toDisplay == 'percentage') displayData = ' - ' + data.percentage + '%';
						if (event.data.toDisplay == 'speed') displayData = ' - ' + data.speed + 'KB/s';
						if (event.data.toDisplay == null) displayData = ' ';
						jQuery("#" + jQuery(this).attr('id') + ID).find('.percentage').text(displayData);
					}
				});
				jQuery(this).bind("uploadifyComplete", {'action': settings.onComplete}, function(event, ID, fileObj, response, data) {
					if (event.data.action(event, ID, fileObj, unescape(response), data) !== false) {
                        jQuery("#" + jQuery(this).attr('id') + ID).find('.percentage').text(' - Completed');
                        if (settings.removeCompleted) {
                            jQuery("#" + jQuery(event.target).attr('id') + ID).fadeOut(250, function(){
                                jQuery(this).remove()
                            });
                        }
                        jQuery("#" + jQuery(event.target).attr('id') + ID).addClass('completed');
                        var res = unescape(response);
                        res = eval('(' + res + ')'); //转为json对象。
                        var fileid = res.message; //文件上传成功后，修改为正式附件id.
                        jQuery("#" + jQuery(this).attr('id') + ID).find('.cancel').empty();//清空cacel div的内容。
                        var divID = jQuery(this).attr('id') + ID;
                        //修改删除附件的链接。
                        var cancelText = '<a href="javascript:$(\'#' + settings.id + '\').uploadifyDelete(\'' + fileid + '\',\''+ divID + '\')"><img src="' + settings.cancelImg + '" border="0" alt="删除"/></a>';
                        jQuery("#" + jQuery(this).attr('id') + ID).find('.cancel').append(cancelText);//增加到附件列表中。							 
                        var byteSize = jQuery("#" + jQuery(this).attr('id') + "Uploader").getFileSize(fileObj.size);
                        fileName = jQuery("#" + jQuery(this).attr('id') + "Uploader").getAttachmentName(fileObj.name);
                        jQuery("#" + jQuery(this).attr('id') + ID).find('.fileName').empty();
                        var filenameLink = '<a href="' + jQuery.format(settings.downUrl, fileid) + '">' + fileName + '</a>&nbsp;&nbsp; (' + byteSize + ')';
                        jQuery("#" + jQuery(this).attr('id') + ID).find('.fileName').append(filenameLink);//为文件名增加下载链接。											
                        var temp = $('#' + jQuery(this).attr('id') + '_uploadAttachmentIds').val();
                        if (temp.length > 0) {
                            temp = temp + ',';
                        }
                        $('#' + jQuery(this).attr('id') + '_uploadAttachmentIds').val(temp + fileid);
                        //上传结束 
                        jQuery('#' + jQuery(this).attr('id') + 'ifComplete').val('1');
						jQuery(this).uploadifyFileCount();
					}
				});
				if (typeof(settings.onAllComplete) == 'function') {
					jQuery(this).bind("uploadifyAllComplete", {'action': settings.onAllComplete}, function(event, data) {
						if (event.data.action(event, data) !== false) {
							errorArray = [];
						}
					});
				}
			});
		},
		uploadifySettings:function(settingName, settingValue, resetObject) {
			var returnValue = false;
			jQuery(this).each(function() {
				if (settingName == 'scriptData' && settingValue != null) {
					if (resetObject) {
						var scriptData = settingValue;
					} else {
						var scriptData = jQuery.extend(jQuery(this).data('settings').scriptData, settingValue);
					}
					var scriptDataString = '';
					for (var name in scriptData) {
						scriptDataString += '&' + name + '=' + scriptData[name];
					}
					settingValue = escape(scriptDataString.substr(1));
				}
				try {
					returnValue = document.getElementById(jQuery(this).attr('id') + 'Uploader').updateSettings(settingName, settingValue);

				} catch (e) {
					
				}
			});
			if (settingValue == null) {
				if (settingName == 'scriptData') {
					var returnSplit = unescape(returnValue).split('&');
					var returnObj   = new Object();
					for (var i = 0; i < returnSplit.length; i++) {
						var iSplit = returnSplit[i].split('=');
						returnObj[iSplit[0]] = iSplit[1];
					}
					returnValue = returnObj;
				}
			}
			var _settings = {};
			_settings[settingName] = settingValue;
			jQuery.extend(jQuery(this).data('settings'), _settings);
			return returnValue;
		},
		uploadifyType : function(attachmentType){
			jQuery(this).uploadifySettings("attachmentType", attachmentType, true);
		},
		uploadifyUpload:function(ID,checkComplete) {
			jQuery(this).each(function() {
				if (!checkComplete) checkComplete = false;
				document.getElementById(jQuery(this).attr('id') + 'Uploader').startFileUpload(ID, checkComplete);
			});
		},
		uploadifyCancel:function(ID) {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').cancelFileUpload(ID, true, true, false);
			});
			jQuery(this).uploadifyFileCount();
		},
		/**
		 * 清除附件列表
		 */
		uploadifyQueueClear:function(){
			var settings = jQuery(this).data("settings");
			if(settings.readOnly){
				jQuery(this).each(function() {
					var queue = '#' + jQuery(this).attr('id') + 'Queue';
					if (settings.queueID == false) {
							jQuery(queue).empty();
					} else {
							jQuery("#" + settings.queueID).empty();
					}
				});
				jQuery(this).attr('cleared', "true");
			}else
			jQuery(this).uploadifyClearQueue();
		},
		/**
		 * 加载附件列表
		 */
		uploadifyQueueLoad:function(){
			var settings = jQuery(this).data("settings");
			jQuery(this).uploadifyQueueClear();
			$.untilCall(this, function(){
			jQuery(this).each(function() {
			   //取队列名称
			   var queue;
				if (settings.queueID == false) {
					queue = '#' + jQuery(this).attr('id') + 'Queue';
				} else {
					queue = '#' + settings.queueID;
				}
			   
				//遍历文件列表。
				var formObjId = $("#" + jQuery(this).attr('id') + "Data").val();//$('#formObjId').val();
				var attachmentType =settings.attachmentType;
				var readOnly  = settings.readOnly;//false;
				if(!readOnly){//当前为可编辑状态
   					if(null != formObjId && formObjId.length>0  && null != attachmentType && attachmentType.length>0){ //如果表单对象id和附件类型都不为空时，
						var uploadAttachmentIds = $('#' + settings.id + '_uploadAttachmentIds').val(); 
   						  jQuery.ajax({	//调用后台读出表单对象所对应的此类型的所有附件信息。		   						  
			                url :  settings.listUrl,
			                data : 'formObjId='+formObjId+'&attachmentType='+attachmentType,
			                success : function (data, textStatus){	
			                        //data = eval('(' + data + ')');   //转为json对象。					                    
			                        jQuery.each(data, function(n, item){    
			                        	var byteSize = jQuery("#" + settings.id + "Uploader").getFileSize(item.fileLength);	
			                        	fileName = jQuery("#" + settings.id + "Uploader").getAttachmentName(item.fileName);					                        
										var divID = settings.id + item.attachmentId;	//附件项唯一标识。
									    //生成附件信息列表
									   jQuery(queue).append('<div id="' +settings.id + item.attachmentId + '" class="uploadifyQueueItem">\
											<div class="cancel">\
												<a href="javascript:$(\'#' + settings.id + '\').uploadifyDelete(\''+item.attachmentId +'\')"><img src="' + settings.cancelImg + '" border="0" alt="删除"/></a>\
											</div>\
											<span class="fileName"><a href="'+ jQuery.format(settings.downUrl, item.attachmentId)+'">' + fileName + '</a>&nbsp;&nbsp;  (' + byteSize +')</span><span class="percentage"></span>\
										</div>');																						   
   										var tempStr = item.attachmentId; //将所有附件的标识号好组织好，保存在隐藏域中。
   										if(uploadAttachmentIds.length>0){
   											uploadAttachmentIds += ',';
   										}
   										uploadAttachmentIds += tempStr;
									});//each结束										
                                    jQuery('#' + settings.id + '_uploadAttachmentIds').val(uploadAttachmentIds);
									var count = jQuery("#" + settings.id).uploadifyFileCount();
									if(typeof settings.onQueueLoad == 'function'){
										settings.onQueueLoad(count);
									}
			                }
			            });
				
					}					
	   				
				}
				else{   //文件为只读，可下载。在队列后增加文件列表。
   					if(null != formObjId && formObjId.length>0  && null != attachmentType && attachmentType.length>0){ //如果表单对象id和附件类型都不为空时，		   						
   						  $.ajax({	//调用后台读出表单对象所对应的此类型的所有附件信息。
			                url :  settings.listUrl,
			                data : 'formObjId='+formObjId+'&attachmentType='+attachmentType,
			                cache : false, 
			                async : true,
			                type : "POST",
			                success : function (data, textStatus){			
			                        data = eval('(' + data + ')');   //转为json对象。	
			                        $.each(data.list, function(n, item){    
			                        	var byteSize = jQuery("#" +settings.id + "Uploader").getFileSize(item.fileLength);	
			                        	fileName = jQuery("#" +settings.id + "Uploader").getAttachmentName(item.fileName);
										var divID = settings.id + item.attachmentId;	//附件项唯一标识。			
										queue = '#' + settings.id + 'Queue';
									   jQuery(queue).append('<div id="' +settings.id + item.attachmentId + '" class="uploadifyQueueItem">\
											<span class="fileName"><a href="'+ jQuery.format(settings.downUrl, item.attachmentId)+'">' + fileName + '</a>&nbsp;&nbsp;  (' + byteSize +')</span>\
										</div>'); //生成附件信息列表																						   
									});//each结束
									var count = jQuery("#" + settings.id).uploadifyFileCount();
									if(typeof settings.onQueueLoad == 'function'){
										settings.onQueueLoad(count);
									}
			                },//调用附件列表结束
			                error : function(){
			                	hError('提交请求失败,删除文件失败!');  //请求附件列表结束
			                }
			            });
					}		
				}	
			});
			jQuery(this).attr('cleared', "");
			}, function(){
				return jQuery(this).attr('cleared') === 'true';
			});
		},
		uploadifyClearQueue:function() {
			var settings = jQuery(this).data("settings");
			var data = jQuery(this).data("data");
			jQuery(this).each(function() {
				try {
					if($.browser.msie && (Number($.browser.version)<9)){//IE9以下版本重新render Flash
						setTimeout(function(){
							$("#"+jQuery(this).attr('id') + 'Uploader').remove();
							jQuery(this).after('<div id="' + jQuery(this).attr('id') + 'Uploader"></div>');
							var readOnly  = settings.readOnly;//false;  					
							if(!readOnly){//当前为编辑状态，显示上传的flash
								swfobject.embedSWF(settings.uploader, settings.id + 'Uploader', settings.width, settings.height, '9.0.24', settings.expressInstall, data, {'quality':'high','wmode':settings.wmode,'allowScriptAccess':settings.scriptAccess},{},function(event) {
									if (typeof(settings.onSWFReady) == 'function' && event.success) settings.onSWFReady();
								});
							}
						}, 2);
					}
					var $this = jQuery(this);
					jQuery.untilCall(this, function(){
						document.getElementById(jQuery(this).attr('id') + 'Uploader').clearFileUploadQueue(false);
						jQuery(this).attr('cleared', true);
					}, function(){
						return document.getElementById(jQuery(this).attr('id') + 'Uploader').clearFileUploadQueue != null;
					});
				} catch (e) {
					
				}
			});
			jQuery(this).uploadifyFileCount();
		},
		/**
		 * 引用表单对象ID，用于关联表单和附件
		 * @param {Object} dataId
		 */
		uploadifyRef:function(dataId) {
			var settings = jQuery(this).data("settings");
			var _dataId = dataId||$(settings.idfield).val();
			jQuery(this).each(function() {
				if(typeof _dataId != 'undefind' && _dataId!=null &&_dataId.length>0){
					$("#" + jQuery(this).attr('id') + "Data").val(_dataId);
					jQuery(this).uploadifyQueueLoad();
				}else{
					_dataId = $("#" + jQuery(this).attr('id') + "Data").val();
				}
			});
			return _dataId;
		},
		getFileSize:function(fileByteSize){//返回文件大中，KB或MB
			var byteSize = Math.round(fileByteSize / 1024 * 100) * .01;					                        
			var suffix = 'KB';			
			if (byteSize > 1000) {
				byteSize = Math.round(byteSize *.001 * 100) * .01;
				suffix = 'MB';
			}
			var sizeParts = byteSize.toString().split('.');
			if (sizeParts.length > 1) {
				byteSize = sizeParts[0] + '.' + sizeParts[1].substr(0,2);
			} else {
				byteSize = sizeParts[0];
			}														
			return byteSize + suffix;
		},
		getAttachmentName:function(filename){
			var name='';
			if (filename.length > 20) {
					name = filename.substr(0,20) + '...';
			} else {
					name = filename;
			}			
			return name;
		},
		/**
		 * 附件的ID，多个附件已“,”隔开
		 */
		uploadifyIds:function(){
			var ids="";
			jQuery(this).each(function() {
				ids += jQuery('#' + jQuery(this).attr('id') + '_uploadAttachmentIds').val();
			});
			return ids;
		},
		/**
		 * 附件是否已上传完成
		 */
		uploadifyComplete:function(){
			var complete;
			jQuery(this).each(function() {
				complete = jQuery('#' + jQuery(this).attr('id') + 'ifComplete').val()=='0'?false:true;
			});
			return complete;
		},
		/**
		 * 附件队列的大小
		 */
		uploadifyFileCount:function(){
			var fileCount;
			var settings = jQuery(this).data("settings");
			jQuery(this).each(function() {
				var queueID = (settings.queueID) ? settings.queueID : jQuery(this).attr('id') + 'Queue';
				fileCount = jQuery('#' + queueID).find('.uploadifyQueueItem').size();
			});
			jQuery(this).uploadifySettings('fileCount', fileCount);
			return fileCount;
		},
		/**
		 * 保存附件与表单的关联
		 */
		uploadifyUpdataRef:function(){
			jQuery(this).each(function() {
				var settings = jQuery(this).data("settings");
				var formId = jQuery(this).uploadifyRef();
				var uploadAttachmentIds =  jQuery(this).uploadifyIds();		
				$.ajax({
					url : settings.updateUrl,
					data : 'uploadAttachmentIds='+uploadAttachmentIds +'&formObjId='+formId,
					cache : false, 
					async : true,
					type : "POST",
					success : function (data, textStatus){
						settings.onUpdataRef(data, textStatus, uploadAttachmentIds);
					},
					error : function(){
						settings.onUpdataRefError(uploadAttachmentIds);
						//hError('提交请求失败,删除文件失败!');
					}
				});					
			});
		},
		/**
		 * 删除附件
		 * @param {} response  附件标识号
		 * @param {} divID   列表项div
		 */
		 uploadifyDelete:function(attachmentId, divId){
		 	var settings = jQuery(this).data("settings");
			jQuery(this).each(function() {
				if(settings.onBeforeDelete() === false) return;
		     	$.ajax({
		                url :  settings.deleteUrl,
		                data : 'uploadAttachmentId='+attachmentId,
		                cache : false, 
		                async : true,
		                type : "POST",
		                success : function (data, textStatus){
	                        res = data.message; 	//输出提示。
	                        if(res==1){
								if(divId && divId.length>0)
									$("#"+divId).remove();
								else
	                        		$("#"+settings.id + attachmentId).remove(); //删除所选文件的div
								settings.onDelete(data, textStatus, attachmentId);
								jQuery("#" + settings.id).uploadifyFileCount();
	                        }else{
								settings.onDeleteError(attachmentId);
							}
		                },
		                error : function(){
		                	settings.onDeleteError(attachmentId);
		                }
		            });			
			});
		}
	})
})(jQuery);
