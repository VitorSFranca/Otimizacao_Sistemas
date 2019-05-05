const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.json())

const solver = require('./src/Solver');

app.post('/solve', function (req, res) {
  res.send(res.json(solver.solve(req.body)));
});

app.listen(5000, function () {
  console.log('Server listening on port 5000!');
});