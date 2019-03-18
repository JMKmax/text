;(function($){

	function Dropdown($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer =$elem.find('.dropdown-layer');
		this.activeClass = $elem.data('active')+'-active';
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
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
		},
		show:function(){
			this.$layer.showHide('show');
			this.$elem.addClass(this.activeClass);
		},
		hide:function(){
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	}
	Dropdown.DEFAULTS = {
		js:true,
		mode:'fade'
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				$elem = $(this);
				options = $.extend({},Dropdown.DEFAULTS,options)
				new Dropdown($elem,options)
			})
		}
	})
})(jQuery);