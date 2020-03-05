import { Uintable } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
import { SignedOrder } from '../../SignedOrder';
export interface ExecutionRequest {
    blockNumber: Uintable;
    signedBuyyOrders: Array<SignedOrder>;
    signedSellOrders: Array<SignedOrder>;
    exchanges: Array<{
        signedBuyyOrderIndex: Uintable;
        signedSellOrderIndex: Uintable;
        quotTokenTrans: Uintable;
        variTokenTrans: Uintable;
        quotTokenArbit: Uintable;
    }>;
}
export declare class EngineWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    setOwner(ownerUish: Uish): Promise<void>;
    setExecutorOracle(executorOracleUish: Uish): Promise<void>;
    depositViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    depositViaSweep(struct: {
        toAndFrom: Uish;
        token: Uish;
    }): Promise<void>;
    withdrawViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    withdrawAndNotifyViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    execute(executionRequest: ExecutionRequest): Promise<void>;
}
