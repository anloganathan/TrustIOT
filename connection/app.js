const contract = require('truffle-contract');

const MyContractArtifact = require('../build/contracts/Records.json');
var Records = contract(MyContractArtifact);

module.exports = {
  start: function(callback) {
    var self = this;
    Records.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },
  refreshBalance: function(account, readings,callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Records.setProvider(self.web3.currentProvider);

    var meta;
    Records.deployed().then(function(instance) {
      meta = instance;
     
      return meta.pushReadings.call(account, readings);
    }).then((value)=>{
        console.log(value);
        callback(value);
    })
   .catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  }
 
  }
