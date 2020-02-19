import { Address, Uint256, Bytes32, Uint8, Uintable } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
import { SignedOrder } from '../../SignedOrder';
export declare class EngineWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    setOwner(owner: Address): Promise<void>;
    setExecutorOracle(executorOracle: Address): Promise<void>;
    depositViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    depositViaSweep(struct: {
        toAndFrom: Address;
        token: Address;
    }): Promise<void>;
    withdrawViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    execute(executionRequest: {
        prevBlockHash: Bytes32;
        buyyOrders: Array<SignedOrder>;
        sellOrders: Array<SignedOrder>;
        exchanges: Array<{
            signedBuyyOrderIndex: Uint8;
            signedSellOrderIndex: Uint8;
            quotTokenTrans: Uint256;
            variTokenTrans: Uint256;
            quotTokenArbit: Uint256;
        }>;
    }): Promise<void>;
}
