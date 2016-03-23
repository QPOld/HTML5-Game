/*
SubFi - 2016
Michael Parkinson

SubFi.Active

Stores namespace.
All api and constants will be called from the active namespace.

The pattern is as follows:

active.filename.class.function

active.filename.class.constant
 */
var active = active || {};

function addScript(filepath, callback){
    if (filepath) {
        var fileref = document.createElement('script');
        fileref.onload = callback;
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filepath);
        if (typeof fileref!="undefined") {document.getElementsByTagName("head")[0].appendChild(fileref)};
    }
}

// Import Addition js files
addScript('../js/constant.js', function(){})
addScript('../js/create.js', function(){})
addScript('../js/userinfo.js', function(){})
addScript('../js/render.js', function(){}) 
addScript('../js/object.js', function(){})
addScript('../js/options.js', function(){})
addScript('../js/method.js', function(){})
addScript('../js/main.js', function(){})