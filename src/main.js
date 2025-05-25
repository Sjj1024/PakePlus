
	window.onload = function(){
			set_water_mark();
			};
	window.onresize = function(){
		   set_water_mark();
			};
	function set_water_mark(){
		let page_width = document.body.scrollWidth;
		let page_height = document.body.scrollHeight;
		
		cols = parseInt(page_width/ (240 + 100))+1;
		rows = parseInt(page_height/ (100 + 50))+1;
		let x, y;
		for (let i = 0; i < rows; i++){
			y=30+(100+50) * i;
			for(let j = 0; j < cols; j++){
				x = 30 + (240+100) * j;
		
				var new_div = document.createElement('div');
				new_div.innerHTML = "www.qytang.com<br>乾颐堂大路由出品";
				new_div.style.transform = "rotate(-45deg)";
				new_div.style.position = "absolute";
				new_div.style.left = x + 'px';
				new_div.style.top = y + 'px';
				new_div.style.overflow = "hidden";
				new_div.style.zIndex = "9999";
				new_div.style.pointerEvents="none";
				new_div.style.opacity = "0.2";
				new_div.style.fontSize = "30px";
				new_div.style.textAlign = "center";
				new_div.style.height = "100px";
				new_div.style.width = "245px";
				new_div.style.color = "#ff6666";
				document.body.appendChild(new_div);
	}
  }
}

function stop(){
return false;
}
document.oncontextmenu = stop;

document.getElementsByTagName('img')[0].onmousedown = function(e){
    e.preventDefault()
};

document.onmousemove=function(ev){
　　var oEvent=ev||event;
　　if(oEvent.preventDefault){
        oEvent.preventDefault();
    }else{
        oEvent.returnValue=false;
    }
}

