import { Address, Uint256, Bytes32, Uintable } from 'pollenium-buttercup';
import { OrderDirection } from '../enums';
import { Uish } from 'pollenium-uvaursi';
import Bignumber from 'bignumber.js';
export interface OrderStruct {
    salt: Uish;
    direction: OrderDirection;
    expiration: Uintable;
    quotToken: Uish;
    variToken: Uish;
    tokenLimit: Uintable;
    priceNumer: Uintable;
    priceDenom: Uintable;
}
export declare class Order {
    readonly struct: OrderStruct;
    readonly salt: Bytes32;
    readonly direction: OrderDirection;
    readonly expiration: Uint256;
    readonly quotToken: Address;
    readonly variToken: Address;
    readonly tokenLimit: Uint256;
    readonly priceNumer: Uint256;
    readonly priceDenom: Uint256;
    private price;
    private sugma;
    private sugmaHash;
    constructor(struct: OrderStruct);
    private getSugma;
    getSugmaHash(): Bytes32;
    getPrice(): Bignumber;
    getLimitingToken(): Address;
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
