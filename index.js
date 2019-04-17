const express = require("express");
const app = express();
const compression = require("compression");
const axios = require("axios");
const body = require("body-parser");
const cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
/////////////////////////////
app.use(compression());
app.use(body.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use(
    cookieSession({
        secret: process.env.Cookie || "secret",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
////////////////////////////
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
///////////////////////////////
let creds;
if (process.env.NODE_ENV == "production") {
    creds = process.env; // in prod the secrets are environment variables
} else {
    creds = require("./creds"); // secrets.json is in .gitignore
}
///////////////////////////////////
app.post("/getForecast", (req, res) => {
    axios
        .get(
            `https://api.darksky.net/forecast/${creds.darkSkyApiKey}/${
                req.body.lat
            },${req.body.long}?units=si`
        )
        .then(data => {
            res.json(data.data);
        })
        .catch(err => {
            console.log("err in api get", err);
        });
});
app.post("/inc-search", (req, res) => {
    axios
        .get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
                req.body.inputsearch
            }&types=(cities)&key=${creds.weatherAppKey}&sessiontoken=${
                req.session.user_string
            }`
        )
        .then(data => {
            res.json(data.data);
        })
        .catch(err => {
            console.log("err ingoogle api", err);
        });
});
app.post("/get-latandlong", (req, res) => {
    axios
        .get(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
                req.body.place_id
            }&fields=geometry&key=${creds.weatherAppKey}&sessiontoken=${
                req.session.user_string
            }`
        )
        .then(data => {
            res.json(data.data);
        })
        .catch(err => {
            console.log("err ingoogle api", err);
        });
});
///////////////////////////////
var uid = require("uid-safe");

app.get("*", function(req, res) {
    uid(18, function(err, string) {
        if (err) throw err;
        req.session.user_string = string;
    });
    res.sendFile(__dirname + "/index.html");
});
//////////////////////////////
app.listen(8080, function() {
    console.log("I'm listening.");
});
