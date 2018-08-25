var CocoaVirtualField = artifacts.require('./CocoaVirtualField.sol');

contract('CocoaVirtualField', function(accounts) {

  var contractInstance;
  var newAdmin = '0xBA5F0EE1E4A5f0cE5980B0B6CA7E90460cc40C0a';
  var msgsender = web3.eth.accounts[0];
  var outsider = web3.eth.accounts[4];

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
        return contractInstance.createDeed("texto", {from: msgsender});
    }).then((bool)=> {
        assert(bool, true, 'deed has been created.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 1, 'token added.');
        return contractInstance.myTrees.call(msgsender);
    }).then((list)=>{
        assert(list.length, 1, 'has a tree in list');
        return contractInstance.myTrees.call(newAdmin);
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0, 'cannot show tree wihtout having one');
        return contractInstance.createDeed({from: outsider});
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0, 'only owner/admin can create deeds');
        contractInstance.setAdmin(newAdmin, {from: msgsender});
        return contractInstance.createDeed("texto",{from: newAdmin});
    }).then((bool)=>{
        assert(bool, true, 'admin create deed.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 2, 'token added by admin.');
        return contractInstance.createDeed({from: msgsender});
    }).then((bool)=>{
        assert(bool, true, 'create a deed wihtout data');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 3, 'Another deed created.')
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

/*  it('Add data to a token', function(){
    return CocoaVirtualField.deployed().then((instance)=>{

    });
  });*/

})


// .then(assert.fail).catch(function(error) {
//       assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');