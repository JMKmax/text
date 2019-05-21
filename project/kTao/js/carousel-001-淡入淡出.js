;(function($){

	function Carousel($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.activeIndex;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.itemLength = this.$carouselItem.length;
		this.$btns = this.$elem.find('.btn-item');
		this.$controlBtns = this.$elem.find('.control');
		this.timer = 0;
		//初始化
		this.init();
	}

	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
		
			if(this.options.slide){

			}else{
				//隐藏所有的页面
				this.$elem.addClass('fade');
				//显示默认的第一张
				this.$carouselItem.eq(this.now).show();
				//显示默认的按钮
				this.$btns.eq(this.now).addClass('active');
				//初始化showhide事件
				this.$carouselItem.showHide(this.options)
				//绑定事件
				this.$elem
				.hover(function(){
					this.$controlBtns.addClass('active')
				}.bind(this),function(){
					this.$controlBtns.removeClass('active')
				}.bind(this))
				.on('click','.control-left',function(){
					this._fade(_getCorrectIndex(this.now-1));
				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(_getCorrectIndex(this.now+1));
				}.bind(this))
				//监听底部指示按钮
				var _this = this;
				this.$btns.on('click',function(){
					_this._fade(_this.$btns.index($(this)))
				})
				//自动播放
				if(this.options.interval){
					this.autoplay();
					this.$elem.hover($.proxy(this.autoplay,this),$.proxy(this.pause,this))
				}
			}
		},
		_fade:function(index){
			if(this.now == index) return;
			//隐藏当前的图片
			this.$carouselItem.eq(this.now).showHide('hide');
			//显示即将要显示的
			this.$carouselItem.eq(index).showHide('show');
			//处理按钮
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');
			this.now = index;
		},
		_getCorrectIndex:function(index){
			if(index<0) return this.itemLength-1;
			if(index>= this.itemLength) return 0;
			return index;
		},
		autoplay:function(){
			this.timer = setInterval(function(){
				this.$controlBtns.eq(1).trigger('click')
			},this.options.interval)
		},
		pause:function(){
			clearInterval(this.timer);
		}
	};
	Carousel.DEFAULTS = {
		js:true,
		mode:'fade',
		slide:false,
		activeIndex:2,
		interval:1000
	};
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				$elem = $(this);
				var carousel = $elem.data('carousel');
				if(!carousel){
					options = $.extend({},Carousel.DEFAULTS,options)
					carousel = new Carousel($elem,options);
					$elem.data('carousel',carousel)
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]()
				}
				
			})
		}
	})
})(jQuery);