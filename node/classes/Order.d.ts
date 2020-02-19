import { Address, Uint256, Bytes32, Uintable } from 'pollenium-buttercup';
import { ORDER_TYPE } from '../enums';
import { Uish } from 'pollenium-uvaursi';
export interface OrderStruct {
    type: ORDER_TYPE;
    prevBlockHash: Uish;
    quotToken: Uish;
    variToken: Uish;
    tokenLimit: Uintable;
    priceNumer: Uintable;
    priceDenom: Uintable;
}
export declare class Order {
    readonly struct: OrderStruct;
    readonly type: ORDER_TYPE;
    readonly prevBlockHash: Bytes32;
    readonly quotToken: Address;
    readonly variToken: Address;
    readonly tokenLimit: Uint256;
    readonly priceNumer: Uint256;
    readonly priceDenom: Uint256;
    private sugma;
    private sugmaHash;
    constructor(struct: OrderStruct);
    private getSugma;
    getSugmaHash(): Bytes32;
    getTokenUnfilled(tokenFilledUintable: Uintable): Uint256;
    getTokenAvail(struct: {
        tokenFilled: Uintable;
        tokenBalance: Uintable;
    }): Uint256;
}
export declare class QuotVariTokenMatchError extends Error {
    constructor(token: Address);
}
declare class NullError extends Error {
    constructor(variableName: string);
}
declare class ZeroError extends Error {
    constructor(variableName: string);
}
export declare class NullQuotTokenError extends NullError {
    constructor();
}
export declare class NullVariTokenError extends NullError {
    constructor();
}
export declare class ZeroTokenLimitError extends ZeroError {
    constructor();
}
export declare class ZeroPriceNumerError extends ZeroError {
    constructor();
}
export declare class ZeroPriceDenomError extends ZeroError {
    constructor();
}
export {};
