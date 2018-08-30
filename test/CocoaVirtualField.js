var CocoaVirtualField = artifacts.require('./CocoaVirtualField.sol');

contract('CocoaVirtualField', function(accounts) {

  var contractInstance;
  var newAdmin = web3.eth.accounts[1];;
  var owner = web3.eth.accounts[0];
  var outsider = web3.eth.accounts[4];
  var origin = 0x00;
  var cont1, cont2;

  it('initializes the contract with the correct values', function() {
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.address;
    }).then((address)=> {
        assert.notEqual(address, 0x00, 'has contract address.');
        return contractInstance.name();
    }).then((str)=>{
        assert.equal(str, 'CocoaVirtualFields', 'has the right name.');
        return contractInstance.owner();
    }).then((address)=>{
        assert.equal(address, owner, 'Owner is creator of contract.')
    });
  });

  it('set a new admin', function() {
    return CocoaVirtualField.deployed().then((instance)=> {
      contractInstance = instance;
      return contractInstance.admin.call();
    }).then((address)=>{
        assert.equal(address, 0x0, 'has to address for admin yet.');
        return contractInstance.setAdmin.call(newAdmin, {from: owner});
    }).then((bool)=> {
        assert.equal(bool, true, 'fuction return true at end');
        contractInstance.setAdmin(newAdmin, {from: owner});
        return contractInstance.admin.call(); 
    }).then((address)=>{
        assert(contractInstance.admin, newAdmin, 'has new admin.');
        return contractInstance.setAdmin.call(newAdmin, {from: outsider});
    }).then(assert.fail).catch((error)=>{
        assert(error.message.indexOf('revert') >= 0, 'Outsider cannot set admin.')
    });
  });

  it('create the deed with the right id', function(){
    return CocoaVirtualField.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.totalSupply();
    }).then((NumOfTokens)=> {
        assert.equal(NumOfTokens.toNumber(), 0, 'Has not token yet.');
        return contractInstance.createDeed.call("SomeData");
    }).then((bool)=> {
        assert.equal(bool, true, 'deed has been created.');
        contractInstance.createDeed("SomeData", {from: owner});
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens.toNumber(), 1, 'token added.');
        return contractInstance.myTrees({from: owner});
    }).then((list)=>{
        assert.equal(list.length, 1, 'has a tree in list.');
        return contractInstance.createDeed.call("SomeData", {from: newAdmin});
    }).then((bool)=>{
        assert.equal(bool, true, 'admin create deed.');
        contractInstance.createDeed("SomeData", {from: newAdmin});
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens.toNumber(), 2, 'token added by admin.');
        return contractInstance.createDeed.call("SomeData", {from: owner});
    }).then((bool)=>{
        assert.equal(bool, true, 'create another deed data.');
        contractInstance.createDeed("Pipo", {from: owner});
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{      
        assert(NumOfTokens.toNumber(), 3, 'Another deed created.');
        return contractInstance.createDeed("SomeData", {from:outsider});
    }).then(assert.fail).catch((error)=>{
        assert(error.message.indexOf('revert') >= 0, 'outsider cannot create deed.');
        return contractInstance.totalSupply();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens.toNumber(), 3, 'After faliure remain same number of deed.');
    });
  });

  it('New deed created is propiety of Owner', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      return contractInstance.showTreeOwner(3);
    }).then((address)=>{
        assert.equal(address, owner, 'new deed has owner as owner tree.');
        return contractInstance.numberInactives();
    }).then((NumOfTokens)=>{
        assert.equal(NumOfTokens, 3, 'all deed are inactives.');
    });
  });

  it('desactivate tree', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      return contractInstance.desactivateTree.call(3);
    }).then((bool)=>{
        assert.equal(bool, true, 'deed desactivated succefully.');
    });
  });

  it('execute the SafeTransferFrom', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      return contractInstance.showTreeOwner(2);
    }).then((address)=>{
        assert.equal(address, owner, 'show ownership tree.');
        contractInstance.safeTransferFrom(owner, outsider, 2, {from: owner});
        return contractInstance.showTreeOwner(2);
    }).then((address)=>{
        assert.equal(address, outsider, 'check new the outsider is new owner');
        return contractInstance.balanceOf(owner);
    }).then((num)=>{
        assert.equal(num.toNumber(), 2, 'Substract properly the deed to owner.');
        return contractInstance.showTreeOwner(1);
    }).then((address)=>{
        assert.equal(address, owner, 'Tree 1 is still from owner');
        return contractInstance.showTreeOwner(2);
    }).then((address)=>{
        assert.equal(address, outsider, 'check new the outsider is new owner');
        contractInstance.safeTransferFrom(owner, outsider, 1, {from: owner});
        return contractInstance.balanceOf(owner);
    }).then((num)=>{
        assert.equal(num.toNumber(), 1, 'Substract properly the deed to owner.');
        return contractInstance.showTreeOwner(3);        
    }).then((address)=>{
        assert.equal(address, owner, 'Tree 3 is still from owner');
        return contractInstance.showTreeURI(3);
    }).then((string)=>{
        assert.equal(string, "Pipo", 'Show right URI.');
        contractInstance.safeTransferFrom(outsider, newAdmin, 1, {from: outsider});
        return contractInstance.showTreeOwner(1);
    }).then((address)=>{
        assert.equal(address, newAdmin, 'Tree is now in the hands of admin.');
        cont1 = contractInstance.showTreeOwner(2);
        cont2 = contractInstance.
    });
  });

// Test unit for _setDataDeed when is public or external
/*  it('Add data to deed with setDataDeed', function(){
    return CocoaVirtualField.deployed().then((instance)=>{
      contractInstance = instance;
      contractInstance.createDeed("SomeData", {from: owner});      
      contractInstance.createDeed("SomeData", {from: owner});
      return contractInstance.setDataDeed.call(owner, "SomeData", 1, {from: owner});
    }).then((bool)=>{
        console.log(error);        
        assert.equal(bool, true, 'function returns true.');
        return contractInstance.showTreeOwner(1);
    }).then((address)=>{      
        assert.equal(address, 0x00, 'return the owner of deed.');
        return contractInstance.showTreeURI(1, {from: outsider});
    }).then((string)=>{   
        assert.equal(string, "SomeData", 'return the data of the deed.');
        return contractInstance.showActiveTree(1, {from: newAdmin});
    }).then((bool)=>{      
        assert(bool, false, 'return the status of activation of tree. ');
        return contractInstance.setDataDeed(owner, "SomeData", 1, {from: outsider});
    }).then(assert.fail).catch((error)=>{
        assert(error.message.indexOf('revert') >= 0, 'outside cannot save data.' );
        return contractInstance.setDataDeed.call(outsider, "SomeData", 5, {from: newAdmin});
    }).then((bool)=>{       
        assert.equal(bool, true, 'admin may set data deed.');
        contractInstance.setDataDeed(outsider, "SomeData", 5, {from: newAdmin});
        return contractInstance.setDataDeed(owner, "SomeData", 5, {from: newAdmin});
    }).then(assert.fail).catch((error)=>{
        assert(error.message.indexOf('revert') >= 0, 'cannot set data once the deed is propiety of final user.');
    });
  });*/
})
