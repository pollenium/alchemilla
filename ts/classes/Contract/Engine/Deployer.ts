import { ethers } from 'ethers'
import { Address } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractDeployer, ContractDeployerChildStruct } from 'pollenium-clover'
import { engineOutput } from '../../../'

export class EngineDeployer extends ContractDeployer<void> {

  constructor(struct: ContractDeployerChildStruct<void>) {
    super({
      ...engineOutput,
      ...struct
    })
  }
}
