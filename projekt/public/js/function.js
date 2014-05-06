/*
 * Favoriten
 * POST auf /favoriten
 * data enthält userid und kartenid
 */

function favoriten(s){
 var a = auth();
 console.log(a[0]._id);
 
 var data = {userid: a[0]._id, kartenid: s};
	$.ajax({
		type: 'POST',
		url: '/favoriten',
		data: JSON.stringify(data),
		contentType: 'application/json'
		}).done(function(){
			console.log("erfolgreich favorisiert");
		}).fail(function(e){
			alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
		});
}

/*
 * MeetUp
 * POST auf /meetup
 * data enthält userid und kartenid
 * userid ist hier optional um später gegebenfalls Absender anzugeben.
 */

function meetup(s){
 var a = auth();
 console.log(a[0]._id);
 
 var data = {userid: a[0]._id, kartenid: s};
	$.ajax({
		type: 'POST',
		url: '/meetup',
		data: JSON.stringify(data),
		contentType: 'application/json'
		}).done(function(){
			console.log("erfolgreich gepusht");
		}).fail(function(e){
			alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
		});
}

/*
 * Registrierung
 */
 
function adduser(){
	/*
	* Pruefe das Formularfelder nicht leer sind
	*/
	if($('#name').val() != "" && $('#vorname').val() != "" && $('#email').val() != "" && $('#pass').val() != "" && $('#ort').val() != "" && $('#plz').val() != "" && $('#strasse').val() != "" && $('#nr').val() != ""){
			
	/*
	* Email Adresse als Salt dem Passwort hinzufügen und mit SHA512 Hashwert erstellen.
	* Anschlißend zu Data Objekt hinzufügen
	*/
	var salt = $('#pass').val() + $('#email').val();
	var hash = CryptoJS.SHA512(salt);
	var data = {name: $('#name').val(), vorname: $('#vorname').val(),email: $('#email').val(), pass: hash.toString(), ort: $('#ort').val(), plz: $('#plz').val(), strasse: $('#strasse').val(), nr: $('#nr').val()};
			
	/*
	* AJAX Post absenden vom Typ Jason Objekt
	* Bei Erfolg: Alert ausgeben, Formularfelder leeren und auf Index.html weiterleiten
	* Bei Misserfolg: alert ausgeben
	*/
	$.ajax({
		type: 'POST',
		url: '/adduser',
		data: JSON.stringify(data),
		contentType: 'application/json'
		}).done(function(){
			alert(data.name+' wurde hinzugefuegt.');
			window.location = "/?home";
		}).fail(function(e){
			alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
		});
	}else{
		alert(unescape("Bitte alle Felder ausf%FCllen")); //unescape: Umlaut uebersetzen
	}
}

/*
 * Addservice
 */
 
function addservice(){
	/*
	* Pruefe das Formularfelder nicht leer sind
	*/
	if($('#restaurant').val() != "" && $('#phone').val() != "" && $('#ruhe').val() != "" && $('#ort').val() != "" && $('#strasse').val() != "" && $('#plz').val() != "" && $('#nr').val() != "" && $('#min').val() != "" && $('#anfahrt').val() != "" && $('#date').val() != ""){
			
	/*
	* Email Adresse als Salt dem Passwort hinzufügen und mit SHA512 Hashwert erstellen.
	* Anschlißend zu Data Objekt hinzufügen
	*/
	var data = {restaurant: $('#restaurant').val(), phone: $('#phone').val(),ruhe: $('#ruhe').val(), ort: $('#ort').val(), strasse: $('#strasse').val(), plz: $('#plz').val(), nr: $('#nr').val(), min: $('#min').val(), anfahrt: $('#anfahrt').val(), date: $('#date').val()};
			
	/*
	* AJAX Post absenden vom Typ Jason Objekt
	* Bei Erfolg: Alert ausgeben, Formularfelder leeren und auf Index.html weiterleiten
	* Bei Misserfolg: alert ausgeben
	*/
	$.ajax({
		type: 'POST',
		url: '/addservice?_id=' +_id,
		data: JSON.stringify(data),
		contentType: 'application/json'
		}).done(function(){
			alert(data.name+' wurde hinzugefuegt.');
			window.location = "/?home";
		}).fail(function(e){
			alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
		});
	}else{
		alert(unescape("Bitte alle Felder ausf%FCllen")); //unescape: Umlaut uebersetzen
	}
}

/*
 * getservices
 */

 function getservices(){
var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/getservice',
            contentType: 'application/json'
        });
        
        request.done(function(services){
            services.forEach(function(service){
                addTableRow(service);
            });
        });
        
        request.fail(function(err){
			alert("something is wrong");
        });
}

/*
 * addTableRow
 */
 
