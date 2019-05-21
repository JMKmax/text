;(function($){
	//顶部下拉菜单
	function loadHtmlOnce($elem,cb){
		var loadUrl = $elem.data('load');
		if(!loadUrl) return;
		var $isLoad = $elem.data('isLoad');
		if($isLoad) return;
		
		$.getJSON(loadUrl,function(data){
			typeof cb == 'function' && cb($elem,data)
		})
	}

	//加载图片
	function loadImage(imgUrl,success,error){
		var image = new Image();
		image.onload = function(){
			typeof success == 'function' && success(imgUrl)
		};
		image.onerror = function(){
			typeof error == 'function' && error(imgUrl)
		}
		image.src = imgUrl;
	}



	var $menuDropdown = $('.top .dropdown');
	
	$menuDropdown.on('dropdown-show',function(){
		loadHtmlOnce($(this),buildMenuLayer)
	});
	function buildMenuLayer($elem,data){
		var html = '';
			for(var i = 0;i<data.length;i++){
				html +='<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>'
			}
			setTimeout(function(){
				$elem.find('.dropdown-layer').html(html);
				$elem.data('isLoad',true)
			},1000)
	};
	$menuDropdown.dropdown({
		delay:200
		// eventName:'click'
	});

	//search框的实现
	var $search = $('.header .search');
	$search.on('getData',function(ev,data){
		var html = getSearchData(data,5)
		$search.search('appendHtml',html);
		if(html == ''){
			$search.search('hideLayer')
		}else{
			//显示下拉层
			$search.search('showLayer')
		}
	});
	$search.on('getNoData',function(){
		$search.search('appendHtml','');
		$search.search('hideLayer');
	});
	function getSearchData(data,maxNum){
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i >= maxNum) break;
			html += '<li class="search-item">'+data.result[i][0]+'</li>'
		};
		return html;
	}
	$search.search();
	//分类列表
	var $categoryDropdown = $('.category .dropdown');
	$categoryDropdown.on('dropdown-show',function(){
		loadHtmlOnce($(this),buildCategoryLayer)
	});
	function buildCategoryLayer($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html += '<a href="#" class="link">'+data[i].items[j]+'</a>';
			}
			html += '</dd></dl>';
		}
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoad',true)
		},1000)
	};
	$categoryDropdown.dropdown({
		delay:200
	})
	//处理轮播图
	/*
	var $carouselWrap = $('.carousel .carousel-wrap');
	var item = {}//{0:loaded,1:loaded}
	var totalItemNum = $carouselWrap.find('.carousel-item').length;
	var totalLoadNum = 0;
	var loadFn = null;
	$carouselWrap.on('carousel-show',loadFn = function(ev,index,elem){
		// console.log('carousel-show',index,elem)
		if(item[index] != 'loaded'){
			var $img = $(elem).find('.carousel-img');
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(imgUrl){
				$img.attr('src',imgUrl)
			},function(imgUrl){
				$img.attr('src','images/focus-carousel/placeholder.png')
			});
			item[index] = 'loaded';
			totalLoadNum++;
			if(totalLoadNum == totalItemNum){
				$carouselWrap.off('carousel-show',loadFn)
			}
		}	
	})
	*/
	// 开始加载
	var $carouselWrap = $('.carousel .carousel-wrap');
	$carouselWrap.item = {}//{0:loaded,1:loaded}
	$carouselWrap.totalItemNum = $carouselWrap.find('.carousel-item').length;
	$carouselWrap.totalLoadNum = 0;
	$carouselWrap.loadFn = null;
	$carouselWrap.on('carousel-show',$carouselWrap.loadFn = function(ev,index,elem){
		// console.log('carousel-show',index,elem)
		if($carouselWrap.item[index] != 'loaded'){
			$carouselWrap.trigger('carousel-load',[index,elem])
		}	
	});
	//执行加载
	$carouselWrap.on('carousel-load',function(ev,index,elem){
		var $img = $(elem).find('.carousel-img');
		var imgUrl = $img.data('src');
		loadImage(imgUrl,function(imgUrl){
			$img.attr('src',imgUrl)
		},function(imgUrl){
			$img.attr('src','images/focus-carousel/placeholder.png')
		});
		$carouselWrap.item[index] = 'loaded';
		$carouselWrap.totalLoadNum++;
		if($carouselWrap.totalLoadNum == $carouselWrap.totalItemNum){
			$carouselWrap.trigger('carousel-loaded')
		}
	});
	//加载结束
	$carouselWrap.on('carousel-loaded',function(){
		$carouselWrap.off('carousel-show',$carouselWrap.loadFn)
	})
	$carouselWrap.carousel({});

})(jQuery);