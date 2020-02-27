import { Address, Uint256 } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover';
export declare class EngineReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchOwner(): Promise<Address>;
    fetchExecutorOracle(): Promise<Address>;
    fetchBalance(struct: {
        token: Uish;
        holder: Uish;
    }): Promise<Uint256>;
}
