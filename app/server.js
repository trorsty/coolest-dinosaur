// Simple Express JS server for serving up static front end and handling requests
const express = require('express');
const favicon = require('express-favicon');
const _ = require('underscore');
const path = require('path');
var bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());


// Do sketch analysis
app.post('/analysis', function (req, res) {
	var sketch = req.body.sketchJson;
  	var complexityScore = analyseComplexity(sketch)
  	var colourScore = analyseColour(sketch)
	res.send({
		complexity: complexityScore,
		colour: colourScore
	});
});

function analyseComplexity (sketch) {
	let complexityScore = Math.min(Math.log(sketch.objects.length + 1), 10);
	return Math.round(complexityScore)
}

function analyseColour (sketch) {
	let colours = _.map(sketch.objects, function (line) {return line.stroke})
	const colourSet = new Set(colours)
	return Math.min(colourSet.size, 10)
}

// Serve front end
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);