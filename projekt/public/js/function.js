/*
 * REGISTRATION
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
			window.location = "/";
		}).fail(function(e){
			alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
		});
	}else{
		alert(unescape("Bitte alle Felder ausf%FCllen")); //unescape: Umlaut uebersetzen
	}
}
/*
 * REGISTRATION
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
		url: '/addservice',
		data: JSON.stringify(data),
		contentType: 'application/json'
		}).done(function(){
			alert(data.name+' wurde hinzugefuegt.');
			window.location = "/";
		}).fail(function(e){
			alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
		});
	}else{
		alert(unescape("Bitte alle Felder ausf%FCllen")); //unescape: Umlaut uebersetzen
	}
}
/*
 *
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
function addTableRow(service){
	var date = service.date;
        $('#lieferservice').append('<tr><td>'+
									'<a href="/?'+service._id+'">'+
										'<img src="gfx/pizza.png" width="100px" height="100px">'+
									'</a></td><td id="service">'+service.restaurant+'<br />'+
																service.strasse+' '+service.nr+'<br />'+
																service.plz+' '+service.ort+'<br />'+
														'Tel.:'+service.phone+'<p>'+
										 'Mindestbestellwert: '+service.min+' <br />'+
											 'Anfahrtskosten: '+service.anfahrt+'</p></td>'+
									  '<td id="date">Ruhetag: '+service.ruhe+'<br />'+date+'<p>'+
									  '<a href="/"><img src="/gfx/meetup.png" width="18px" height="18px">MeetUp</a>&nbsp;&nbsp;'+
									  '<a href="/"><img src="/gfx/Stern.png" width="18px" height="18px">Favoriten</a></p></td></tr>'
									  );
}
/*
 *
 */
function getOneService(service){
var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/getOneService/'+service,
            contentType: 'application/json'
        });
        
        request.done(function(service){
                addTableRow(service);
				showCard(service);
				
        });
        
        request.fail(function(err){
			alert("something is wrong");
        });


}

function showCard(service) {
	$('#right_content').append('<a href="/?uploads">Karte hinzufügen</a>');
}


/*
 * Authentifizierung
 */
function auth(){
	if($.cookies.get( 'sessid' ) != null){
	var data = $.cookies.get( 'sessid' ).substring(2);
	
		$.ajax({
			type: 'POST',
			url: '/auth',
			data: data,
			contentType: 'application/json'
		}).done(function(e){
			$('#left p').html('<a href="/?logout">Abmelden</a>');
		}).fail(function(e){
			alert('Anmeldung fehlgeschlagen: '+JSON.stringify(e.responseText));

		});
	}
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
			window.location = "/";
		}).fail(function(e){
			alert('Anmeldung fehlgeschlagen: '+JSON.stringify(e.responseText));
		});
	}else{
		alert(unescape("Bitte alle Felder ausf%FCllen")); //unescape: Umlaut uebersetzen
	}
}
/*
 * LOGOUT
 */
function logout(){
	$.cookies.del( 'sessid' );
	window.location = "/";
}