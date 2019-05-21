;(function($){
	function init($ettr,hiddenCb){
		if($ettr.is(':hidden')){
			$ettr.data('status','hidden');
			typeof hiddenCb == 'function' && hiddenCb();
		}else{
			$ettr.data('status','shown')
		}
	}
	function show($ettr,cd){
		if($ettr.data('status') == 'shown') return;
		if($ettr.data('status') == 'show') return;
		$ettr.data('status','show').trigger('show');
		cd();
	}
	function hide($ettr,cd){
		if($ettr.data('status') == 'hidden') return;
		if($ettr.data('status') == 'hide') return;
		$ettr.data('status','hide').trigger('hidden');
		cd();
	}
	var slient = {
		init:init,
		show:function($ettr){
			show($ettr,function(){
				$ettr.show(2000,function(){
					$ettr.trigger('shown').data('status','shown');
				});
			})
		},
		hide:function($ettr){
			hide($ettr,function(){
				$ettr.hide();
				$ettr.trigger('hide').data('status','hidden');
			})
		}
	}
	var js = {
		fade:{
			init:function($ettr){
				js_init($ettr);
			},
			show:function($ettr){
			  	js_show($ettr,'fadeIn');
			},
			hide:function($ettr){
				js_hide($ettr,'fadeOut');
			}
		},
		slide:{
			init:function($ettr){
				js_init($ettr);
			},
			show:function($ettr){
			  	js_show($ettr,'slideDown');
			},
			hide:function($ettr){
				js_hide($ettr,'slideUp');
			}
		},
		slideLeft:{
			init:function($ettr){
				js_custoeInit($ettr,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeftWidth:0,
						borderRightWidth:0
					})
			},
			show:function($ettr){
				js_customeShow($ettr)
			},
			hide:function($ettr){
				js_customeHide($ettr,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeftWidth:0,
						borderRightWidth:0
					})
			}
		},
		fadeSlideLeft:{
			init:function($ettr){
				js_custoeInit($ettr,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeftWidth:0,
						borderRightWidth:0,
						opacity:0
					})
			},
			show:function($ettr){
				js_customeShow($ettr)
			},
			hide:function($ettr){
				js_customeHide($ettr,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeftWidth:0,
						borderRightWidth:0,
						opacity:0
					})
			}
		},
	};
	function js_custoeInit($ettr,options){
		$ettr.removeClass('transition');
		var styles={};
		for(var key in options){
			styles[key] = $ettr.css(key)
		}
		$ettr.data('styles',styles);
		init($ettr,function(){
			$ettr.css(options)
		})
	};
	function js_customeShow($ettr){
		show($ettr,function(){
			$ettr.show();//display = block;
			$ettr.stop()
			.animate($ettr.data('styles'),function(){
				$ettr.trigger('shown').data('status','shown');
			})
		})
	};
	function js_customeHide($ettr,options){
		hide($ettr,function(){
			$ettr.stop()
			.animate(options,function(){
				$ettr.hide()//display = none;
				$ettr.trigger('hide').data('status','hidden');
			})
		
		})
	}
	function js_init($ettr){
		$ettr.removeClass('transition');
		init($ettr);
	};
	function js_show($ettr,mode){
		show($ettr,function(){
			$ettr.stop()
			[mode]();
			$ettr.trigger('shown').data('status','shown');
		})
	};
	function js_hide($ettr,mode){
		hide($ettr,function(){
			$ettr.stop()
			[mode]();
			$ettr.trigger('hide').data('status','hidden');
		})
	};
	function getShowHide($ettr,options){
		var showHideFn = slient;
		if(options.js){
			showHideFn = js[options.mode];
		}
		showHideFn.init($ettr);
		return {
			show:showHideFn.show,
			hide:showHideFn.hide
		}
	}

	var DEFAULTS = {
		js:true,
		mode:'fade'
	}
	//注册插件
	$.fn.extend({
		showHide:function(options){
			 return this.each(function(){
				var $ettr = $(this);
				var showHideObj = $ettr.data('showHideObj');
				if(!showHideObj){
					options = $.extend({},DEFAULTS,options);
					showHideObj = getShowHide($ettr,options);
					$ettr.data('showHideObj',showHideObj)
				};
				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($ettr)
				}
				

			})
		}
	})
})(jQuery);