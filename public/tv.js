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
		case "doubleTap":
			socket.emit('screen', 'lire /media/XKEY/A.avi');
		default:
			document.getElementById("last").textContent=data;
			break;
	}
});

socket.on('remote_disconnected', function(data){
	document.getElementById("connect").textContent="déconnecté.";
});	
		
