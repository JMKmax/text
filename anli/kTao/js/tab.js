;(function($){

	function Tab($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$tabItems = this.$elem.find('tab-item');
		this.$tabPanels = this.$elem.find('tab-pannel')
		this.itemLength = this.$tabItems.length;
		this.now = this._getCorrectIndex(this.options.activeIndex);
		this.timer = 0;
		//初始化
		this.init();
	}
	Tab.prototype = {
		constructor:Tab,
		init:function(){
			var _this = this;
			//初始化显示
			this.$tabItems.eq(this.now).addClass('.tab-item-active');
			this.$tabPanels.eq(this.now).show();
			this.$elem.trigger('tab-show',[this.now,this.$tabPanels[this.now]])
			this.$tabPanels.on('show',function(ev){
				_this.$elem.trigger('tab-show',[_this.$tabPanels.index(this),this]);
			})
			//初始化显示隐藏
			this.$tabPanels.showHide(this.options);
			//监听事件
			var eventName = this.options.eventName == 'click'? 'click' : 'mouseenter'
			this.$elem.on(eventName,'.tab-item',function(){
				_this._toggle(this.$tabItems.index(this))
			})
				//自动播放
				if(this.options.interval){
					this.autoplay();
					this.$elem.hover($.proxy(this.autoplay,this),$.proxy(this.pause,this))
				}
		},
		_getCorrectIndex:function(index){
			if(index<0) return this.itemLength-1;
			if(index>= this.itemLength) return 0;
			return index;
		},
		autoplay:function(){
			this.timer = setInterval(function(){
				this._toggle(this._getCorrectIndex(this.now+1));
			}.bind(this),this.options.interval)
		},
		pause:function(){
			clearInterval(this.timer);
		},
		_toggle:function(index){
			if(this.now == index) return;
			//隐藏当前显示的
			this.$tabItems.eq(this.now).removeClass('tab-item-active');
			this.$tabPanels.eq(this.now).showHide('hide');
			//显示即将显示的
			this.$tabItems.eq(index).addClass('tab-item-active');
			this.$tabPanels.eq(index).showHide('show');
			this.now = index;
		}
	};
	Tab.DEFAULTS = {
		js:true,
		mode:'fade',
		activeIndex:0,
		// interval:2000,
		eventName:'click'
	};
	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				$elem = $(this);
				var tab = $elem.data('tab');
				if(!tab){
					options = $.extend({},Tab.DEFAULTS,options)
					tab = new Tab($elem,options);
					$elem.data('tab',tab)
				}
				if(typeof tab[options] == 'function'){
					tab[options]()
				}	
			})
		}
	})
})(jQuery);