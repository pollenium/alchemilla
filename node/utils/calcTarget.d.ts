import { Uintable, Uint256 } from 'pollenium-buttercup';
export declare function calcTarget(struct: {
    originalBlockNumber: Uintable;
    currentBlockNumber: Uintable;
    latency: number;
}): Uint256;
