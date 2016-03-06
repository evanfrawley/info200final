/**
 * Created by Evan on 2/27/2016.
 */
(function() {
    "use strict";

    window.onload = function () {
        injectEmployers();
        //initCoursera();
    };

    /*
     *   generic ajax caller method
     */

    function ajax(url, func) {
        var req = new XMLHttpRequest();
        req.onload = func;
        req.open("GET", url, true);
        req.send();
    }


    /*
     *      FIREBASE JS
     */
    //var Firebase = require("firebase");
    var myFirebaseRef = new Firebase("https://luminous-fire-9933.firebaseio.com");

    myFirebaseRef.child("locations/latitude").set("chinchin");

    /*
     *     inject the employers
     *
     */

    function injectEmployers() {
        console.log("test");
        myFirebaseRef.on("value", function (snapshot) {

            var div = document.getElementById("employers");
            snapshot = snapshot.child("Employer");
            snapshot.forEach(function(childSnapshot){
                var listing = document.createElement("div");
                listing.classList.add("listing");
                listing.innerHTML = childSnapshot.val();

                div.appendChild(listing);
            });

        });
    }

})();