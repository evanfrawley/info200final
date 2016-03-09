/**
 * Created by Evan on 2/27/2016.
 */


//(function() {
    "use strict";

    window.onload = function () {
        initCoursera();
    };

    function initCoursera() {
        //var url = "http://cors.io/?u=https://api.coursera.org/api/courses.v1?fields=domainTypes,description,shortDescription,photoUrl";
        //var url = "https://jsonp.afeld.me/?url=https%3A%2F%2Fapi.coursera.org%2Fapi%2Fcourses.v1%3Ffields%3DdomainTypes%2Cdescription%2CshortDescription%2CphotoUrl";
        //get the things to make this a specific url
        //ajax(url, populate);
        //
        // console.log("2");
        var url = "courses.json";
        ajax(url, populate);
    }

    function ajax(url, func) {
        var req = new XMLHttpRequest();
        req.onload = func;
        req.open("GET", url, true);


        req.send();
    }

    function populate(){


        var data = JSON.parse(this.responseText).elements;

        var allitems = document.getElementById("allitems");

        for(var i = 0; i < data.length; i++) {
            var name = data[i].name;
            var img = data[i].photoUrl;
            var description = data[i].description;
            var domains = data[i].domainTypes;
            var domain = domains[0].domainId;
            var subdomain = domains[0].subdomainId;
            var baseCL = ["col-xs-6", "col-sm-4", "col-d-3", "portfolio-item"];
            for(var j = 0; j < domains.length; j++){
                baseCL.push(domains[j].domainId);
            }
            console.log(baseCL);
            var type = data[i].courseType;
            var base = "https://coursera.org/";
            if(type.startsWith("v1")){
                var url = base + "course/" + data[i].slug;
            } else {
                var url = base + "learn/" + data[i].slug;
            }

            if(name.includes(":")){
                var namesplit = name.split(":");
                name = namesplit[0];
            } else if (name.split(":").length > 4) {
                var namesplit = name.split(" ");
                name = namesplit[0] + " " + namesplit[1] + " " + namesplit[2] + " " + namesplit[3];
            }



            var item = document.createElement("div");
            for(var k = 0; k < baseCL.length; k++){
                item.classList.add(baseCL[k]);
            }

            var single = document.createElement("div");
            single.classList.add("portfolio-single");

            var thumb = document.createElement("div");
            thumb.classList.add("portfolio-thumb");

            var pilldiv = document.createElement("div");

            var imgLink = document.createElement("a");
            imgLink.setAttribute("href", url);

            var eleImg = document.createElement("img");
            eleImg.setAttribute("src", img);
            eleImg.classList.add("img-responsive");

            var icon = document.createElement("i");
            icon.classList.add("fa");
            icon.classList.add("fa-link");

            var eleName = document.createElement("h2");
            eleName.innerHTML = name;

            var pill = document.createElement("ul");
            pill.classList.add("nav");
            pill.classList.add("nav-pills");

            var li = document.createElement("li");

            var titlediv = document.createElement("div");
            titlediv.classList.add("portfolio-info");
            //eleDescription.innerHTML = description + "</br>" + "Skills: " + domain;
            imgLink.appendChild(eleImg);
            thumb.appendChild(imgLink);
            li.appendChild(icon);

            single.appendChild(thumb);
            titlediv.appendChild(eleName);
            item.appendChild(single);
            item.appendChild(titlediv);

            allitems.appendChild(item);
        }
    }

//})();