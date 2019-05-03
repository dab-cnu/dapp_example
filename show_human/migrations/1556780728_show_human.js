var show_human = artifacts.require("show_human");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(show_human);
};
