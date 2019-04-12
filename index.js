const express = require("express");
const app = express();
const compression = require("compression");
const axios = require("axios");
const body = require("body-parser");
/////////////////////////////
app.use(compression());
app.use(body.json());
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
app.get("/getForecast", (req, res) => {
    axios
        .get(
            `https://api.darksky.net/forecast/${
                creds.darkSkyApiKey
            }/52.5200,13.4050?units=si`
        )
        .then(data => {
            res.json(data.data.daily);
        })
        .catch(err => {
            console.log("err in api get", err);
        });
});

///////////////////////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//////////////////////////////
app.listen(8080, function() {
    console.log("I'm listening.");
});
