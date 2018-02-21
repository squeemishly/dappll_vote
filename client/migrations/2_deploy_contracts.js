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
      return instance.createVoter("0xf17f52151ebef6c7334fad080c5704d77216b732", 345321)
    })
    .catch(function() { console.log("Error: Contract functions not completed.")})
};
