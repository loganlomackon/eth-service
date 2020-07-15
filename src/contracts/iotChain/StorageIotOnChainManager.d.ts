export interface StorageIotOnChainManager {
  methods: {
    deploy(): Promise<string>;
    updateNum(address: string, num: number): Promise<number>;
    push(
      address: string,
      sensorId: string,
      recordedAt: string,
      hashedData: string
    ): Promise<string>;
    getRecent(address: string, sensorId: string): Promise<string>;
  };
}
