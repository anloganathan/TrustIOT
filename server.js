const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const cors=require('cors');
const bodyParser = require('body-parser');
const Web3 =require('web3');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public_static'));


try{
const json = require('./build/contracts/Records.json');
const abi = json['abi'];

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

const contractAdd="0x54DCC449329D0444571Ebb2857a15F623C4661b7";
var contract= new web3.eth.Contract(abi,contractAdd);
var deployerAddress
web3.eth.getAccounts().then(function(e){
    deployerAddress=e[0]; 
	console.log('Owner (deployer) Address: ' +deployerAddress)
}).catch(e=>console.log(e));

}
catch(e){
  console.log(e);
}

app.get('/listOfPatients',async (req, res) => {
  try{
    await contract.methods.getListOfPatients().call().then(function(value){
        
        console.log(value);
        res.status(201).json({success:true});
    }).catch(e=>{
        const data = e.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;        
        console.log(reason);
        console.log(e); // prints "This is error message"
        res.status(404).json({ success: false, error: reason });
    });
}
catch(err){
    res.status(404).json({ success: false, err: err.message });
    console.log(err.message);
}
});


app.get('/addPatient',async (req,res)=>{
  try{
    await contract.methods.addPatient().send({from:deployerAddress,gas:150000}).then(function(value){
        
        console.log(value);
        res.status(201).json({success:true});
    }).catch(e=>{
        const data = e.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;        
        console.log("reason"+reason);
        console.log(e); // prints "This is error message"
        res.status(404).json({ success: false, error: reason });
    });
}
catch(err){
  res.status(404).json({ success: false, err: err.message });
  console.log(err.message);
}
});

app.get('/addThermometer',async (req,res)=>{
  try{
    await contract.methods.addThermometer().send({from:deployerAddress,gas:150000}).then(function(value){
        
        
        console.log(value);
        res.status(201).json({success:true});
    }).catch(e=>{
        const data = e.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;        
        console.log("reason"+reason);
        console.log(e); // prints "This is error message"
        res.status(404).json({ success: false, error: reason });
    });
    
}
catch(err){
  res.status(404).json({ success: false, error: err.message });
  console.log(err.message);
}
});


app.get('/listOfThermometers',async (req, res) => {
  try{
    await contract.methods.getThermometerList().call().then(function(value){
        
        console.log(value);
        res.status(201).json({success:true});
    }).catch(e=>{
        const data = e.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;        
        console.log(reason);
        console.log(e); // prints "This is error message"
        res.status(404).json({ success: false, error: reason });
    });
}
catch(err){
    res.status(404).json({ success: false, err: err.message });
    console.log(err.message);
}
});


app.get('/addPulseOximeter',async (req,res)=>{
  try{
    await contract.methods.addPulseOxi().send({from:deployerAddress,gas:150000}).then(function(value){
        
        
        console.log(value);
        res.status(201).json({success:true});
    }).catch(e=>{
        const data = e.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;        
        console.log("reason"+reason);
        console.log(e); // prints "This is error message"
        res.status(404).json({ success: false, error: reason });
    });
    
}
catch(err){
  res.status(404).json({ success: false, error: err.message });
  console.log(err.message);
}
});


app.get('/listOfPulseOximeters',async (req, res) => {
  try{
    await contract.methods.getPulseOxiList().call().then(function(value){
        
        console.log(value);
        res.status(201).json({success:true});
    }).catch(e=>{
        const data = e.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;        
        console.log(reason);
        console.log(e); // prints "This is error message"
        res.status(404).json({ success: false, error: reason });
    });
}
catch(err){
    res.status(404).json({ success: false, err: err.message });
    console.log(err.message);
}
});




app.get('/test',async (req, res) => {

const test =await contract.methods.getThermometerList().call();
console.log(test)
})
app.listen(port, async () => {
  console.log("Express Listening at http://localhost:" + port);
});
