const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, bytecode } = require('../../../compile');
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Local test network
//const web3 = new Web3(ganache.provider());
const provider = new HDWalletProvider(
  'call glow acoustic vintage front ring trade assist shuffle mimic volume reject',
  'https://rinkeby.infura.io/v3/189036cec1b2453990a4e4b237744c8f'
);
const web3 = new Web3(provider);

async function getAccount() {
  let accounts = await web3.eth.getAccounts();
  return accounts[0];
}

function getAbi() {
  return JSON.stringify(abi);
}

async function deploy() {
  const account = await getAccount();
  //Contract
  let storageIotOnChain = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: account, gas: '1000000' });
  return storageIotOnChain.options.address;
}

function getContract(address) {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
}

async function updateNum(address, num) {
  const account = await getAccount();
  const contract = getContract(address);
  await contract.methods.setter(num).send({ from: account });
  return await contract.methods.getter().call();
}

async function push(address, sensorId, recordedAt, hashedData) {
  const contract = getContract(address);
  const account = await getAccount();
  console.log(
    'Input:',
    address,
    '   ',
    sensorId,
    '    ',
    recordedAt,
    '    ',
    hashedData
  );
  console.log('account:', account);
  const receipt = await contract.methods
    .push(
      web3.utils.utf8ToHex(sensorId),
      web3.utils.utf8ToHex(recordedAt),
      hashedData
    )
    .send({ from: account });
  console.log(receipt);
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
      recorded_at: web3.utils.hexToUtf8(recents.resRecordedAt[i]),
      hashed_data: recents.resHashedData[i],
    });
  }

  return result;
}

module.exports = { getAccount, getAbi, deploy, updateNum, push, getRecent };
