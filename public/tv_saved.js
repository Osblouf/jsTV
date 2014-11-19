var socket = io.connect('http://127.0.0.1:8080');

socket.on('connect', function(data){
	socket.emit('screen', 'ready');
	document.getElementById("connect").textContent="connecté.";
});

socket.on('remote', function(data){
	switch(data)
	{
		case "reconnect":
			document.getElementById("connect").textContent="connecté.";
			break;
		case "left":
			var menu = $(".menu_selec");
			if($(menu).attr("id") === "menu_1"){
				$(menu).removeClass("menu_selec");
				$(menu).addClass("menu");
				$("#menu_3").removeClass("menu");
				$("#menu_3").addClass("menu_selec");}
			else{
				$(menu).prev().removeClass("menu");
				$(menu).prev().addClass("menu_selec");
				$(menu).removeClass("menu_selec");
				$(menu).addClass("menu");}
			break;
		case "right":
			var menu = $(".menu_selec");
			if($(menu).attr("id") === "menu_3"){
				$(menu).removeClass("menu_selec");
				$(menu).addClass("menu");
				$("#menu_1").removeClass("menu");
				$("#menu_1").addClass("menu_selec");}
			else{
				$(menu).next().removeClass("menu");
				$(menu).next().addClass("menu_selec");
				$(menu).removeClass("menu_selec");
				$(menu).addClass("menu");}
			break;
		case "up":
			var menu = $(".menu_selec").attr("id")
			if(menu === "menu_1"){
				var sel = $(".sel_film");
				if($(sel).attr("id") === "start_film"){
					$("#end_film").prev().addClass("sel_film");}
				else if($(sel).prev().attr("id") === "start_film"){
					$("#end_film").prev().addClass("sel_film");}
				else{
					$(sel).prev().addClass("sel_film");}
				$(sel).removeClass("sel_film");	
			}
			else if(menu === "menu_2"){
				var sel = $(".sel_image");
				if($(sel).attr("id") === "start_image"){
					$("#end_image").prev().addClass("sel_image");}
				else if($(sel).prev().attr("id") === "start_image"){
					$("#end_image").prev().addClass("sel_image");}
				else{
					$(sel).prev().addClass("sel_image");}
				$(sel).removeClass("sel_image");	
			}
			else{
				var sel = $(".sel_jeu");
				if($(sel).attr("id") === "start_jeu"){
					$("#end_jeu").prev().addClass("sel_jeu");}
				else if($(sel).prev().attr("id") === "start_jeu"){
					$("#end_jeu").prev().addClass("sel_jeu");}
				else{
					$(sel).prev().addClass("sel_jeu");}
				$(sel).removeClass("sel_jeu");	
			}
			break;
		case "down":
			var menu = $(".menu_selec").attr("id");
			if(menu === "menu_1"){
				var sel = $(".sel_film");
				if($(sel).next().attr("id") === "end_film"){
					$("#start_film").next().addClass("sel_film");}
				else{
					$(sel).next().addClass("sel_film");}
				$(sel).removeClass("sel_film");	
			}
			else if(menu === "menu_2"){
				var sel = $(".sel_image");
				if($(sel).next().attr("id") === "end_image"){
					$("#start_image").next().addClass("sel_image");}
				else{
					$(sel).next().addClass("sel_image");}
				$(sel).removeClass("sel_image");	
			}
			else{
				var sel = $(".sel_jeu");
				if($(sel).next().attr("id") === "end_jeu"){
					$("#start_jeu").next().addClass("sel_jeu");}
				else{
					$(sel).next().addClass("sel_jeu");}
				$(sel).removeClass("sel_jeu");	
			}
			break;	
		case "doubleTap":
			var menu = $(".menu_selec").attr("id");
			if(menu === "menu_1"){
				socket.emit('screen', 'film ' + $(".sel_film").text());
			}
			else if(menu === "menu_2"){
				socket.emit('screen', 'image ' + $(".sel_image").text());
			}
			else{
				socket.emit('screen', 'jeu ' + $(".sel_jeu").text());
			}
			break;
		default:
			document.getElementById("last").textContent=data;
			break;
	}
});

socket.on('remote_disconnected', function(data){
	document.getElementById("connect").textContent="déconnecté.";
});	
		
