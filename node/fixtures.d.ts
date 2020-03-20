import { Address, Uint256, Bytes32 } from 'pollenium-buttercup';
import { ORDER_TYPE } from './enums';
import { Keypair } from 'pollenium-ilex';
import { Uu } from 'pollenium-uvaursi';
export declare const alice: Address;
export declare const bob: Address;
export declare const dai: Address;
export declare const usdc: Address;
export declare const weth: Address;
export declare const mkr: Address;
export declare const nullAddress: Address;
export declare const uint256Zero: Uint256;
export declare const nullBytes32: Bytes32;
export declare const keypair: Keypair;
export declare const validOrderStruct: {
    salt: Uu;
    target: number;
    type: ORDER_TYPE;
    quotToken: Address;
    variToken: Address;
    originator: Address;
    tokenLimit: Uint256;
    priceNumer: Uint256;
    priceDenom: Uint256;
};
