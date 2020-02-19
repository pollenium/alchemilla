import { Address } from 'pollenium-buttercup';
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover';
export declare class MonarchicExecutorOracleReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchOwner(): Promise<Address>;
    fetchHot(): Promise<Address>;
    fetchCold(): Promise<Address>;
}
