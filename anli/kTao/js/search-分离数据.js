;(function($){

	function Search($elem,options){
		//罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn');
		this.$seachInput = $elem.find('.search-input');
		this.$searchForm = $elem.find('.search-form');
		this.$searchLayer = $elem.find('.search-layer');


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
			this.$seachInput.on('input',$.proxy(this.getData,this));
			//点击隐藏事件
			$(document).on('click',$.proxy(this.hideLayer,this));
			//获取焦点时显示下拉层；
			$('seachInput').on('focus',$.proxy(this.showLayer,this));
			//阻止冒泡
			$('seachInput').on('click',function(ev){
				ev.stoppropagation();
			})
		},
		getData:function(){
			var inputVal = this.getInputVal();
			if(inputVal == ''){
				this.appendHtml('');
				this.hideLayer()
				return
			}
			$.ajax({
				url:this.options.url+inputVal,
				dataType:"jsonp",
				jsonp:'callback'
			})
			.done(function(data){
				/*
				console.log(data);
				//根据数据生成html
				var html = '';
				for(var i = 0;i<data.result.length;i++){
					html += '<li class="search-item">'+data.result[i][0]+'</li>'
				};
				//生成的数据加载到html中
				this.appendHtml(html);
				if(html == ''){
					this.hideLayer()
				}else{
					//显示下拉层
					this.showLayer();
				}
				*/
				this.$elem.trigger('getData',[data])
			}.bind(this))
			.fail(function(err){
				// this.appendHtml('');
				// this.hideLayer()
				this.$elem.trigger('getNoData')
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
		}
	};
	Search.DEFAULTS = {
		autocompelete:true,
		url:"https://suggest.taobao.com/sug?code=utf-8&q=",
		js:true,
		mode:'fade'
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