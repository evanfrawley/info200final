/**
 * Created by Evan on 2/27/2016.
 */


(function() {
    "use strict";

    window.onload = function () {
        initCoursera();
    };

    function initCoursera() {

        var url = "https://crossorigin.me/https://api.coursera.org/api/courses.v1?fields=domainTypes,description,shortDescription,photoUrl";
        //get the things to make this a specific url

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
        var main = document.getElementById("main");

        for(var i = 0; i < 10; i++) {
            var name = data[i].name;
            var img = data[i].photoUrl;
            var description = data[i].description;
            var domain = data[i].domainTypes[0].domainId;
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


            var eleImg = document.createElement("img");
            eleImg.setAttribute("src", img);

            var eleName = document.createElement("h3");
            eleName.innerHTML = name;

            var eleDescription = document.createElement("p");
            eleDescription.innerHTML = description + "</br>" + "Skills: " + domain;

            ele.onclick = url;

            text.appendChild(eleName);
            text.appendChild(eleDescription);
            ele.appendChild(eleImg);
            ele.appendChild(text);

            main.appendChild(ele);


            //create a new div element, add in the photo, name, description, and domain, and link
            //logic: if courseType.startswith(v1) -> coursera.org/course/<SLUG>
            //else -> coursera.org/learn/<SLUG>

        }




    }

})();