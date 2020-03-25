import { Address, Uint256, Bytes32 } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover';
export declare class EngineReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchOrderSalt(): Promise<Bytes32>;
    fetchDepositSalt(): Promise<Bytes32>;
    fetchWithdrawSalt(): Promise<Bytes32>;
    fetchWithdrawAndNotifySalt(): Promise<Bytes32>;
    fetchOwner(): Promise<Address>;
    fetchExecutorOracle(): Promise<Address>;
    fetchBalance(struct: {
        token: Uish;
        holder: Uish;
    }): Promise<Uint256>;
    fetchFill(signatureHash: Uish): Promise<Uint256>;
}
