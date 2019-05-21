;(function($){
	var cache = {
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key] = val;
			this.count++;
		},
		getData:function(val){
			return this.data[key]
		}
	}
	function Search($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn');
		this.$seachInput = $elem.find('.search-input');
		this.$searchForm = $elem.find('.search-form');
		this.$searchLayer = $elem.find('.search-layer');
		this.Timer = 0;
		this.jqXHR = null;


		this.isLoaded = false;
		//初始化
		this.init();
		if(this.options.autocompelete){
			this.autocompelete();
		}
	}

	Search.prototype = {
		constructor:Search,
		init:function(){
			this.$searchBtn.on('click',$.proxy(this.submit,this))
			
		},
		submit:function(){
			if(this.getInputVal() == ''){
				return false;
			}
			this.$searchForm.trigger('submit')
		},
		getInputVal:function(){
			return $.trim(this.$seachInput.val());
		},
		autocompelete:function(){
			//1.监听输入框的输入事件
			this.$searchLayer.showHide(this.options)
			this.$seachInput.on('input',function(){
				//防止快速输入请求
				if(this.options.getDataDelay){
					clearTimeout(this.Timer)
					this.Timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.getDataDelay)
				}else{
					this.getData();
				}
			}.bind(this));
			//点击隐藏事件
			$(document).on('click',$.proxy(this.hideLayer,this));
			//获取焦点时显示下拉层；
			$('seachInput').on('focus',$.proxy(this.showLayer,this));
			//阻止冒泡
			$('seachInput').on('click',function(ev){
				ev.stoppropagation();
			})
			//事件代理的形式获取每一项
			var _this = this;
			this.$searchLayer.on('click','.search-item',function(){
				//获取下拉层中的每一项
				var val = $(this).html();
				_this.setInputVal(val);
				_this.submit()
			})
		},
		getData:function(){
			var inputVal = this.getInputVal();
			if(inputVal == ''){
				this.appendHtml('');
				this.hideLayer()
				return
			}
			if(cache.getData(inputVal)){
				this.$elem.trigger('getData',cache.getData(inputVal));
				return;
			}
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			this.jqXHR = $.ajax({
				url:this.options.url+inputVal,
				dataType:"jsonp",
				jsonp:'callback'
			})
			.done(function(data){
				this.$elem.trigger('getData',[data]);
				cache.addData(inputVal,data)
			}.bind(this))
			.fail(function(err){
				this.$elem.trigger('getNoData')
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
			}.bind(this))
		},
		showLayer:function(html){
			if(!this.isLoaded) return;
			this.$searchLayer.showHide('show')
		},
		appendHtml:function(html){
			this.$searchLayer.html(html);
			this.isLoaded = !!html;
		},
		hideLayer:function(html){
			this.$searchLayer.showHide('hide')
		},
		setInputVal:function(val){
			this.$seachInput.val(val.replace(/<[^<>]+>/g,''))
		}
	};
	Search.DEFAULTS = {
		autocompelete:true,
		url:"https://suggest.taobao.com/sug?code=utf-8&q=",
		js:true,
		mode:'fade',
		getDataDelay:200
	}
	$.fn.extend({
		search:function(options,val){
			return this.each(function(){
				$elem = $(this);
				var search = $elem.data('search');
				if(!search){
					options = $.extend({},Search.DEFAULTS,options)
					search = new Search($elem,options);
					$elem.data('search',search)
				}
				if(typeof search[options] == 'function'){
					search[options](val)
				}
				
			})
		}
	})
})(jQuery);