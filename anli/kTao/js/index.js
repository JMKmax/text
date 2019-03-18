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

	function getDataOnce($elem,url,cb){
		var data = $elem.data(url);
		if(!data){
			$.getJSON(url,function(resData){
				$elem.data(url,resData)
				cb(resData)
			})
		}else{
			cb(data)
		}
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





	//处理轮播图懒加载共通
	function carouselLazyLoad($elem){
		var item = {}//{0:loaded,1:loaded}
		var totalItemNum = $elem.find('.carousel-item').length;
		var totalLoadNum = 0;
		var loadFn = null;
		$elem.on('carousel-show',loadFn = function(ev,index,elem){
			// console.log('carousel-show',index,elem)
			console.log('aaa')
			if(item[index] != 'loaded'){
				$elem.trigger('carousel-load',[index,elem])
			}	
		});
		//执行加载
		$elem.on('carousel-load',function(ev,index,elem){
			console.log('carousel-load',index)
			var $imgs = $(elem).find('.carousel-img');
			totalLoadNum++;
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl)
				},function(imgUrl){
					$img.attr('src','images/focus-carousel/placeholder.png')
				});
				item[index] = 'loaded';
				if(totalLoadNum == totalItemNum){
					$elem.trigger('carousel-loaded')
				}	
			})
		});
		//加载结束
		$elem.on('carousel-loaded',function(){
			$elem.off('carousel-show',loadFn)
		})
	};


	//处理轮播图
	// 开始加载
	var $carouselWrap = $('.focus .carousel-wrap');
	carouselLazyLoad($carouselWrap);
	$carouselWrap.carousel({});
	//今日热销
	// 开始加载
	var $todaysCarousel = $('.todays .carousel-wrap');
	carouselLazyLoad($todaysCarousel);
	$todaysCarousel.carousel({});


	//楼层
	var $floor = $('.floor');

	//处理楼层图片懒加载共通
	function floorImgLazyLoad($elem){
		var item = {}//{0:loaded,1:loaded}
		var totalItemNum = $elem.find('.floor-img').length;
		var totalLoadNum = 0;
		var loadFn = null;
		$elem.on('tab-show',loadFn = function(ev,index,elem){
			// console.log('carousel-show',index,elem)
			console.log('aaa')
			if(item[index] != 'loaded'){
				$elem.trigger('tab-load',[index,elem])
			}	
		});
		//执行加载
		$elem.on('tab-load',function(ev,index,elem){
			console.log('carousel-load',index)
			var $imgs = $(elem).find('.floor-img');
			
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl)
				},function(imgUrl){
					$img.attr('src','images/focus-carousel/placeholder.png')
				});
				item[index] = 'loaded';
				totalLoadNum++;
				console.log(totalLoadNum,totalItemNum)
				if(totalLoadNum == totalItemNum){
					$elem.trigger('tab-loaded')
				}
				
			})
			
		});
		//加载结束
		$elem.on('tab-loaded',function(){
			$elem.off('tab-show',loadFn)
		})
	};

	//判断元素是否进入可视区
	var $win = $(window);
	var $doc = $(document);

	//楼层Html懒加载
	
	function buildFloorHtml(onceFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeadHtml(onceFloorData);
		html += buildFloorBodyHtml(onceFloorData);
		html += '</dic>'
		return html;
	}
	function buildFloorHeadHtml(onceFloorData){
		var html = '';
		html += '<div class="floor-hd">';
		html += '	<h2 class="floor-title fl">';
		html += '		<span class="floor-title-num">'+onceFloorData.num+'F</span>';
		html += '		<span class="floor-title-text">'+onceFloorData.text+'</span>';
		html += '	</h2>';
		html += '	<ul class="tab-item-wrap fr">';
		for(var i = 0;i<onceFloorData.tabs.length;i++){
			html += '		<li class="fl">';
			html += '			<a class="tab-item" href="javascript:;">'+onceFloorData.tabs[i]+'</a>';
			html += '		</li>';
			if(i != onceFloorData.tabs.length-1){
				html += '		<li class="fl tab-divider"></li>';
			}
		}
		html += '	</ul>';
		html += '</div>';
		return html;
	}
	function buildFloorBodyHtml(onceFloorData){
		var html = '';
		html += '<div class="floor-bd">';
		for (var i = 0;i<onceFloorData.items.length;i++){
			html += '	<ul class="tab-panel clearfix">';
			for(var j = 0;j<onceFloorData.items[i].length;j++){
				html += '		<li class="floor-item fl">';
				html += '			<p class="floor-item-pic">';
				html += '				<a href="#">';
				html += '					<img class="floor-img" src="images/floor/loading.gif" data-src="images/floor/'+onceFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
				html += '				</a>';
				html += '			</p>';
				html += '			<p class="floor-item-name">';
				html += '				<a class="link" href="#">'+onceFloorData.items[i][j].name+' </a>';
				html += '			</p>';
				html += '			<p class="floor-item-price">￥'+onceFloorData.items[i][j].price+' </p>';
				html += '		</li>';
			}
			html += '	</ul>';
		}
		html += '</div>';
		return html;
	}


	function floorHtmlLazyLoad(){
		var item = {}//{0:loaded,1:loaded}
		var totalItemNum = $floor.length;
		var totalLoadNum = 0;
		var loadFn = null;
		$doc.on('floor-show',loadFn = function(ev,index,elem){
			// console.log('carousel-show',index,elem)
			console.log('aaa')
			if(tem[index] != 'loaded'){
				$doc.trigger('floor-load',[index,elem])
			}	
		});
		//执行加载
		$doc.on('floor-load',function(ev,index,elem){
			console.log('carousel-load',index)
			//加载Html
			//1.生成Html
			getDataOnce($doc,'data/floor/floorData.json',function(data){
				var html = buildFloorHtml(data[index]);
				//1.加载html;
				$(elem).html(html)
				//2.加载图片
				floorImgLazyLoad($(elem))
				//3.激活选项卡
				$(elem).tab({});
			});
				item[index] = 'loaded';
				console.log(totalLoadNum,totalItemNum)
				if(totalLoadNum ==totalItemNum){
					$doc.trigger('floor-loaded')
				}	
			
		});
		//加载结束
		$elem.on('tab-loaded',function(){
			$elem.off('tab-show',loadFn)
		})
	};


	function isVisible($elem){
		return ($win.height + $win.scrollTop() > $elem.offset().top && $win.scrollTop < $elem.offset().top + $elem.height())
	}

	$doc.on('floor-show',function(ev,index,elem){
		console.log(index,elem)
	})
	function timeToShow(){
		$floor.each(function(index,elem){
			if(isVisible($(elem))){
				$doc.trigger('floor-show',[index,elem])
			}
		})
	};

	$win.on('scroll resize load',function(){
		clearTimeout($floor.showFloorTimer);
		$floor.showFloorTimer = setTimeout(timeToShow,200)
	})
	/*
	$floor.on('tab-show',function(ev,index,elem){
		console.log(index,elem)
	})
	*/
	$floor.each(function(){
		floorImgLazyLoad($(this))
	})
	//$floor.tab({});
})(jQuery);