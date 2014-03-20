var http = require('http');
var url = require('url');
var querystring = require('querystring');

/*
* HTML Template für Formular
*/
var formularHTML =
		'<html><head><title>Planeten</title></head>' +
		'<body>' +
		'<form action="/planeten" method="POST">' +
		'Planet: <input name="Name" type="text"><br>' +
		'Durchmesser: <input name="Durchmesser" type="text"><br>' +
		'Entfernung: <input name="Entfernung" type="text"><br>' +
		'<input name="submit" type="submit">' +
		'</form>' +
		'</body></html>';

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
*/
http.createServer(function (req, res) {

	/*
	* Prüfen ob die Seite ueber http://localhost:8124/planeten aufgerufen wurde. 
	*/
    var pfad = url.parse(req.url).pathname;
    if(pfad!='/planeten'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Errror Falscher Pfad <br>Klicken Sie: <a href="/planeten">Hier</a>');
        res.end();
        }
    
	/*
	* Empfange POST, decodiere POST zu Json, push Json zu planeten Array
	*/
	var body = "";
	req.on('data', function (chunk) {
		body += chunk.toString();
		decodebody = querystring.parse(body);
		planeten.push(decodebody);
	});
	
	/*
	* Tabelle ausgeben
	*/
	req.on('end', function () {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<table border="1">');
		res.write('<tr><th>Name</th><th>Durchmesser</th><th>Entfernung</th>');
			 for (var i = 0; i < planeten.length; i++) {
				res.write("<tr><td>" + planeten[i].Name + "</td><td>" + planeten[i].Durchmesser + "</td><td>" + planeten[i].Entfernung + "</td></tr>");
			}
			
		res.write('</table>');
		res.end(formularHTML);
	});
	
    
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');