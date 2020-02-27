import { Uish } from 'pollenium-uvaursi';
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
export declare class MonarchicExecutorOracleWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    setHot(hotUish: Uish): Promise<void>;
    setCold(coldUish: Uish): Promise<void>;
}
