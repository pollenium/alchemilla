import { ethers } from 'ethers'
import { Address, Uint256, Bytes32 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover'
import { engineOutput, StateFetcher } from '../../../'

export class EngineReader extends ContractReader implements StateFetcher {

  constructor(struct: ContractReaderChildStruct) {
    super({
      ...engineOutput,
      ...struct
    })
  }

  async fetchOrderSalt(): Promise<Bytes32> {
    return new Bytes32(Uu.fromHexish(
      await this.ethersContract.orderSalt()
    ))
  }

  async fetchDepositSalt(): Promise<Bytes32> {
    return new Bytes32(Uu.fromHexish(
      await this.ethersContract.depositSalt()
    ))
  }

  async fetchWithdrawSalt(): Promise<Bytes32> {
    return new Bytes32(Uu.fromHexish(
      await this.ethersContract.withdrawSalt()
    ))
  }

  async fetchWithdrawAndNotifySalt(): Promise<Bytes32> {
    return new Bytes32(Uu.fromHexish(
      await this.ethersContract.withdrawAndNotifySalt()
    ))
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

  async fetchFill(signatureHash: Uish): Promise<Uint256> {
    const fillBignumber = await this.ethersContract.fills(Uu.wrap(signatureHash).toPhex())
    return new Uint256(Uu.fromHexish(
      await ethers.utils.hexlify(fillBignumber)
    ))
  }

}
