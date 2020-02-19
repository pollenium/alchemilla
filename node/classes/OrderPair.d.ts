import { Address, Uint256, Uintable } from 'pollenium-buttercup';
import { Order, OrderStruct } from './Order';
export declare class OrderPair {
    readonly struct: {
        buyyOrder: Order | OrderStruct;
        sellOrder: Order | OrderStruct;
    };
    buyyOrder: Order;
    sellOrder: Order;
    quotToken: Address;
    variToken: Address;
    constructor(struct: {
        buyyOrder: Order | OrderStruct;
        sellOrder: Order | OrderStruct;
    });
    getSolution(struct: {
        buyyOrderTokenFilled: Uintable;
        buyyOrderTokenBalance: Uintable;
        sellOrderTokenFilled: Uintable;
        sellOrderTokenBalance: Uintable;
    }): {
        quotTokenTrans: Uint256;
        variTokenTrans: Uint256;
        quotTokenArbit: Uint256;
    };
}
export declare class InvalidBuyyOrderTypeError extends Error {
    constructor();
}
export declare class InvalidSellOrderTypeError extends Error {
    constructor();
}
export declare class QuotTokenMismatchError extends Error {
    constructor();
}
export declare class VariTokenMismatchError extends Error {
    constructor();
}
export declare class PriceConstraintError extends Error {
    constructor();
}
