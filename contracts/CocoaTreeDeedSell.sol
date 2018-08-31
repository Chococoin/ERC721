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

/*
pragma solidity ^0.4.20;

contract stampDate {
    
    uint256 public startDate;
    uint256 public finalDate;
    uint256 public token;
    address public owner;
    uint256 tokenprice;
    uint256 public allowance;
    uint256 public globalProduction;
    uint256 public currentlyCicleProduction;
    
    struct holder {
        uint256 balance;
        uint256 production;
        uint256 cicleProduction;
    }
    
    mapping(address => holder) balanceOf;
    
    constructor() public{
        tokenprice = 1000000000000000000;
        startDate = now;
        owner = msg.sender;
        balanceOf[owner].balance = 400;
        currentlyCicleProduction = 1;
    }
    
    function buyStampedToken(uint256 _tokens) external payable{
        require(balanceOf[owner].balance >= _tokens);
        require(msg.value == tokenprice*_tokens);
        require(balanceOf[msg.sender].cicleProduction == currentlyCicleProduction ||
        balanceOf[msg.sender].cicleProduction == 0);
        if (balanceOf[msg.sender].cicleProduction == 0) {
           balanceOf[msg.sender].cicleProduction = currentlyCicleProduction; 
        }
        uint256[1] memory _production;
        _production[0] = now * _tokens;
        balanceOf[msg.sender].balance += _tokens;
        balanceOf[msg.sender].production = _production[0];
        balanceOf[owner].balance -= _tokens;
        globalProduction += _production[0];
        address(owner).transfer(msg.value);
        token += _tokens;
    }
    
    function showProduction() external view returns(uint256){
        return balanceOf[msg.sender].production;
    }
    
    function showOwnerBalance() external view returns(uint256){
        return balanceOf[owner].balance;
    }
    
    function showAllowance() external view returns(uint256){
        return address(this).balance;
    }
    
    function showCurrentCicle() external view returns(uint256){
        return balanceOf[msg.sender].cicleProduction;
    }
    
    function paymentMoment() external payable{
        require(msg.sender == owner);
        currentlyCicleProduction += 1;
        finalDate = now;
        allowance = msg.value;
    }
    
    function takeShares() external returns(bool){
        require(balanceOf[msg.sender].cicleProduction < currentlyCicleProduction);
        balanceOf[msg.sender].cicleProduction += 1;
        uint256[1] memory iPro;
        iPro[0] = (balanceOf[msg.sender].production * allowance / globalProduction);
        address(msg.sender).transfer(iPro[0]);
        return true;
    }
}
 */
