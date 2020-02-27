import { ethers } from 'ethers'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover'
import { engineOutput } from '../../../'

export class EngineReader extends ContractReader {

  constructor(struct: ContractReaderChildStruct) {
    super({
      ...engineOutput,
      ...struct
    })
  }

  async fetchOwner(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.owner()
    ))
  }

  async fetchExecutorOracle(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.executorOracle()
    ))
  }

  async fetchBalance(struct: {
    token: Uish,
    holder: Uish
  }): Promise<Uint256> {
    const token = new Address(struct.token)
    const holder = new Address(struct.holder)
    const balanceBignumber = await this.ethersContract.balances(
      holder.uu.toPhex(),
      token.uu.toPhex()
    )
    return new Uint256(Uu.fromHexish(
      await ethers.utils.hexlify(balanceBignumber)
    ))

  }

}
