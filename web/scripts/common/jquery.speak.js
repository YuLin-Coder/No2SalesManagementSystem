/**
 * Web 语音（TTS）
 * 用于将语音转换为声音；
 * 程序直接调用系统TTS引擎发声，发声效果与系统所用TTS密切相关
 * 
 * 调用方式：$.speak("测试");
 */

$(function(){
	$("body").append('<embed id="firstMusic" src="'+templateRoot+'dingdong.wav" mastersound width=0 height=0 loop="false" autostart="false"></embed>');
});
(function($){
	$.extend({
		_web_speaker : undefined,
		/**
		 * 朗读
		 * @param {Object} text
		 */
		speak: function(text){
			if(!$.browser.msie) return;
			if(!VoiceObj) return;
			if(typeof $._web_speaker != "undefined"){
				if(typeof text == "string"){
					$._web_speaker.say(text);
				}
				return;
			}
			
			var options = {
					voices : ["Microsoft Lili", "VW Lily", "Girl XiaoKun", "Microsoft Simplified Chinese"],//TTS首选列表
					speed : 2,//语速
					volume : 100,//音量
					splitTime:1000//前置音乐时间
			}
			function Speaker(){
			}
			$.extend(Speaker,{
				prototype: {
					/**
					 * 朗读队列
					 */
					voiceList : [],
					/**
					 * 朗读状态
					 */
					status : "stop",
					init:function(){
						var $this = this;
						
						function VoiceObj::StartStream() {
							$this.status = "start";
						}
						function VoiceObj::EndStream() {
							$this.status = "stop";
						}
						this.speakObj = VoiceObj;
						this.shutup();
						this.voice();
						this.volume(options.volume);
						this.speed(options.speed);
//						this.firstMusic = $('<embed id="firstMusic" src="/themis/dingdong.wav" mastersound width=0 height=0 loop="false" autostart="false"></embed>')
//						$("body").append(this.firstMusic);
						$("window").bind("unload",function(){
							$this.destroy();
						});
						
						/**
						 * 侦听队列并发声
						 */
						function s(){
							if($this.voiceList.length>0 && $this.status == "stop"){
								var v = $this.voiceList.shift();
								var music = document.getElementById("firstMusic");
                                music.play();
								$this.status = "start";
                                setTimeout(function(){
									music.stop();
									try {
										$this.speakObj.Speak(v, 1);
									}
									catch(exception){
										alert("语音输出异常，请将此站点设置为信任站点！");
									}
								}, options.splitTime);
							}
							setTimeout(s, 500);
						}
						setTimeout(s, 500);
					},
					voice:function(){
						var VoicesToken = this.speakObj.GetVoices();
						for(var ti=0; ti<options.voices.length; ti++){
							for( var i=0; i <VoicesToken.Count; i++ ){
								if(VoicesToken.Item(i).GetDescription().indexOf(options.voices[ti]) == 0){
									this.speakObj.Voice = VoicesToken.Item(i);
									return;
								}
							}
						}
					},
					speed:function(v){
						this.speakObj.Rate = v;
					},
					volume:function(v){
						this.speakObj.Volume = v;
					},
					destroy:function(){
						delete this.speakObj;
					},
					say:function(v){
						this.voiceList.push(v);
					},
					shutup:function(){
						try{
							this.speakObj.Speak( "", 2 );
						}
						catch(exception){
							alert("语音输出异常，请将此站点设置为信任站点！");
						}
					},
					shutupAll:function(){
						this.voiceList.length = 0;
						this.shutup();
					}

				}
			}, true);
			$._web_speaker = new Speaker();;
			$._web_speaker.init();
			$._web_speaker.say(text);
		},
		/**
		 * 停止当前语音朗读
		 */
		shutup: function(){
			if(typeof $._web_speaker != "undefined"){
				$._web_speaker.shutup();
				return;
			}
		},
		/**
		 * 停止队列中所有语音朗读
		 */
		shutupAll: function(){
			if(typeof $._web_speaker != "undefined"){
				$._web_speaker.shutupAll();
				return;
			}
		}

	});
})(jQuery);
var VoiceObj ;
try{
	VoiceObj = new ActiveXObject("Sapi.SpVoice");
}
catch(exception){
	//alert("不能创建语音组件！");
}
