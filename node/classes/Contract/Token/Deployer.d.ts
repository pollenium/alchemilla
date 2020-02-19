import { Uintable } from 'pollenium-buttercup';
import { ContractDeployer, ContractDeployerChildStruct } from 'pollenium-clover';
export interface TokenDeployStruct {
    totalSupply: Uintable;
}
export declare class TokenDeployer extends ContractDeployer<TokenDeployStruct> {
    constructor(struct: ContractDeployerChildStruct<TokenDeployStruct>);
}
