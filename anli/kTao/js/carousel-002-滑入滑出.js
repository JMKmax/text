;(function($){

	function Carousel($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.itemLength = this.$carouselItem.length;
		this.now = _getCorrectIndex(this.options.activeIndex);
		this.$btns = this.$elem.find('.btn-item');
		this.$controlBtns = this.$elem.find('.control');
		this.timer = 0;
		//初始化
		this.init();
	}

	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			var _this = this;
			if(this.options.slide){
				//隐藏所有的页面
				this.$elem.addClass('slide');
				//显示默认的第一张
				this.$carouselItem.eq(this.now).css({left:0});
				this.itemWidth = this.$carouselItem.eq(this.now).width();
				//初始化showhide事件
				this.$carouselItem.move(this.options)
				this.tab = this._slide;
			}else{
				//隐藏所有的页面
				this.$elem.addClass('fade');
				//显示默认的第一张
				this.$carouselItem.eq(this.now).show();
				//初始化showhide事件
				this.$carouselItem.showHide(this.options)
				//绑定事件
				this.tab = this._fade;
			};
				//显示默认的按钮
				this.$btns.eq(this.now).addClass('active');
				//绑定事件
				this.$elem
				.hover(function(){
					this.$controlBtns.addClass('active')
				}.bind(this),function(){
					this.$controlBtns.removeClass('active')
				}.bind(this))
				.on('click','.control-left',function(){
					this.tab(_getCorrectIndex(this.now-1),-1);
				}.bind(this))
				.on('click','.control-right',function(){
					this.tab(_getCorrectIndex(this.now+1),1);
				}.bind(this))
				//监听底部指示按钮
				this.$btns.on('click',function(){
					_this.tab(_this.$btns.index($(this)))
				});
				//自动播放
				if(this.options.interval){
					this.autoplay();
					this.$elem.hover($.proxy(this.autoplay,this),$.proxy(this.pause,this))
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
		_slide:function(index,direction){
			//index代表即将显示的
			//direction代表方向，-1代表右滑，1代表左滑
			if(this.now == index) return;
			if(!direction){
				if(index > this.now){
					direction = 1
				}else{
					direction = -1
				}
			}
			//把即将显示的放在容器的右边或者左边
			this.$carouselItem.eq(index).css({left:direction * this.itemWidth })
			//把当前的移除
			this.$carouselItem.eq(this.now).move('x',-1 * direction * this.itemWidth)
			//把即将显示的放入容器内
			this.$carouselItem.eq(index).move('x',0)
			//处理按钮
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');
			this.now = index;
		}
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