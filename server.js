const express = require("express");
const app = express(); //to use express js
const bodyParser = require("body-parser"); //parsing post from html
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));

app.get("/", function(req, res){    
    res.sendFile(__dirname + "/public/index.html");

});

app.listen(3000, function(){


    console.log("server is up and running");
})