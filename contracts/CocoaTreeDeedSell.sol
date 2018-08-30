pragma solidity ^0.4.20;

import './CocoaVirtualField.sol';
import './SafeMath.sol';

contract CocoaTreeDeedSell{
  using SafeMath for uint256;
  CocoaVirtualField public deedStore;
  address public admin;
  uint256 public tokenPrice;
  uint256 public treesSold;
  uint256 public lastPayment;
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
    lastPayment = now;
    paused = false;
  }

  function treesInStock() external view returns(uint256){
    return deedStore.balanceOf(this);
  }

  function buyDeeds(uint256 _numberOfTokens) external notPaused payable returns(bool){
    require(msg.value == tokenPrice.mul(_numberOfTokens));
    require(deedStore.balanceOf(this) >= _numberOfTokens);
    address(this).transfer(_numberOfTokens);
    treesSold += _numberOfTokens;
    emit sell(msg.sender, _numberOfTokens);
  }

  function pauseContract() external notPaused onlyAdmin returns (bool){
    emit contractState(!paused);
    return (paused = true);
  }

}

/*pragma solidity ^0.4.20;

contract stampDate {
    
    uint256 public date;
    uint256 public token;
    address public owner;
    uint256 tokenprice = 100000000000000000;
    
    struct holder {
        uint256 balance;
        uint256 dateEntry;
    }
    
    mapping(address => holder) balanceOf;
    
    constructor(uint256 _totalSupply) public{
        date = now;
        owner = msg.sender;
        balanceOf[owner].balance = _totalSupply;
    }
    
    function buyStampedToken(address _to, uint256 _tokens){
        require(balanceOf[owner].balanceOf >= tokens);
        require(msg.value )
        balanceOf[_to].balance =  
    }
    
}*/
