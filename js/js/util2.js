function pack(obj,options,islinear,fn){


		if(islinear == undefined){
			islinear = true;
		}
		clearInterval(obj.timer);
		var symbol = 0;
		obj.timer = setInterval(function(){


			var isStopAll = true;

			for(var attr in options){

				var isStop = false;
				var clarity = parseFloat(getComputedStyle(obj,false)[attr]);
				if(attr == 'opacity'){
					clarity =Math.round( clarity * 100);
				}
				if(islinear){
					if((clarity-options[attr])<=0){
					symbol = 10;
					}else{
					symbol = -10;
					}
					if(Math.abs(options[attr]-clarity)<Math.abs(symbol)){
						if(attr == 'opacity'){
							obj.style.opacity = options[attr] / 100;
						}else{
							obj.style[attr] = options[attr] + 'px';
						}
						isStop = true;
					}else{
						isStopAll=false;
					}
				}else{
					if((options[attr]-clarity)>0){
					symbol =Math.ceil((options[attr]-clarity)/10);
					}else{
					symbol =Math.floor((options[attr]-clarity)/10);
					}
					if(!symbol){
						isStop = true;
					}else{
						isStopAll=false
					}
				}
				
				if(!isStop){
					
					if(attr == 'opacity'){
						obj.style.opacity = (clarity + symbol)/100;
					}else{
						obj.style[attr] = clarity + symbol + 'px';
					}
				
				}
				if(isStopAll){
				clearInterval(obj.timer);
					if(typeof fn == 'function'){
						fn()
					}
				}
			}

			
		},30)
	}