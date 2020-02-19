import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover';
export declare class TokenReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchBalance(holder: Address): Promise<Uint256>;
    fetchAllowance(struct: {
        holder: Address;
        spender: Address;
    }): Promise<Uint256>;
}
