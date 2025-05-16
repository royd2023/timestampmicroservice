// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint to return the current timestamp
// resquest to /api/ will return the current date and time in UTC format
// and the unix timestamp 
app.get("/api/:date?", function (req, res) {
  // req.params.date is the date parameter passed in the URL
  const dateParam = req.params.date;
  // If no date parameter is provided, return the current date and time 
  // in UTC format and the unix timestamp
  if (!dateParam) {
    const now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }
  // If the date parameter is provided, check if it is a valid date 
  else {
    let date;
    // /^\d+$/ is a regular expression that matches a string that contains only digits
    if (/^\d+$/.test(dateParam)) {
      // convert the date parameter to a number
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
    // If the date is invalid, return an error message
    if (isNaN(date.getTime())) {
      res.json({error: "Invalid Date"});
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      }); 
    }
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
