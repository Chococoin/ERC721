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
        return contractInstance.name();
    }).then((str)=>{
        assert.equal(str, 'CocoaVirtualFields', 'has the right name.');
    });
  });

  it('set a new admin', function() {
    return CocoaVirtualField.deployed().then((instance)=> {
      contractInstance = instance;
      return contractInstance.admin.call();
    }).then((address)=>{
        assert.equal(address, 0x0, 'has to address for admin yet.');
        return contractInstance.setAdmin.call(newAdmin, {owner});
    }).then((bool)=> {
        assert.equal(bool, true, 'fuction return true at end');
        contractInstance.setAdmin(newAdmin, {owner});
        return contractInstance.admin.call(); 
    }).then((address)=>{
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
        assert.equal(NumOfTokens.toNumber(), 0, 'Has not token yet.');
        return contractInstance.createDeed.call();
    }).then((bool)=> {
        assert.equal(bool, true, 'deed has been created.');
        contractInstance.createDeed();
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens.toNumber(), 1, 'token added.');
        return contractInstance.myTrees(owner);
    }).then((list)=>{
        assert.equal(list.length, 1, 'has a tree in list.');
        contractInstance.setAdmin(newAdmin);
        return contractInstance.createDeed.call({from: newAdmin});
    }).then((bool)=>{
        assert.equal(bool, true, 'admin create deed.');
        contractInstance.createDeed({from: newAdmin});
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens.toNumber(), 2, 'token added by admin.');
        return contractInstance.createDeed.call({from: owner});
    }).then((bool)=>{
        assert.equal(bool, true, 'create a deed wihtout data.');
        contractInstance.createDeed({from: owner});
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{      
        assert(NumOfTokens.toNumber(), 3, 'Another deed created.');
        return contractInstance.createDeed({from:outsider});
    }).then(assert.fail).catch((error)=>{
        assert(error.message.indexOf('revert') >= 0, 'outsider cannot create deed.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens.toNumber(), 3, 'does not create a new deed.');
    });
  }); 

  it('Add data to deed with setDataDeed', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      contractInstance.createDeed();      
      contractInstance.createDeed();
      return contractInstance.setDataDeed.call(owner, "SomeData", 1);
    }).then((bool)=>{
        assert.equal(bool, true, 'function returns true.');
        return contractInstance.showTreeOwner(1);
    }).then((address)=>{
        assert.equal(address, owner, 'return the owner of deed.');
        return contractInstance.showTreeURI(1, {from: outsider});
    }).then((string)=>{    
        assert.equal(string, "NoData", 'return the data of the deed.');
        return contractInstance.showActiveTree(1, {from: newAdmin});
    }).then((bool)=>{      
        assert(bool, false, 'return the status of activation of tree. ');
        return contractInstance.setDataDeed(owner, "SomeData", 2, {from:outsider});
    }).then(assert.fail).catch((error)=>{
        console.log(error);       
        assert(error.message.indexOf('revert') >= 0, 'Outside cannot save data.' );
    });
  });

  it('Set ownership of deed to new owner', function(){
     return CocoaVirtualField.deployed().then((instance)=>{
       contractInstance = instance;
       contractInstance.createDeed();
       contractInstance.createDeed();
       contractInstance.setOwnershipDeed(outsider, 2, {from: owner});
       return contractInstance.showActiveTree(2);
      }).then((bool)=>{
          console.log(bool);
          assert.equal(bool, false, 'igual a false');
      }); 
/*     }).then(assert.fail).catch((error)=>{
          assert(error.message.indexOf('revert') >= 0, 'cannot set ownership of a inactive tree.');
     });*/
  });

})


// .then(assert.fail).catch(function(error) {
//       assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');