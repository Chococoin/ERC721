var AUtils = artifacts.require("./AddressUtils.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var ERC721Receiver = artifacts.require("./ERC721Receiver.sol");
var ERC165 = artifacts.require("./ERC165.sol");
var ERC165Basic = artifacts.require("./ERC721Basic.sol");
var ERC721 = artifacts.require("./ERC721.sol");
var SupportsInterfaceWithLookup = artifacts.require("./SupportsInterfaceWithLookup.sol");
var ERC721BasicToken = artifacts.require("./ERC721BasicToken.sol");
var ERC721Token = artifacts.require("./ERC721Token.sol");

module.exports = function(deployer) {
  var name = 'CocoaVirtualFields';
  var symbol = 'CVF';
  deployer.deploy(ERC721Token, name, symbol);
};
