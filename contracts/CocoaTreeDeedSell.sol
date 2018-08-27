pragma solidity ^0.4.20;

import './CocoaVirtualField.sol';
import './SafeMath.sol';

contract CocoaTreeDeedSell is SafeMath{
  CocoaVirtualField public deedStore;
  address admin;
  uint256 public tokenPrice;
  uint256 public tokensSold;
  bool public paused;

  modifier notPaused{
    require(notPaused == false);
    _; 
  }

  event sell(address _buyer, uint256 _amount);

  constructor(CocoaVirtualField _deedStore, uint256 _tokePrice) public {
    admin = msg.sender;
    tokenContract = _deedStore;
    tokenPrice = _tokePrice;
    paused = false;
  }

  function buyDeeds(uint256 _numberOfTokens) notPaused payable return(bool){
    require(msg.value == mul(_numberOfTokens, tokenPrice));
    
  }
}
