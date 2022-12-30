const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs')

app.get("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    res.render("index");
})
app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apikey = "05e401c57189bd970bb226eaf8756e2f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=surat&units=metric&appid=05e401c57189bd970bb226eaf8756e2f"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const weatherdescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p style='text-align: center; font-size: 30px;'>the weather is currently: "+ "<span style='color: red;'>"+ weatherdescription +"</span>"+ "</p>");
            res.write("<h1 style='text-align: center;'> The temperature in "+"<span style='color: red;'>"+ query +"</span>"+" is: " +"<span style='color: red;'>"+ temp + " degrees celcius."+"</span>"+"</h1>");
            res.write("<img style='display: block; margin-left: auto; margin-right: auto; width: 10%;' src="+ imgURL + ">");
            res.send()

        })
    })
})


app.listen(3000, function () {
    console.log("server is running on port 3000");
})
