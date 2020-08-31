export declare interface StorageIotOnChainManager {
  methods: {
    getAccount(): Promise<string>;
    getAbi(): string;
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
