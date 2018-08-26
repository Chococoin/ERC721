var CocoaVirtualField = artifacts.require('./CocoaVirtualField.sol');

contract('CocoaVirtualField', function(accounts) {

  var contractInstance;
  var newAdmin = web3.eth.accounts[1];;
  var owner = web3.eth.accounts[0];
  var outsider = web3.eth.accounts[4];

  it('initializes the contract with the correct values', function() {
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.address;
    }).then((address)=> {
        assert.notEqual(address, 0x00, 'has contract address.');
      });
  });

  it('set a new admin', function() {
    return CocoaVirtualField.deployed().then((instance)=> {
      contractInstance = instance;
      return contractInstance.admin;
    }).then((address)=>{
        assert(address, 0x0, 'has to address for admin yet.');
        return contractInstance.setAdmin(newAdmin, {owner});
    }).then((bool)=> {
        assert(bool, true, 'fuction return true at end');
        assert(contractInstance.admin, newAdmin, 'has new admin.');
    });
  });

// Workaround to be aviable to work with Overload function in truffle.
/*  it('create the deed with the right id', function(){
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.totalSupply();
    }).then((NumOfTokens)=> {
        assert(NumOfTokens, 0, 'Has not token yet.');
        return contractInstance.createDeed("texto", {from: owner});
    }).then((bool)=> {
        assert(bool, true, 'deed has been created.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 1, 'token added.');
        return contractInstance.myTrees.call(owner);
    }).then((list)=>{
        assert(list.length, 1, 'has a tree in list');
        contractInstance.setAdmin(newAdmin, {from: owner})
        return contractInstance.createDeed("texto",{from: newAdmin});
    }).then((bool)=>{
        assert(bool, true, 'admin create deed.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 2, 'token added by admin.');
        return contractInstance.createDeed("texto", {from: owner});
    }).then((bool)=>{
        assert(bool, true, 'create a deed wihtout data');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 3, 'Another deed created.')
    });
  });*/

  it('create the deed with the right id', function(){
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.totalSupply();
    }).then((NumOfTokens)=> {
        assert(NumOfTokens, 0, 'Has not token yet.');
        return contractInstance.createDeed({from: owner});
    }).then((bool)=> {
        assert(bool, true, 'deed has been created.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 1, 'token added.');
        return contractInstance.myTrees.call(owner);
    }).then((list)=>{
        assert(list.length, 1, 'has a tree in list.');
        contractInstance.setAdmin(newAdmin)
        return contractInstance.createDeed({from: newAdmin});
    }).then((bool)=>{
        assert(bool, true, 'admin create deed.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 2, 'token added by admin.');
        return contractInstance.createDeed({from: owner});
    }).then((bool)=>{
        assert(bool, true, 'create a deed wihtout data.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 3, 'Another deed created.');
        return contractInstance.createDeed({from:outsider});
    }).then(assert.fail).catch((error)=>{
        assert(error.message.indexOf('revert') >= 0, 'outsider cannot create deed.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert(NumOfTokens, 3, 'does not create a new deed.');
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

  it('Add right name of contract', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      return contractInstance.name();
    }).then((str)=>{
        assert(str, 'CocoaVirtualField', 'has the right name.');
    });
  });

  it('Add data to deed with setDataDeed', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      contractInstance.createDeed();
      return contractInstance.setDataDeed(owner, "SomeData", 1);
    }).then((bool)=>{
        assert(bool, true, 'function returns true.');
        return contractInstance.showTreeOwner(1);
    }).then((address)=>{
        assert(address, owner, 'return the owner of deed.');
        return contractInstance.showTreeURI(1, {from: outsider});
    }).then((string)=>{
        assert(string, "SomeData", 'return the data of the deed.');
        return contractInstance.showActiveTree(1, {from: newAdmin});
    }).then((bool)=>{
        assert(bool, true, 'return the status of activation of tree. ');
        contractInstance.createDeed();
        return contractInstance.setDataDeed(owner, "SomeData", 2, {from:outsider});
    }).then(assert.fail).catch((error)=>{
         assert(error.message.indexOf('revert') >= 0, 'Outside cannot save data.' );
    });
  });

  it('Set ownership of deed to new owner', function(){
     return CocoaVirtualField.deployed().then((instance)=>{
       contractInstance = instance;
       contractInstance.createDeed();
       contractInstance.createDeed();
       return contractInstance.setOwnershipDeed(outsider, 2, {from: owner});
     }).then((bool)=>{
        //assert(bool, true, 'ejecute the function setOwnershipDeed.');
        assert(bool, false, 'cannot ejecute setOwnershipDeed with an inactive tree.');
     });
  });

})


// .then(assert.fail).catch(function(error) {
//       assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');