/**
 * Created by Evan on 2/27/2016.
 */


(function() {
    "use strict";

    window.onload = function () {
        initCoursera();
        console.log("1");
    };

    function initCoursera() {
        var url = "http://cors.io/?u=https://api.coursera.org/api/courses.v1?fields=domainTypes,description,shortDescription,photoUrl";
        //get the things to make this a specific url
        ajax(url, populate);
        console.log("2");
    }

    function ajax(url, func) {
        var req = new XMLHttpRequest();
        req.onload = func;
        req.open("GET", url, true);


        req.send();
        console.log("5");
    }

    function populate(){
        console.log("3");
        var data = JSON.parse(this.responseText).elements;
        var main = document.getElementById("main");

        for(var i = 0; i < 20; i++) {
            var name = data[i].name;
            var img = data[i].photoUrl;
            var description = data[i].description;
            var domains = data[i].domainTypes;
            var domain = domains[0].domainId;
            var subdomain = domains[0].subdomainId;
            for(var j = 1; j < domains.length; j++){
                domain += ", " + domains[j].domainId;
                subdomain += ", " + domains[j].subdomainId;
            }

            var type = data[i].courseType;
            var base = "https://coursera.org/";
            if(type.startsWith("v1")){
                var url = base + "course/" + data[i].slug;
            } else {
                var url = base + "learn/" + data[i].slug;
            }
            var ele = document.createElement("div");
            ele.classList.add("item");

            var text = document.createElement("div");
            text.classList.add("text");

            var imgdiv = document.createElement("div");
            imgdiv.classList.add("img");

            var imgLink = document.createElement("a");
            imgLink.setAttribute("href", url);

            var eleImg = document.createElement("img");
            eleImg.setAttribute("src", img);

            var eleName = document.createElement("h3");
            eleName.innerHTML = name;

            var eleDescription = document.createElement("p");
            //eleDescription.innerHTML = description + "</br>" + "Skills: " + domain;
            eleDescription.innerHTML = "Skills: " + domain + " and " + subdomain + "</br>" + "Sought after by: ";

            text.appendChild(eleName);
            text.appendChild(eleDescription);
            imgLink.appendChild(eleImg);
            imgdiv.appendChild(imgLink);
            ele.appendChild(imgdiv);
            ele.appendChild(text);


            main.appendChild(ele);
            //create a new div element, add in the photo, name, description, and domain, and link
            //logic: if courseType.startswith(v1) -> coursera.org/course/<SLUG>
            //else -> coursera.org/learn/<SLUG>

        }
    }

})();