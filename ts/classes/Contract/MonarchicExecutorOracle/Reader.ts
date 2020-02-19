import { ethers } from 'ethers'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover'
import { monarchicExecutorOracleOutput } from '../../../'

export class MonarchicExecutorOracleReader extends ContractReader {

  constructor(struct: ContractReaderChildStruct) {
    super({
      ...monarchicExecutorOracleOutput,
      ...struct
    })
  }

  async fetchOwner(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.owner()
    ))
  }

  async fetchHot(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.hot()
    ))
  }

  async fetchCold(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.cold()
    ))
  }

}
