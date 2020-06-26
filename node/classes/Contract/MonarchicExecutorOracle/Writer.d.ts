import { Uish } from 'pollenium-uvaursi';
import { ContractWriter, ContractWriterChildStruct, StateChange } from 'pollenium-clover';
export declare class MonarchicExecutorOracleWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    setHot(hotUish: Uish): Promise<StateChange>;
    setCold(coldUish: Uish): Promise<StateChange>;
}
