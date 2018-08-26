pragma solidity ^0.4.20;

import './ERC721Token.sol';

contract CocoaVirtualField is ERC721Token {

	address public admin;
  address public owner;

  constructor(string _name, string _symbol) public {
    name_ = _name;
    symbol_ = _symbol;
    owner = msg.sender;
  }

  function createDeed() external returns (bool){
    require(msg.sender == owner || msg.sender == admin);
    uint256[1] memory _tokenId;
    _tokenId[0] = totalSupply().add(1);
    _mint(owner, _tokenId[0]);
    setDataDeed(owner, "NoData", _tokenId[0]);
    return true;   
  }

  function createDeed(string _URItree) external returns (bool){
    require(msg.sender == owner || msg.sender == admin);
    uint256[1] memory _tokenId;
    _tokenId[0] = totalSupply().add(1);
    _mint(owner, _tokenId[0]);
    setDataDeed(owner, _URItree, _tokenId[0]);
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

  function setDataDeed(address _treeOwner, string _URItree, uint256 _tokenId)
  public returns (bool){
    require(msg.sender == owner || msg.sender == admin);
    treeMetaData[_tokenId] = Tree(_treeOwner, _URItree, true);
    return true;
  }

  function showTreeOwner(uint256 _tokenId) external view returns(address){
    return(treeMetaData[_tokenId].treeOwner);
  }

  function showTreeURI(uint256 _tokenId) external view returns(string){
    return(treeMetaData[_tokenId].URItree);
  }

  function showActiveTree(uint256 _tokenId) internal view returns(bool){
    return(treeMetaData[_tokenId].active);
  }

  function setOwnershipDeed(address _to, uint256 _tokenId) external returns(bool){
    require(msg.sender == treeMetaData[_tokenId].treeOwner);
    if (!showActiveTree(_tokenId)){
      return false;
    }
    return true;
  }


}


