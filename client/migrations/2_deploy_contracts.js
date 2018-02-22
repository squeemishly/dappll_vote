const Ballot = artifacts.require("Ballot");
const Ownable = artifacts.require("Ownable");

const candidateNames = ["George Bush", "Hilary Clinton"]
const candidateParties = ["GOP", "Democrat"]

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Ownable);
  deployer.deploy(Ballot, candidateNames, candidateParties, {from: accounts[0]})
    .then(function(instance) {
      ballot = Ballot.deployed();
      return ballot;
    })
    .then(function(instance) {
      const voterAccounts = [];

      for (let i = 0; i < accounts.length; i++) {
        voterAccounts.push(instance.createVoter(accounts[i], Math.floor(Math.random()*100000+1)));
      }

      Promise.all(voterAccounts).then(function(values) {
        console.log(values);
      });
    })
    .catch(function() { console.log("Error: Contract functions not completed.")})
};
