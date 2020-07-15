const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(
  __dirname,
  'iotChain',
  'StorageIotOnChain.sol'
);
const source = fs.readFileSync(contractPath, 'utf8');

const output = JSON.parse(
  solc.compile(
    JSON.stringify({
      language: 'Solidity',
      sources: {
        'StorageIotOnChain.sol': {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['metadata', 'evm.bytecode', 'evm.bytecode.sourceMap'],
          },
          def: {
            StorageIotOnChain: ['abi', 'evm.bytecode.opcodes'],
          },
        },
      },
    })
  )
).contracts['StorageIotOnChain.sol'];

const abi = JSON.parse(output.StorageIotOnChain.metadata).output.abi;
const bytecode = output.StorageIotOnChain.evm.bytecode.object;

module.exports = { abi, bytecode };
