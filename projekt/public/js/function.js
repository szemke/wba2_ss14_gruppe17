/*
 * REGISTRATION
 */
function adduser(){
	/*
	* Pruefe das Formularfelder nicht leer sind
	*/
	if($('#name').val() != "" && $('#email').val() != "" && $('#pass').val() != ""){
			
	/*
	* Email Adresse als Salt dem Passwort hinzufügen und mit SHA512 Hashwert erstellen.
	* Anschlißend zu Data Objekt hinzufügen
	*/
	var salt = $('#pass').val() + $('#email').val();
	var hash = CryptoJS.SHA512(salt);
	var data = {name: $('#name').val(), email: $('#email').val(), pass: hash.toString()};
			
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