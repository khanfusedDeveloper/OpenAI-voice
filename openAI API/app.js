const express = require("express");
const app = express(); //to use express js
const bodyParser = require("body-parser"); //parsing post from html
const https = require("https");
const path = require("path");
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/", function(req, res){

    res.render('index', {pageTitle: "Welcome to my page"});

});

app.listen(3000, function(){


    console.log("server is up and running");
})