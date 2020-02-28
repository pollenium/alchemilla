import { Address, Uint256 } from 'pollenium-buttercup';
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
    private priority;
    constructor(struct: SignedOrderStruct);
    getTrader(): Address;
    getEthersArg(): any;
    getLigma(): Uu;
    static fromLigma(uishLigma: Uish): SignedOrder;
    getPriority(): Uint256;
}
