var http = require('http');
var url = require('url');

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

http.createServer(function (req, res) {

    var pfad = url.parse(req.url).pathname;
    
    if(pfad!='/planeten'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Errror Falscher Pfad <br>Klicken Sie: <a href="/planeten">Hier</a>');
        res.end();
        }

    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<table border=1>");
    res.write("<tr><th>Name</th><th>Durchmesser</th><th>Entfernung</th>");
for (var i = 0; i < 8; i++) {
  res.write("<tr><td>" + planeten[i].Name + "</td><td>" + planeten[i].Durchmesser + "</td><td>" + planeten[i].Entfernung + "</td></tr>");
}
 res.write("</table>");   
    
    res.write('<form action="/planeten" method="POST">');   
    res.write('Planet: <input name="name" type="text"><br>');  
    res.write('Durchmesser: <input name="durchmesser" type="text"><br>');
    res.write('Entfernung: <input name="entfernung" type="text"><br>');
    res.write('<input name="submit" type="submit">');
    res.write('</form>');   
    
        res.end();
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');