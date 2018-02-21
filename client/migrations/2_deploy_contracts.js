const Ballot = artifacts.require("Ballot");
const Ownable = artifacts.require("Ownable");

const candidateNames = ["George Bush", "Hilary Clinton"]
const candidateParties = ["GOP", "Democrat"]

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Ownable);
  deployer.deploy(Ballot, candidateNames, candidateParties, {from: accounts[0]});
};
