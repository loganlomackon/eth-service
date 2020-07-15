import * as assert from 'assert';
const {
  deploy,
  updateNum,
  push,
  getRecent,
} = require('../src/contracts/iotChain/StorageIotOnChainManager');

let address: string;
beforeEach(async () => {
  address = await deploy();
  console.log('address:', address);
});

describe('StorageIotOnChain', () => {
  it('Update num', async () => {
    const num = await updateNum(address, 100);
    assert.equal(num, 100);
  });

  it('Can push sensor hash', async () => {
    const sensorId = 'a';
    const recordedAt = '2020-07-02';
    const hashedData = 'abcde';

    const txHash = await push(address, sensorId, recordedAt, hashedData);
    console.log(txHash);

    const recents = await getRecent(address, sensorId);
    console.log(recents);
  });
});
