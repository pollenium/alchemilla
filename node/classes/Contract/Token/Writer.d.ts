import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
export declare class TokenWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    transfer(struct: {
        to: Address;
        amount: Uint256;
    }): Promise<void>;
    setAllowance(struct: {
        spender: Address;
        amount: Uint256;
    }): Promise<void>;
}
