var socket = io.connect('http://192.168.1.91:8080');

//at connection
socket.on('connect', function(data){
	socket.emit('remote', 'ready');});

//tv connected
socket.on('tv', function(data){
	if(data == 'ok'){
		document.getElementById("connect").textContent="connected";}});

//if tv disconnected
socket.on('screen_disconnected', function(){
	document.getElementById("connect").textContent="disconnected";});

//process swipe events
$$('img').swipeLeft(function(){
	socket.emit('remote', 'left');});
$$('img').swipeRight(function(){
	socket.emit('remote', 'right');});
$$('img').swipeUp(function(){
	socket.emit('remote', 'up');});
$$('img').swipeDown(function(){
	socket.emit('remote', 'down');});
$$('img').doubleTap(function(){
	socket.emit('remote', 'doubleTap');});

//Send text
function send_text(){
	text_field = document.getElementById("command").value;
	socket.emit('remote', text_field);}
