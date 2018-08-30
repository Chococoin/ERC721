var CocoaVirtualField = artifacts.require("./CocoaVirtualField.sol");
var CocoaTreeDeedSell = artifacts.require("./CocoaTreeDeedSell.sol");

module.exports = function(deployer) {
  var name = 'CocoaVirtualFields';
  var symbol = 'CVF';
  deployer.deploy(CocoaVirtualField, name, symbol).then(()=>{
  	var tokenPrice = 20000000000000000;
  	return deployer.deploy(CocoaTreeDeedSell, CocoaVirtualField.address, tokenPrice);
  })
};
