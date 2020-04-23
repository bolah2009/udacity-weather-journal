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

/**
 * @description Call back function for GET request the function sends
 * the projectData object to the response parameter.
 * @example app.get('/data', getData);
 *
 * @param {object} req - The request parameter.
 * @param {object} res - The response parameter.
 */
const getData = (req, res) => {
  res.send(projectData);
};

/**
 * @description Call back function for POST request the function gets
 * a new data from the body property of the req parameter and adds this data
 * to the projectData then uses the res parameter to send a response.
 * @example app.post('/post', addData);
 *
 * @param {object} req - The request parameter.
 * @param {object} res - The response parameter.
 */
const addData = (req, res) => {
  const { body: newData } = req;

  projectData = { ...newData };
  res.send(projectData);
};

app.get('/data', getData);

app.post('/post', addData);
