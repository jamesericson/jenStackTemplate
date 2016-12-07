var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});
var port = process.env.PORT || 8080;

var events = [];

app.listen(port, function(req, res) {
    console.log('server listening on', port);
}); // end spin up server

// base url
app.get('/', function(req, res) {
    console.log('base url hit');
    res.sendFile(path.resolve('views/index.html'));
}); // end base url

// unfilter GET
app.get('/unfilter', function(req, res) {
    // Send back the original, unfiltered list
    res.send(events);
});

// filter POST
app.post('/filter', urlEncodedParser, function(req, res) {
    // Loop through the athletes and add those with a name matching the name
    // sent by the client to a new array
    var filtered = [];
    for (var i = 0; i < events.length; i++) {
        if (events[i].athleteName.toLowerCase() === req.body.name.toLowerCase()) {
            filtered.push(events[i]);
        } // end if
    } // end for
    res.send(filtered);
}); //end filterAthlet

// testPost
app.post('/testPost', urlEncodedParser, function(req, res) {
    // Add the event object from the client to the events array
    events.push(req.body);
    // Return the updated array to the client
    res.send(events);
}); // end testPost

// static folder
app.use(express.static('public'));
