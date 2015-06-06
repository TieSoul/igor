/*
 main_out quick reference:
 A = ja = document.getElementById("canvas");
 e = A.getContext("2d");
 S = mouse.x;
 T = mouse.y;
 Na() - Initialize?

 */
main_out_url = "http://agar.io/main_out.js";
tester = document.getElementsByTagName("script");
discovered_mainouturl = 0;

for (i=0; i<tester.length; i++ ){
    src = tester[i].src;
    if (src.substring(0, main_out_url.length ) == main_out_url) {
        discovered_mainouturl = src.replace("http://agar.io/","");
    }
}

if(discovered_mainouturl != 0) {
    httpGet(discovered_mainouturl, function(data) {
        gamejs = data;
        gamejs = gamejs.replace(/\n/g, "");
        injectBot();
    })
}

function httpGet(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    };
}

function injectBot() {
    var script = document.createElement("script");
    script.src='//cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js';
    document.head.appendChild(script);

    gamejs = gamejs.replace("socket open", "socket open (Igor in place)");
    script = document.createElement("script");
    script.innerHTML = gamejs;
    document.head.appendChild(script);
}