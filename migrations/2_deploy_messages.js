//var TRXMessages = artifacts.require("./TRXMessages.sol");
var TRXFoundation = artifacts.require("./TRXFoundation.sol");

module.exports = function (deployer) {
  // deployer.deploy(TRXMessages);
  deployer.deploy(TRXFoundation);
};
