var express = require('express');
var mongoDB = require('mongoskin');
var faye = require('faye');
var http = require('http');
var mail = require('sendmail')();
var util = require('util');
var im = require('imagemagick');
var formidable = require('formidable');
var db = mongoDB.db('mongodb://localhost:27017/diningDB?auto_reconnect=true', {
	safe: true
});
db.bind("user");
db.bind("services");
db.bind("cards")
var UserCollection = db.user
var ServiceCollection = db.services
var CardsCollection = db.cards
/*
* Webserver starten
* Verzeichnis fuer den direkten Zugriff von Aussen freigeben
* Request Information parsen
*/
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(function(err, req, res, next){
	console.err(error.stack);
	res.end(error.messages);
});	
app.use(express.cookieParser());

app.post('/uploads', function (req, res) {
    var form = new formidable.IncomingForm(), files = [], fields = [];
    
    form.uploadDir = 'public/uploads/fullsize/';
    thumbnailDir = 'public/uploads/thumbs/';
    
    form.keepExtensions = true;
    
    form.parse(req, function(err, fields, files) {

    	pathdir = files.image.path.replace('public\\','\\');
    	im.resize({
      		srcPath: files.image.path,
      		dstPath: 'public/uploads/thumbs/'+files.image.name,
      		width: 250,
    	}, function(err, stdout, stderr){
      		if (err) throw err;
      		console.log('Thumbnail created');
    	});

    	CardsCollection.insert({name: files.image.name, path: pathdir, thumb: 'public/uploads/thumbs/'+files.image.name }, function(err, cards){
			if(err){
				console.log(err);
			}else{
				var empfangen = JSON.stringify(req.body);
				console.log("Karte hinzugefuegt: " + empfangen);
			}
	});

		res.writeHead(200, {'content-type': 'text/html'});
		res.write('received upload:\n\n');
		res.end( "<img src='" + pathdir + "' alt='' />" );
  	});
});


app.post('/auth', function(req, res){
	var BSON = mongoDB.BSONPure;
	var o_id = new BSON.ObjectID(req.body.id);
	UserCollection.find({_id:o_id}).toArray(function(err, result) {
		if(err){
				next(err);
		}else{
			if(result[0] != null){
				console.log("USER: "+result[0].name+" validating...");
				if(req.body.name == result[0].name){
					console.log("Validate: OK");
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end();
				}else{
					console.log("Validate: ERROR");
					res.writeHead(401, {'Content-Type': 'text/plain'});
					res.end('Ungültiges Cookie');
				}
			}
		}
	});
});
app.post('/login', function(req, res){
		//In Datenbank speichern
		UserCollection.find({email:req.body.email}).toArray(function(err, result) {
		if(result[0] != null){
			console.log("USER: "+result[0].name+" try log in...");
			if(req.body.pass == result[0].pass){
				var jimData = {id:result[0]._id, name:result[0].name};
				res.cookie('sessid', jimData);
				console.log("login successfull");
				res.writeHead(200, {'Content-Type': 'text/plain'});
			}else{
				res.writeHead(401, {'Content-Type': 'text/plain'});
				console.log("Bad password");
				res.end('Das eingegebene Passwort stimmt nicht mit der Email Adresse überein.');
			}
		}else{
			res.writeHead(404, {'Content-Type': 'text/plain'});
			console.log("User not found");
			res.end('Die eingegebene Email Adresse wurde nicht gefunden.');
		}
		res.end('Erfolgreich angemeldet');
		});
});
app.post('/adduser', function(req, res){
		//In Datenbank speichern	
		UserCollection.insert(req.body, function(err, user){
			if(err){
				next(err);
		}else{
			var empfangen = JSON.stringify(req.body);
			var email = req.body.email;
			var name = req.body.name;
			console.log("User hinzugefuegt: " + empfangen);
			 mail({
				   from: 'Registrierung@simon-zemke.de',
				   to: email,
				   subject: 'Registrierung',
				   content: 'Hallo '+name
			   },
			   function(err,response){
				  if(err){
					 console.log(err);
				  }
				  console.dir(response);
			}); 
			res.end();
		}
	});
});
app.post('/addservice', function(req, res){
		//In Datenbank speichern	
		ServiceCollection.insert(req.body, function(err, user){
			if(err){
				next(err);
		}else{
			var empfangen = JSON.stringify(req.body);
			console.log("User hinzugefuegt: " + empfangen);
			res.end();
		}
	});
});
app.get('/getservice', function(req, res){
	ServiceCollection.findItems(function(err, result){
		if(err){
			next(err);
		}else{
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(result));
		}
	});
});
app.get('/getOneService/:id', function(req, res){
	console.log(req.param("id"));
	var BSON = mongoDB.BSONPure;
	var o_id = new BSON.ObjectID(req.param("id"));
	ServiceCollection.findOne({_id: o_id}, function(err, result) {
		if(err){
			next(err);
		}else{
			console.log(result.phone);
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(result));
		}
});
});
/*
* Server an Port 3000 binden
*/
server.listen(3000, function() {
    console.log('Listening on port 3000');
});