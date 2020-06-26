import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct, StateChange } from 'pollenium-clover'
import { monarchicExecutorOracleOutput } from '../../../'

export class MonarchicExecutorOracleWriter extends ContractWriter {

  constructor(struct: ContractWriterChildStruct) {
    super({
      ...monarchicExecutorOracleOutput,
      ...struct
    })
  }

  async setHot(hotUish: Uish): Promise<StateChange> {
    const hot = new Address(hotUish)
    return this.genStateChange(
      this.ethersContract.setHot(hot.uu.toPhex())
    )
  }

  async setCold(coldUish: Uish): Promise<StateChange> {
    const cold = new Address(coldUish)
    return this.genStateChange(
      this.ethersContract.setCold(cold.uu.toPhex())
    )
  }


}