function addTableRow(service){
	var date = service.date;
	if(auth() != null){
        $('#lieferservice').append('<tr><td>'+
									'<a href="/?service&s='+service._id+'">'+
										'<img src="gfx/pizza.png" width="100px" height="100px">'+
									'</a></td><td id="service">'+service.restaurant+'<br />'+
																service.strasse+' '+service.nr+'<br />'+
																service.plz+' '+service.ort+'<br />'+
														'Tel.:'+service.phone+'<p>'+
										 'Mindestbestellwert: '+service.min+' <br />'+
											 'Anfahrtskosten: '+service.anfahrt+'</p></td>'+
									  '<td id="date">Ruhetag: '+service.ruhe+'<br />'+date+'<p>'+
									  '<span id="meetup" onClick="meetup(\''+service._id+'\')"><img src="/gfx/meetup.png" width="18px" height="18px">MeetUp</span>&nbsp;&nbsp;'+
									  '<span id="favoriten" onClick="favoriten(\''+service._id+'\')"><img src="/gfx/Stern.png" width="18px" height="18px">Favoriten</span></p></td></tr>'
									  );
					}else{
					  $('#lieferservice').append('<tr><td>'+
									'<a href="/?service&s='+service._id+'">'+
										'<img src="gfx/pizza.png" width="100px" height="100px">'+
									'</a></td><td id="service">'+service.restaurant+'<br />'+
																service.strasse+' '+service.nr+'<br />'+
																service.plz+' '+service.ort+'<br />'+
														'Tel.:'+service.phone+'<p>'+
										 'Mindestbestellwert: '+service.min+' <br />'+
											 'Anfahrtskosten: '+service.anfahrt+'</p></td>'+
									  '<td id="date">Ruhetag: '+service.ruhe+'<br />'+date+'</td></tr>'
									  );
					}
}

/*
 * getOneService
 */
 
function getOneService(service){
var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/getOneService/'+service,
            contentType: 'application/json'
        });
        
        request.done(function(service){
                addTableRow(service);
				showCard(service, cards);
				
        });
        
        request.fail(function(err){
			alert("something is wrong");
        });


}

/*
 * uploads
 */
 
function uploads(service){
var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/uploads/'+service,
            contentType: 'application/json'
        });
}

/*
 * showCard
 */
 
function showCard(service, cards) {
	if (service._id == cards._id)
		$('#right_content').append('</a href="'+cards.imgpath+'"<img src="'+cards.thumb+'" alt=""></a>');
	else
		console.log("Keine Karte vorhanden?!")
}


/*
 * Authentifizierung
 */
 
 function auth(){
	if($.cookies.get( 'sessid' ) != null){
	var data = $.cookies.get( 'sessid' ).substring(2);
		
		var result = $.ajax({
						type: 'POST',
						url: "/auth",
						data: data,
						contentType: 'application/json',
						async: false
						}).responseText;
		if(result != null){
			$('#left p').html('<a href="/?logout">Abmelden</a>');
		} 
		return eval(result);
	}
}

/*
 * authsubscribe
 */
 
 function authsubscribe(){
	if($.cookies.get( 'sessid' ) != null){
	var data = $.cookies.get( 'sessid' ).substring(2);
		
		var result = $.ajax({
						type: 'POST',
						url: "/auth",
						data: data,
						contentType: 'application/json',
						async: false
						}).responseText;
		if(result != null){
			subscribe(eval(result));
		} 
		
		return eval(result);
	}
}

/*
 * subscribe
 */
 
function subscribe(id){
	var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/favoriten/'+id[0]._id,
            contentType: 'application/json'
        });
        
        request.done(function(service){
				var s = eval(service);
                var client = new Faye.Client('/faye');
				var subscription = client.subscribe('/'+s, function(message){
					console.log("subscribe erreicht: "+message.restaurant);
					alert("Hey, Jemand möchte jetzt bei "+message.restaurant+" bestellen!");
				});
        });
        
        request.fail(function(err){
			alert("something is wrong");
        });
}

/*
 * LOGIN
 */
 
function login(){	
	/*
	* Pruefe das Formularfelder nicht leer sind
	*/
	if($('#email').val() != "" && $('#pass').val() != ""){
			
		/*
		* Email Adresse als Salt dem Passwort hinzufügen und mit SHA512 Hashwert erstellen.
		* Anschlißend zu Data Objekt hinzufügen
		*/
		var salt = $('#pass').val() + $('#email').val();
		var hash = CryptoJS.SHA512(salt);
		var data = {email: $('#email').val(), pass: hash.toString()};
			
		/*
		* AJAX Post absenden vom Typ Jason Objekt
		* Bei Erfolg: Formularfelder leeren und auf Index.html weiterleiten
		* Bei Misserfolg: alert ausgeben
		*/
		$.ajax({
			type: 'POST',
			url: '/login',
			data: JSON.stringify(data),
			contentType: 'application/json'
		}).done(function(){
			window.location = "/?home";
			
		}).fail(function(e){
			alert('Anmeldung fehlgeschlagen: '+JSON.stringify(e.responseText));
		});
	}else{
		alert(unescape("Bitte alle Felder ausf%FCllen")); //unescape: Umlaut uebersetzen
	}
}

/*
 * GetUrlValue
 * GET Parameter aus URL auslesen
 */
 
function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}

/*
 * LOGOUT
 */
 
function logout(){
	$.cookies.del( 'sessid' );
	window.location = "/?home";
}