 const express = require("express");
 const app = express();
 const https = require("https");
 const bodyparser = require("body-parser")
 app.use(bodyparser.urlencoded({extended:true}));
 app.get("/",function(req,res) {
  res.sendFile(__dirname+"/index.html");
 })
 app.post("/",function(req,res) {
  const apikey = "fa42c763df475b8aaa1aa063ff2605db";
  const unit = "metrics";
  const query = req.body.CityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid="+apikey+"&units="+unit;
    https.get(url, (response) => {
      response.on('data', (d) => {
       const weatherdata = JSON.parse(d)
       console.log(weatherdata);
       const description = weatherdata.weather[0].description
       const degree = weatherdata.main.temp
       const icon = weatherdata.weather[0].icon
       res.write("<h1>Temperature in "+query+" is "+degree + " degrees Celsius</h1>")
       res.write("<p>The Weather is "+ description+"</p>")
       imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
       res.write("<img src ="+imageurl+" />")
       res.send();
     });
   });

 })
 app.listen(3000,function() {
   console.log("Started!");
 })
