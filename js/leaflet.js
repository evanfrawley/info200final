//JS file that sets up the map
(function() {
    "use strict";

    var map = L.map('map');

    window.onload = function(){
        loadMap();
    };


    function loadMap() {

        var key = "pk.eyJ1IjoiZXZhbmZyYXdsZXkiLCJhIjoiY2lqemV0cDJpMmx2a3Z3bTV2dGh1bmt0MSJ9.gJsWsiu3AareD8XkI1-0Aw";

        var url = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" + key;

        L.tileLayer(url, {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        map.setView([47.6550, -122.3080], 13);
        getData();
    }



    function getData() {
        var ajax = new XMLHttpRequest();
        ajax.onload = addMap;
        ajax.open("GET", "https://data.seattle.gov/resource/awnr-r8xe.json", true);
        ajax.send();
    }

    function addMap() {
        var data = JSON.parse(this.responseText);
        //console.log(this.responseText);
        for (var i = 0; i < data.length; i++) {
            var popup = "<h3>" + data[i].address + "</h3>";
            if(data[i].website !== undefined) {
                popup += "<br /><a href=\"" + data[i].website.url + "\">Website</a>";
            }
            L.marker([data[i].latitude, data[i].longitude]).addTo(map).bindPopup(popup);

        }
    }
})();