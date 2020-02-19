import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover';
export declare class EngineReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchOwner(): Promise<Address>;
    fetchExecutorOracle(): Promise<Address>;
    fetchBalance(struct: {
        token: Address;
        holder: Address;
    }): Promise<Uint256>;
}
