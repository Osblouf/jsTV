//modules
var express = require('express');
var app = express();
var server = require('http').createServer(app),
	engine = require('ejs').__express,
	io = require('socket.io').listen(server),
	spawn = require('child_process').spawn,
	fs = require('fs');

//express modules
app.use(express.logger('dev'))
	.use(express.static(__dirname + '/public'));

//env var
app.set('port', 8080);
io.set('log level', 1);

//routes
app.get('/', function(req, res)
{
	res.render('error.ejs');
});
app.get('/remote', function(req, res)
{
	res.render('remote.ejs');
});
app.get('/tv', function(req, res)
{
	var films = fs.readFileSync('listFilm.txt').toString().split("\n");
	var images = fs.readFileSync('listImages.txt').toString().split("\n");
	var jeux = fs.readFileSync('listJeux.txt').toString().split("\n");
	films.pop();
	images.pop();
	jeux.pop();
	res.render('tv.ejs', {films: films, images:images, jeux: jeux});
});

//run the server
server.listen(app.get('port'), function()
{
	console.log('Express server started on port ' + app.get('port'));
	console.log("Start the screen...");
	spawn('chromium-browser', ['--kiosk', 'http://localhost:8080/tv']);
	//spawn('chromium-browser', ['http://localhost:8080/tv']);
});

//io socket events
var remote_socket, tv_socket
io.sockets.on('connection', function(socket)
{
	//screen messages processing
	socket.on('screen', function(data)
	{
		var datas = data.split(" ");
		switch (datas[0])
		{
			//the screen is ready
			case "ready":
				tv_socket = socket;
				console.log("Screen connected...");
				//if the remote isn't connected, prevent it that the screen is ready
				if(remote_socket != undefined){
					remote_socket.emit('tv', 'ok');}
				else{
					tv_socket.emit('remote_disconnected');}
				break;
			case "film":
				console.log("omxplayer Videos/" + [datas[1]]);
				spawn('omxplayer', ["Videos/" + [datas[1]]]);
				break;
			case "jeu":
				console.log("Run doom...");
				spawn('Jeux/' + [datas[1]]);
				console.log("Ok");
				break;
			default:
				console.log("Try running : " + [datas[0]] + " " + [datas[1]]);
		}
	});
	//remote messages processing
	socket.on('remote', function(data)
	{
		//console.log("Data from remote : " + data);
		switch (data)
		{
			//remote connection
			case "ready":
				remote_socket = socket;
				console.log("Remote connected...");
				//run the screen :
				if(tv_socket == undefined){
					//console.log("Start the screen...");
					//spawn('chromium-browser', ['--kiosk', 'http://192.168.1.81:8080/tv']);
				}
				else{
				        console.log("Send ok to remote");
					remote_socket.emit('tv', 'ok');
					tv_socket.emit('remote', 'reconnect');}
				break;
			default:
				if(tv_socket != undefined){
					console.log("Send \"" + data + "\" to the screen...");
					tv_socket.emit('remote', data);}
				break;
		}
	});
	//disconnection from the tv
	if(tv_socket != undefined){
		tv_socket.on('disconnect', function(){
			console.log("Screen disconnected.");
			if(remote_socket != undefined){
				remote_socket.emit('screen_disconnected');}});}
	//disconnection from the remote
	if(remote_socket != undefined){
		remote_socket.on('disconnect', function(){
			console.log("Remote disconnected.");
			if(tv_socket != undefined){
				tv_socket.emit('remote_disconnected');}});}
});
