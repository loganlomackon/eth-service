const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, bytecode } = require('../../../compile');

//Local test network
const web3 = new Web3(ganache.provider());
let accounts;

async function deploy() {
  accounts = await web3.eth.getAccounts();
  //Contract
  let storageIotOnChain = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
  return storageIotOnChain.options.address;
}

function getContract(address) {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
}

async function updateNum(address, num) {
  const contract = getContract(address);
  await contract.methods.setter(num).send({ from: accounts[0] });
  return await contract.methods.getter().call();
}

async function push(address, sensorId, recordedAt, hashedData) {
  const contract = getContract(address);
  const receipt = await contract.methods
    .push(
      web3.utils.utf8ToHex(sensorId),
      web3.utils.utf8ToHex(recordedAt),
      web3.utils.utf8ToHex(hashedData)
    )
    .send({ from: accounts[0] });
  return receipt.transactionHash;
}

async function getRecent(address, sensorId) {
  const contract = getContract(address);
  const recents = await contract.methods
    .getRecent(web3.utils.utf8ToHex(sensorId))
    .call();

  var result = [];
  var i;
  for (i = 0; i < recents.resRecordedAt.length; i++) {
    result.push({
      recordedAt: web3.utils.hexToUtf8(recents.resRecordedAt[i]),
      hashedData: web3.utils.hexToUtf8(recents.resHashedData[i]),
    });
  }

  return result;
}

module.exports = { deploy, updateNum, push, getRecent };
