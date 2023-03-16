// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:time", (req, res) => {
  const time = req.params.time;

  // return !isNaN(Number(time))
  // ? res.json({ unix: parseInt(time), utc: new Date(Number(time)).toUTCString() })
  //   : new Date(time).toUTCString() !== "Invalid Date"
  //   ? res.json({
  //       unix: new Date(time).getTime(),
  //       utc: time,
  //     })
  //   : { error: "Invalid Date" };

  if (!isNaN(Number(time))) {
    return res.json({
      unix: parseInt(time),
      utc: new Date(Number(time)).toUTCString(),
    });
  }

  if (new Date(time).toUTCString() !== "Invalid Date") {
    return res.json({
      unix: new Date(time).getTime(),
      utc: new Date(time).toUTCString(),
    });
  }

  res.json({ error: "Invalid Date" });
  // res.json({ date: date });
  // console.log(new Date(time).toUTCString());
});

// listen for requests :)
var listener = app.listen((process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
