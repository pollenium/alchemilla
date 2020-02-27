import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover'
import { monarchicExecutorOracleOutput } from '../../../'

export class MonarchicExecutorOracleWriter extends ContractWriter {

  constructor(struct: ContractWriterChildStruct) {
    super({
      ...monarchicExecutorOracleOutput,
      ...struct
    })
  }

  async setHot(hotUish: Uish): Promise<void> {
    const hot = new Address(hotUish)
    await this.ethersContract.setHot(hot.uu.toPhex())
  }

  async setCold(coldUish: Uish): Promise<void> {
    const cold = new Address(coldUish)
    await this.ethersContract.setCold(cold.uu.toPhex())
  }


}
