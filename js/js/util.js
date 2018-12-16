
function pack(obj,attr,targe){
		clearInterval(obj.timer);
		var symbol = 0;
		obj.timer = setInterval(function(){

			var clarity = parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr == 'opacity'){
				clarity =Math.round( clarity * 100);
			}
			if((clarity-targe)<0){
				symbol = 10;
			}else{
				symbol = -10;
			}
			if(Math.abs(targe-clarity)<Math.abs(symbol)){
				if(attr == 'opacity'){
					obj.style.opacity = targe / 100;
				}else{
					obj.style[attr] = targe + 'px';
				}
				
				clearInterval(obj.timer);
			}else{
				if(attr == 'opacity'){
					obj.style.opacity = (clarity + symbol)/100;
				}else{
					obj.style[attr] = clarity + symbol + 'px';
				}
			
		}
		},30)
	}

function getScrollTop(){
	return  window.pageYOffset || document.documentElement.scrollTop
		 || document.body.scrollTop;
  	}
function getScrollLeft(){
	return  window.pageXOffset || document.documentElement.scrollLeft
		 || document.body.scrollLeft;
  	}
		

