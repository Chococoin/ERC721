pragma solidity ^0.4.20;

import './CocoaVirtualField.sol';
import './SafeMath.sol';

contract CocoaTreeDeedSell is SafeMath{
  CocoaVirtualField public deedStore;
  address public admin;
  uint256 public tokenPrice;
  uint256 public treesSold;
  uint256 public deedStock;
  bool public paused;

  modifier notPaused{
    require(paused == false);
    _; 
  }

  modifier onlyAdmin{
    require(msg.sender == admin);
    _;
  }

  event sell(address _buyer, uint256 _amount);
  event contractState(bool paused);

  constructor(CocoaVirtualField _deedStore, uint256 _tokePrice) public {
    admin = msg.sender;
    deedStore = _deedStore;
    tokenPrice = _tokePrice;
    paused = false;
  }

  function treesInStock() external view returns(uint256){
    return deedStore.balanceOf(this);
  }

  function buyDeeds(uint256 _numberOfTokens) external notPaused payable returns(bool){
    require(msg.value == mul(_numberOfTokens, tokenPrice));
    require(deedStore.balanceOf(this) >= _numberOfTokens);
    require(deedStore.transfer(_numberOfTokens));
    treesSold += _numberOfTokens;
    emit sell(msg.sender, _numberOfTokens);
    return true;
  }

  function pauseContract() external notPaused onlyAdmin returns (bool){
    emit contractState(bool);
    return (paused = true);
  }

}
