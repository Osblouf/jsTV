var socket = io.connect('http://192.168.1.24:8080');

//at connection
socket.on('connect', function(data){
	socket.emit('remote', 'ready');
	$("#connect").text("connecting...");});

//tv connected
socket.on('tv', function(data){
	if(data == 'ok'){
		//$("#connect").textContent="connected";}});
		$("#connect").text("connected");}});

//if tv disconnected
socket.on('screen_disconnected', function(){
	$("#connect").text("disconnected");});
	//$("#connect").textContent="disconnected";});

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
$('#commandButton').on('click', function (){
	text_field = $("#commandInput").val();
	socket.emit('remote', text_field);});
