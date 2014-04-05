var express = require('express');
var mongoDB = require('mongoskin');
var faye = require('faye');
var http = require('http');

var db = mongoDB.db('mongodb://localhost:27017/planeten?auto_reconnect=true', {
	safe: true
});
db.bind("planeten");
var planetenCollection = db.planeten;

/*
* Webserver starten
* Verzeichnis fuer den direkten Zugriff von Aussen freigeben
* Request Information parsen
*/
var app = express();
var server = http.createServer(app);

var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});
bayeux.attach(server);
var pubClient = bayeux.getClient();

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.json());
	app.use(function(err, req, res, next){
		console.err(error.stack);
		res.end(error.messages);
	});	
});
/*
* Bei GET auf /planeten Json ausgeben
*/
app.get('/planeten', function(req, res){
	planetenCollection.findItems(function(err, result){
		if(err){
			next(err);
		}else{
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(result));
		}
	});
});
app.post('/planeten', function(req, res){
        //An alle Abonnenten freigeben
        var publication = pubClient.publish('/planeten', req.body);
		
        //Namen des hinzugefuegten Planeten auf der Konsole ausgeben
        publication.then(function(){
			//res.writeHead(200,"OK");
            console.log('gepusht: '+req.body.name);
        },
        function (error){
            next(error)
        }); 
		//In Datenbank speichern	
		planetenCollection.insert(req.body, function(err, planeten){
			if(err){
				next(err);
		}else{
			var empfangen = JSON.stringify(req.body);
			console.log("Objekt hinzugefuegt: " + empfangen);
			res.end();
		}
	});
});

/*
* Server an Port 3000 binden
*/
server.listen(3000, function() {
    console.log('Listening on port 3000');
});