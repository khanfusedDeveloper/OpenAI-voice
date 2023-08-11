const express = require("express");
const app = express(); //to use express js
// const bodyParser = require("body-parser"); //parsing post from html
// app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");

app.use((express.json()));
app.use(express.static('public'));

app.get("/", function(req, res){    
    res.sendFile(__dirname + "/public/index.html");
    

});

app.post("/process-text", (req, res) => {

    const text = req.body.text;

    console.log("hello backend", text);
    res.json({message: "Text received successfully", processedText: req.body.text});
});

app.listen(3000, function(){


    console.log("server is up and running...");
})