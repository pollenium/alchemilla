import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover'
import { monarchicExecutorOracleOutput } from '../../../'

export class MonarchicExecutorOracleWriter extends ContractWriter {

  constructor(struct: ContractWriterChildStruct) {
    super({
      ...monarchicExecutorOracleOutput,
      ...struct
    })
  }

  async setHot(hot: Address): Promise<void> {
    await this.ethersContract.setHot(hot.uu.toPhex())
  }

  async setCold(cold: Address): Promise<void> {
    await this.ethersContract.setCold(cold.uu.toPhex())
  }


}
