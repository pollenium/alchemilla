import { Address } from 'pollenium-buttercup';
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
export declare class MonarchicExecutorOracleWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    setHot(hot: Address): Promise<void>;
    setCold(cold: Address): Promise<void>;
}
