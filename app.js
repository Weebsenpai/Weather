const express = require("express");
const https = require("https");
const { url } = require("inspector");
const { dirname } = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");   
});

app.post("/",function(req,res){
    
    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "appid=a589bc66006eefaeed70911b92f7ff31"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+unit+"&"+apiKey;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            console.log(temp);
            console.log(description);
            res.write("<h1>The temperature in "+query+" is :" +temp+ " <span>&#8451;</span></h1>");
            res.write("The Weather description is : "+description);
            res.write("<img src="+imgUrl+">");
            res.send();
        });
    });
});





app.listen(3000,function(){
    console.log("the server is runnig on port 3000");
});