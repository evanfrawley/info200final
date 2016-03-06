(function() {
	"use strict";

	window.onload = function() {
		document.getElementById("submit").onclick = submit;	
	};

	function submit() {
		var myFirebaseRef = new Firebase("https://luminous-fire-9933.firebaseio.com");
		var data = {};
		data[document.getElementById("name").value] = {
  				username: document.getElementById("username").value,
    			password: document.getElementById("password").value,
    			field: document.getElementById("field").value,
    			skills: document.getElementById("skills").value
    		};
		myFirebaseRef.child("User").update(data);
	}
})();