var express = require('express');

/*
* Json Array mit Objekten
*/
planeten = [
{ "Name":"Merkur" , "Durchmesser":"4879 km" , "Entfernung":"58 Mio km" }, 
{ "Name":"Venus" , "Durchmesser":"12103 km" , "Entfernung":"108 Mio km"}, 
{ "Name":"Erde" , "Durchmesser":"12734 km" , "Entfernung":"150 Mio km"},
{ "Name":"Mars" , "Durchmesser":"6772 km" , "Entfernung":"228 Mio km" }, 
{ "Name":"Jupiter" , "Durchmesser":"114632 km" , "Entfernung":"778 Mio km"}, 
{ "Name":"Saturn" , "Durchmesser":"12734 km" , "Entfernung":"1433 Mio km"},
{ "Name":"Uranus" , "Durchmesser":"50532 km" , "Entfernung":"2872 Mio km" }, 
{ "Name":"Neptun" , "Durchmesser":"49105 km" , "Entfernung":"4495 Mio km"}
]

/*
* Webserver starten
* Verzeichnis fuer den direkten Zugriff von Aussen freigeben
* Request Information parsen
*/
var app = express();
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.json());
});

/*
* Bei GET auf /planeten Tabelle ausgeben
*/
app.get('/planeten', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<table border="1">');
	res.write('<tr><th>Name</th><th>Durchmesser</th><th>Entfernung</th>');
		 for (var i = 0; i < planeten.length; i++) {
			res.write("<tr><td>" + planeten[i].Name + "</td><td>" + planeten[i].Durchmesser + "</td><td>" + planeten[i].Entfernung + "</td></tr>");
		}
	res.write('</table>');
	res.end();
});
	
/*
* Ankommenden POST auf /planeten zu planeten Array hinzufuegen und auf Konsole ausgeben
*/
app.post('/planeten', function(req, res){
	var empfangen = JSON.stringify(req.body);
	planeten.push(req.body);
	console.log("Objekt hinzugefuegt: " + empfangen);
	res.end();
});

/*
* Server an Port 3000 binden
*/
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});