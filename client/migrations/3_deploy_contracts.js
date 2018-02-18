const Ballot = artifacts.require("Ballot");
const Ownable = artifacts.require("Ownable");

const candidateNames = ["Bush", "Clinton"]
const candidateParties = ["GOP", "Democrat"]

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(Ballot, candidateNames, candidateParties);
};
