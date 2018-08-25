pragma solidity ^0.4.20;

import './ERC721Token.sol';

contract CocoaVirtualField is ERC721Token {

	address public admin;
  address public owner;

  constructor(string _name, string _symbol) public {
    name_ = _name;
    symbol_ = _symbol;
    owner = msg.sender;

    // register the supported interfaces to conform to ERC721 via ERC165
    _registerInterface(InterfaceId_ERC721Enumerable);
    _registerInterface(InterfaceId_ERC721Metadata);
  }

  function createDeed() external returns (bool){
    require(msg.sender == owner || msg.sender == admin);
    _mint(owner, totalSupply().add(1));
    return true;
  }

  function setAdmin(address _newAdmin) external returns(bool){
    require(msg.sender == owner);
    admin = _newAdmin;
    return true;
  }

  function myTrees(address _tokenOwner) external returns (uint256[]){
    require(msg.sender == _tokenOwner);
    return ownedTokens[_tokenOwner];
  }
}

