;(function($){

	function Dropdown($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer =$elem.find('.dropdown-layer');
		this.activeClass = $elem.data('active')+'-active';
		this.timer = 0;
		//初始化
		this.init();
	}

	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			//初始化显示隐藏事件
			this.$layer.showHide(this.options)
			//监听显示隐藏事件;
			this.$layer.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);
			}.bind(this));
			//绑定事件；
			if(this.options.eventName == 'click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				}.bind(this));
				$(document).on('click',$.proxy(this.hide,this))
			}else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			}
			
		},
		show:function(){
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);
				}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);
			}
			
		},
		hide:function(){
			clearTimeout(this.timer);
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	}
	Dropdown.DEFAULTS = {
		js:true,
		mode:'fade',
		delay:200,
		eventName:''
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				$elem = $(this);
				var dropdown = $elem.data('dropdown');
				if(!dropdown){
					options = $.extend({},Dropdown.DEFAULTS,options)
					dropdown = new Dropdown($elem,options);
					$elem.data('dropdown',dropdown)
				}
				if(typeof dropdown[options] == 'function'){
					dropdown[options]()
				}
				
			})
		}
	})
})(jQuery);