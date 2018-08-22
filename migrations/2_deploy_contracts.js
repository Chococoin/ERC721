var ERC721Token = artifacts.require("./ERC721Token.sol");

module.exports = function(deployer) {
  var name = 'CocoaVirtualFields';
  var symbol = 'CVF';
  deployer.deploy(ERC721Token, name, symbol);
};
