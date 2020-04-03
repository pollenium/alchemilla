import { Address, Uint256 } from 'pollenium-buttercup';
import { SignedOrder } from './SignedOrder';
import { OrderPair } from './OrderPair';
import { StateFetcher } from './StateFetcher';
export interface Solution {
    quotTokenTrans: Uint256;
    variTokenTrans: Uint256;
    quotTokenArbit: Uint256;
}
export declare class SignedOrderPair extends OrderPair {
    signedBuyyOrder: SignedOrder;
    signedSellOrder: SignedOrder;
    quotToken: Address;
    variToken: Address;
    constructor(struct: {
        signedBuyyOrder: SignedOrder;
        signedSellOrder: SignedOrder;
    });
    calcSolution(stateFetcher: StateFetcher): Promise<Solution>;
}
