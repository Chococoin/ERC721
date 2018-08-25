var CocoaVirtualField = artifacts.require('./CocoaVirtualField.sol');

contract('CocoaVirtualField', function(accounts) {

  var contractInstance;
  var newAdmin = '0xBA5F0EE1E4A5f0cE5980B0B6CA7E90460cc40C0a';  

  it('initializes the contract with the correct values', function() {
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.address;
    }).then((address)=> {
        assert.notEqual(address, 0x00, 'Has contract address');
      });
  });

  it('create the deed with the right id', function(){
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.totalSupply();
    }).then((NumOfTokens)=> {
        assert(NumOfTokens, 0, 'Has not token yet.');
        return contractInstance.createDeed();
    }).then((bool)=> {
        assert(bool, true, 'deed has been created.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 1, 'token added.');
    });
  });

  it('Set the admin of contract', function(){
    return CocoaVirtualField.deployed().then((instance)=> {
      contractInstance = instance;
      return contractInstance.admin;
    }).then((address)=>{
        assert(address, 0x0, 'has not admin.');
        return contractInstance.setAdmin(newAdmin);  
    }).then((address)=>{
        assert(address, newAdmin, 'has admin settled.');
    });
  });
});





/*  it('initializes the contract with the correct values', function() {
    return DappTokenSale.deployed().then(function(instance) {
      tokenSaleInstance = instance;
      return tokenSaleInstance.address
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'has contract address');
      return tokenSaleInstance.tokenContract();
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'has token contract address');
      return tokenSaleInstance.tokenPrice();
    }).then(function(price) {
      assert.equal(price, tokenPrice, 'token price is correct');
    });
  });*/