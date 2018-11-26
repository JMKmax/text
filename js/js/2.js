
window.onload = function(){
	var obox = document.getElementById('box');
	function tochange(){
		obox.style.width = '200px';
	}

	obox.onclick = tochange;
}