import { Router, Request, Response } from 'express';
const {
  deploy,
  push,
  getRecent,
} = require('../contracts/iotChain/StorageIotOnChainManager');

class IotChainObj {
  constructor(
    public sensorId: string,
    public recordedAt: string,
    public hashedData: string
  ) {}
}

const router = Router();

let address: string;

router.get('/api/iotchain/address', async (req: Request, res: Response) => {
  if (!address) {
    try {
      address = await deploy();
    } catch (error) {
      console.log(error);
    }
  }
  res.send({ address: address });
});

router.post('/api/iotchain/push', async (req: Request, res: Response) => {
  const obj: IotChainObj = req.body;
  const txHash = await push(
    address,
    obj.sensorId,
    obj.recordedAt,
    obj.hashedData
  );
  res.send({ txHash: txHash });
});

router.post('/api/iotchain/recent', async (req: Request, res: Response) => {
  const obj: IotChainObj = req.body;
  const recents = await getRecent(address, obj.sensorId);
  res.send(recents);
});

export { router };
