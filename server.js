var express = require('express');
var mongoDB = require('mongoskin');

var db = mongoDB.db('mongodb://localhost/mydb?auto_reconnect=true',{
    safe: true});

db.bind("planeten");

var planetenCollection = db.planeten;

planetenCollection.insert([
{
    Name: "Merkur",
    Durchmesser: "4879",
    Entfernung: "58"
},{
    Name: "Venus",
    Durchmesser: "12103",
    Entfernung: "108"
},{
    Name: "Erde",
    Durchmesser: "12734",
    Entfernung: "150"
},{
    Name: "Mars",
    Durchmesser: "6772",
    Entfernung: "228"
},{
    Name: "Jupiter",
    Durchmesser: "114632",
    Entfernung: "778"
},{
    Name: "Saturn",
    Durchmesser: "12734",
    Entfernung: "1433"
},{
    Name: "Uranus",
    Durchmesser: "50532",
    Entfernung: "2872"
},{
    Name: "Neptun",
    Durchmesser: "49105",
    Entfernung: "4495"                       
},function (err, planeten){
     if (err){
            next(err);
        }else{
            res.writeHead(200,'OK');
            res.write('Daten wurden gespeichert');
            res.end(JSON.stringify(planten));
        }
}]);
                

/*
* Json Array mit Objekten
*/
planeten = [
{ "Name":"Merkur" , "Durchmesser":"4879" , "Entfernung":"58" }, 
{ "Name":"Venus" , "Durchmesser":"12103" , "Entfernung":"108"}, 
{ "Name":"Erde" , "Durchmesser":"12734" , "Entfernung":"150"},
{ "Name":"Mars" , "Durchmesser":"6772" , "Entfernung":"228" }, 
{ "Name":"Jupiter" , "Durchmesser":"114632" , "Entfernung":"778"}, 
{ "Name":"Saturn" , "Durchmesser":"12734" , "Entfernung":"1433"},
{ "Name":"Uranus" , "Durchmesser":"50532" , "Entfernung":"2872" }, 
{ "Name":"Neptun" , "Durchmesser":"49105" , "Entfernung":"4495"}
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
app.get('/planeten', function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text/html'});
    
    /*
    Daten aus der DB abrufen
    */
    planetenCollection.findItemd(function (err, result){
        if (err)
            next(err);
        
    else{
        res.writeHead(200,{
            'Content-Type': 'application/json'});
        res.end(JSON.stringify(planten));}
    });
});  
    
/*	res.write('<table border="1">');
	res.write('<tr><th>Name</th><th>Durchmesser</th><th>Entfernung</th>');
		 for (var i = 0; i < planeten.length; i++) {
			res.write("<tr><td>" + planeten[i].Name + "</td><td>" + planeten[i].Durchmesser + " km </td><td>" + planeten[i].Entfernung + " Mio km</td></tr>");
		}
	res.write('</table>');
	res.end();
});
/*
/*
* Ankommenden POST auf /planeten zu planeten Array hinzufuegen und auf Konsole ausgeben
*/
app.post('/planeten', function(req, res, next){
	
    planetenCollection.insert(req.body, function (err, result){
        if (err){
            next(err);
        }else{
            res.writeHead(200,'OK');
            res.write('Daten wurden gespeichert');
            res.end();
        }
    });
});
    
    /*
    var empfangen = JSON.stringify(req.body);
	planeten.push(req.body);
	console.log("Objekt hinzugefuegt: " + empfangen);
	res.end();
    /*
});

/*
* Server an Port 3000 binden
*/
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});