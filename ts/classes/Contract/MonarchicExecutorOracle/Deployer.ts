import { ethers } from 'ethers'
import { Address } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractDeployer, ContractDeployerChildStruct } from 'pollenium-clover'
import { monarchicExecutorOracleOutput } from '../../../'

export class MonarchicExecutorOracleDeployer extends ContractDeployer<void> {

  constructor(struct: ContractDeployerChildStruct<void>) {
    super({
      ...monarchicExecutorOracleOutput,
      ...struct
    })
  }
}
