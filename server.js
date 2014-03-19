var http = require('http');


var planeten = new Array();

planeten[0] = new Object();
planeten[0]["Name"]= "Merkur";
planeten[0]["Durchmesser"]= "4879 km";
planeten[0]["Entfernung"]= "58 Mio km";

planeten[1] = new Object();
planeten[1]["Name"]= "Venus";
planeten[1]["Durchmesser"]= "12103 km";
planeten[1]["Entfernung"]= "108 Mio km";

planeten[2] = new Object();
planeten[2]["Name"]= "Erde";
planeten[2]["Durchmesser"]= "12734 km";
planeten[2]["Entfernung"]= "150 Mio km";

planeten[3] = new Object();
planeten[3]["Name"]= "Mars";
planeten[3]["Durchmesser"]= "6772 km";
planeten[3]["Entfernung"]= "228 Mio km";

planeten[4] = new Object();
planeten[4]["Name"]= "Jupiter";
planeten[4]["Durchmesser"]= "138346 km";
planeten[4]["Entfernung"]= "778 Mio km";

planeten[5] = new Object();
planeten[5]["Name"]= "Saturn";
planeten[5]["Durchmesser"]= "114632 km";
planeten[5]["Entfernung"]= "1433 Mio km";

planeten[6] = new Object();
planeten[6]["Name"]= "Uranus";
planeten[6]["Durchmesser"]= "50532 km";
planeten[6]["Entfernung"]= "2872 Mio km";

planeten[7] = new Object();
planeten[7]["Name"]= "Neptun";
planeten[7]["Durchmesser"]= "49105 km";
planeten[7]["Entfernung"]= "4495 Mio km";


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
    
for (var i = 0; i < 7; i++) {
  res.write('<dl><dt>Planet ' + (i + 1) + '</dt>');
  for (var Eigenschaft in planeten[i])
    res.write('<dd>' + Eigenschaft + ': ' + planeten[i][Eigenschaft] + '</dd>');
  res.write('</dl>');
}
    
 res.end();
                  }).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');