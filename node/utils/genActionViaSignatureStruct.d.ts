import { Uish } from 'pollenium-uvaursi';
import { ActionViaSignatureStruct } from '../';
export interface GenActionViaSignatureStructStruct extends Omit<ActionViaSignatureStruct, 'signature'> {
    fromPrivateKey: Uish;
    actionSalt: Uish;
}
export declare function genActionViaSignatureStruct(struct: GenActionViaSignatureStructStruct): ActionViaSignatureStruct;
