var CocoaVirtualFields = artifacts.require("./CocoaVirtualField.sol");

module.exports = function(deployer) {
  var name = 'CocoaVirtualFields';
  var symbol = 'CVF';
  deployer.deploy(CocoaVirtualFields, name, symbol);
};
