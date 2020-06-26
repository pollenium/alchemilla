import { Uintable } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { ContractWriter, ContractWriterChildStruct, StateChange } from 'pollenium-clover';
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
    setOwner(ownerUish: Uish): Promise<StateChange>;
    setExecutorOracle(executorOracleUish: Uish): Promise<StateChange>;
    depositViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<StateChange>;
    depositViaSignature(struct: ActionViaSignatureStruct): Promise<StateChange>;
    withdrawViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<StateChange>;
    withdrawViaSignature(struct: ActionViaSignatureStruct): Promise<StateChange>;
    withdrawAndNotifyViaNative(struct: {
        to: Uish;
        token: Uish;
        amount: Uintable;
    }): Promise<StateChange>;
    withdrawAndNotifyViaSignature(struct: ActionViaSignatureStruct): Promise<StateChange>;
    execute(executionRequest: ExecutionRequest): Promise<StateChange>;
    private actionViaSignature;
}
