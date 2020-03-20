import { Address, Bytes32, Uint256 } from 'pollenium-buttercup';
import { SignatureStruct } from 'pollenium-ilex';
import { Order, OrderStruct } from './Order';
import { Uu, Uish } from 'pollenium-uvaursi';
export interface SignedOrderStruct {
    order: Order | OrderStruct;
    signature: SignatureStruct;
}
export declare class SignedOrder extends Order {
    readonly signature: any;
    private trader;
    private ligma;
    private signatureHash;
    private priority;
    constructor(struct: SignedOrderStruct);
    getTrader(): Address;
    getEthersArg(): any;
    getLigma(): Uu;
    static fromLigma(uishLigma: Uish): SignedOrder;
    getSignatureHash(): Bytes32;
    getPriority(): Uint256;
}
