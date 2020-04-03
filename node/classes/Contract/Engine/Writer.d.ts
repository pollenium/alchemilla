import { Uintable } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
import { SignedOrder } from '../../SignedOrder';
import { SignatureStruct } from 'pollenium-ilex';
export interface Exchange {
    signedBuyyOrderIndex: Uintable;
    signedSellOrderIndex: Uintable;
    quotTokenTrans: Uintable;
    variTokenTrans: Uintable;
    quotTokenArbit: Uintable;
}
export interface ExecutionRequest {
    signedOrders: Array<SignedOrder>;
    exchanges: Array<Exchange>;
}
export interface ActionViaSignatureStruct {
    to: Uish;
    token: Uish;
    amount: Uintable;
    expiration: Uintable;
    nonce: Uish;
    signature: SignatureStruct;
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
    depositViaSignature(struct: ActionViaSignatureStruct): Promise<void>;
    withdrawViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    withdrawViaSignature(struct: ActionViaSignatureStruct): Promise<void>;
    withdrawAndNotifyViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<void>;
    withdrawAndNotifyViaSignature(struct: ActionViaSignatureStruct): Promise<void>;
    execute(executionRequest: ExecutionRequest): Promise<void>;
    private actionViaSignature;
}
