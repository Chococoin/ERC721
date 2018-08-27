pragma solidity ^0.4.20;

import './ERC721Token.sol';

contract CocoaVirtualField is ERC721Token {

	address public admin;
  address public owner;
  uint256 internal NumberOfActives;

  constructor(string _name, string _symbol) public {
    name_ = _name;
    symbol_ = _symbol;
    owner = msg.sender;
  }

  function createDeed(string _URItree) external returns (bool){
    require(msg.sender == owner || msg.sender == admin);
    require (bytes(_URItree).length != 0);   
    uint256[1] memory _tokenId;
    _tokenId[0] = (allTokens.length).add(1);
    _mint(address(this), _tokenId[0]);
    _setDataDeed(address(this), _URItree, _tokenId[0]);
    return true;   
  }

  function setAdmin(address _newAdmin) external returns(bool){
    require(msg.sender == owner);
    admin = _newAdmin;
    return true;
  }

  function myTrees(address _tokenOwner) external view returns (uint256[]){
    require(msg.sender == _tokenOwner);
    return ownedTokens[_tokenOwner];
  }

  function _setDataDeed(address _treeOwner, string _URItree, uint256 _tokenId)
  internal returns (bool){
    treeMetaData[_tokenId] = Tree(_treeOwner, _URItree, false);
    _setTokenURI(_tokenId, _URItree);
    return true;
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

  function setOwnershipDeed(address _to, uint256 _tokenId) external payable returns(bool){
    require(msg.sender == treeMetaData[_tokenId].treeOwner);
    require(treeMetaData[_tokenId].active == true);
    treeMetaData[_tokenId].treeOwner = _to;
    return true;
  }
}
