pragma solidity ^0.4.20;

import './ERC721Token.sol';

contract CocoaVirtualField is ERC721Token {

	address public admin;
  address public owner;
  uint internal _idToken;

  constructor(string _name, string _symbol) public {
    name_ = _name;
    symbol_ = _symbol;
    owner = msg.sender;

    // register the supported interfaces to conform to ERC721 via ERC165
    _registerInterface(InterfaceId_ERC721Enumerable);
    _registerInterface(InterfaceId_ERC721Metadata);
  }

  function createDeed() external returns (bool){
    require(msg.sender == owner);
    _idToken = 1;
    _mint(owner, _idToken);
    return true;
  }

  function setAdmin(address _newAdmin) external returns(bool){
    require(msg.sender == owner);
    admin = _newAdmin;
    return true;
            
  }
      

}