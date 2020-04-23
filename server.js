const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

let projectData = {};
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(compression());

app.use(express.static('src'));

const port = 8080;

const listening = port => {
  console.log('Server running ...');
  console.log(`Local Network http://localhost:${port}`);
  console.log(`Your Network http://192.168.43.134:${port}`);
};

app.listen(port, listening(port));

const getData = (req, res) => {
  res.send(projectData);
};

const addData = (req, res) => {
  const { body: newData } = req;

  projectData = { ...newData };
  res.send(projectData);
};

app.get('/data', getData);

app.post('/post', addData);
