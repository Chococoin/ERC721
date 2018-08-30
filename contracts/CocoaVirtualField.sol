pragma solidity ^0.4.20;

import './ERC721Token.sol';

contract CocoaVirtualField is ERC721Token {

	address public admin;
  address public owner;
  uint256 public numberActives;
  uint256 public numberInactives;

  function _setDataDeed(address _treeOwner, string _URItree, uint256 _tokenId)
  internal returns (bool){
    treeMetaData[_tokenId] = Tree(_treeOwner, _URItree, true);
    _setTokenURI(_tokenId, _URItree);
    return true;
  }

  constructor(string _name, string _symbol) public {
    name_ = _name;
    symbol_ = _symbol;
    owner = msg.sender;
  }

  function setAdmin(address _newAdmin) external returns(bool){
    require(msg.sender == owner);
    admin = _newAdmin;
    return true;
  }

  function createDeed(string _URItree) external returns (bool){
    require(msg.sender == owner || msg.sender == admin);
    require (bytes(_URItree).length != 0);   
    uint256[1] memory _tokenId;
    _tokenId[0] = (allTokens.length).add(1);
    _mint(owner, _tokenId[0]);
    _setDataDeed(owner, _URItree, _tokenId[0]);
    numberActives += 1;
    return true;   
  }

  function myTrees() external view returns(uint256[]){
    return ownedTokens[msg.sender];
  }

  //provitional function for test (Not for production)
  function totalTrees() external view returns(uint256){
    if (numberInactives + numberActives == allTokens.length){
      return allTokens.length;
    }
  }

  function showTreeOwner(uint256 _tokenId) external view returns(address){
    return(treeMetaData[_tokenId].treeOwner);
  }

  function showTreeURI(uint256 _tokenId) external view returns(string){
    return(treeMetaData[_tokenId].tokenURIs);
  }

  function showActiveTree(uint256 _tokenId) external view returns(bool){
    return(treeMetaData[_tokenId].active);
  }

  function desactivateTree(uint256 _tokenId) external returns(bool){
    require(msg.sender == owner || msg.sender == admin);
    require(treeMetaData[_tokenId].treeOwner == owner);
    treeMetaData[_tokenId].active = false;
    return true;
  }
}
