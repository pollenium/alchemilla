import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8, Uintable } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover'
import { engineOutput } from '../../../'
import { SignedOrder } from '../../SignedOrder'

export interface ExecutionRequest {
  prevBlockHash: Bytes32,
  signedBuyyOrders: Array<SignedOrder>,
  signedSellOrders: Array<SignedOrder>,
  exchanges: Array<{
    signedBuyyOrderIndex: Uint8,
    signedSellOrderIndex: Uint8,
    quotTokenTrans: Uint256,
    variTokenTrans: Uint256,
    quotTokenArbit: Uint256
  }>
}

export class EngineWriter extends ContractWriter {

  constructor(struct: ContractWriterChildStruct) {
    super({
      ...engineOutput,
      ...struct
    })
  }

  async setOwner(owner: Address): Promise<void> {
    await this.ethersContract.transferOwnership(owner.uu.toPhex())
  }

  async setExecutorOracle(executorOracle: Address): Promise<void> {
    await this.ethersContract.setExecutorOracle(executorOracle.uu.toPhex())
  }

  async depositViaNative(struct: {
    to: Uish,
    token: Uish,
    amount: Uintable
  }): Promise<void> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    await this.ethersContract.depositViaNative(
      to.uu.toPhex(),
      token.uu.toPhex(),
      amount.uu.toPhex()
    )
  }

  async depositViaSweep(struct: {
    toAndFrom: Address
    token: Address
  }): Promise<void> {
    const toAndFrom = new Address(struct.toAndFrom)
    const token = new Address(struct.token)
    await this.ethersContract.depositViaSweep(
      toAndFrom.uu.toPhex(),
      token.uu.toPhex()
    )
  }

  async withdrawViaNative(struct: {
    to: Uish,
    token: Uish,
    amount: Uintable
  }): Promise<void> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    await this.ethersContract.withdrawViaNative(
      to.uu.toPhex(),
      token.uu.toPhex(),
      amount.uu.toPhex()
    )
  }

  async withdrawAndNotifyViaNative(struct: {
    to: Uish,
    token: Uish,
    amount: Uintable
  }): Promise<void> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    await this.ethersContract.withdrawAndNotifyViaNative(
      to.uu.toPhex(),
      token.uu.toPhex(),
      amount.uu.toPhex()
    )
  }

  async execute(executionRequest: ExecutionRequest): Promise<void> {

    const args = [
      executionRequest.prevBlockHash.uu.toPhex(),
      executionRequest.signedBuyyOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.signedSellOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.exchanges.map((exchange) => {
        return {
          buyyOrderIndex: exchange.signedBuyyOrderIndex.uu.toPhex(),
          sellOrderIndex: exchange.signedSellOrderIndex.uu.toPhex(),
          quotTokenTrans: exchange.quotTokenTrans.uu.toPhex(),
          variTokenTrans: exchange.variTokenTrans.uu.toPhex(),
          quotTokenArbit: exchange.quotTokenArbit.uu.toPhex()
        }
      })
    ]

    await this.ethersContract.execute(...args)

  }

}
