import { Address } from 'pollenium-buttercup';
import { Order } from './Order';
export declare class OrderPair {
    buyyOrder: Order;
    sellOrder: Order;
    quotToken: Address;
    variToken: Address;
    constructor(struct: {
        buyyOrder: Order;
        sellOrder: Order;
    });
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
