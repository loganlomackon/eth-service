import { Router, Request, Response } from 'express';
const {
  deploy,
  push,
  getRecent,
  getAbi,
  getAccount,
} = require('../contracts/iotChain/StorageIotOnChainManager');

class IotChainObj {
  constructor(
    public sensor_id: string,
    public recorded_at: string,
    public hashed_data: string
  ) {}
}

const router = Router();

let address: string = '0x0cBd5Ff53038D36f112326940D3d7bD5c41197c9';

async function getAddress() {
  if (!address) {
    try {
      address = await deploy();
    } catch (error) {
      console.log(error);
    }
  }
  return address;
}

router.get('/api/iotchain/account', async (req: Request, res: Response) => {
  const account = await getAccount();
  res.send({ account: account });
});

router.get('/api/iotchain/address', async (req: Request, res: Response) => {
  const addr = await getAddress();
  res.send({ address: addr });
});

router.post('/api/iotchain/address', async (req: Request, res: Response) => {
  address = req.body.address;
  res.send({ address: address });
});

router.get('/api/iotchain/abi', async (req: Request, res: Response) => {
  const abi = await getAbi();
  res.send({ abi: abi });
});

router.post('/api/iotchain/push', async (req: Request, res: Response) => {
  const addr = await getAddress();
  const obj: IotChainObj = req.body;
  const txHash = await push(
    addr,
    obj.sensor_id,
    obj.recorded_at,
    obj.hashed_data
  );
  res.send({ tx_hash: txHash });
});

router.post('/api/iotchain/recent', async (req: Request, res: Response) => {
  const addr = await getAddress();
  const obj: IotChainObj = req.body;
  const recents = await getRecent(addr, obj.sensor_id);

  res.send(recents);
});

export { router };
