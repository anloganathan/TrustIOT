const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const bodyParser = require('body-parser');
const truffle_connect = require('./connection/app.js');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    console.log(answer);
    res.send(answer);
  })
});

app.post('/', (req, res) => {
 
  console.log(req.body);
  let currentAcount = req.body.account;
  let readings=req.body.readingsCelsius;

  truffle_connect.refreshBalance(currentAcount, readings,(answer) => {
    console.log(answer);
    res.send(answer);
    });
  });


app.listen(port, async () => {
  console.log("Express Listening at http://localhost:" + port);
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
});
