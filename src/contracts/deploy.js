const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./iotChain/compile');

const PRIV_KEY =
  'EB5634E29FD7B5F64D1470D1E98F55D6BE1794EBC1949902A72D8BB684F69310';
const INFURA_ID = '5259b8e0f02543278281d6f9e57f90f1';
const INFURA_SECRET = '4e91d367acce41cb882f7de801947881';
const INFURA_RINKBY_PATH =
  'https://rinkeby.infura.io/v3/5259b8e0f02543278281d6f9e57f90f1';

const provider = new HDWalletProvider(PRIV_KEY, INFURA_RINKBY_PATH);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account:', accounts[0]);
  const receipt = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to:' + receipt.options.address);
};
deploy();
