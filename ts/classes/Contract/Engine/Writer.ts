import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8, Uintable } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover'
import { engineOutput } from '../../../'
import { SignedOrder } from '../../SignedOrder'

export interface ExecutionRequest {
  blockNumber: Uintable,
  signedBuyyOrders: Array<SignedOrder>,
  signedSellOrders: Array<SignedOrder>,
  exchanges: Array<{
    signedBuyyOrderIndex: Uintable,
    signedSellOrderIndex: Uintable,
    quotTokenTrans: Uintable,
    variTokenTrans: Uintable,
    quotTokenArbit: Uintable
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
    toAndFrom: Uish
    token: Uish
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

    const blockNumber = new Uint256(executionRequest.blockNumber)

    const args = [
      blockNumber.uu.toPhex(),
      executionRequest.signedBuyyOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.signedSellOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.exchanges.map((exchange) => {
        const buyyOrderIndex = new Uint8(exchange.signedBuyyOrderIndex)
        const sellOrderIndex = new Uint8(exchange.signedSellOrderIndex)
        const quotTokenTrans = new Uint256(exchange.quotTokenTrans)
        const variTokenTrans = new Uint256(exchange.variTokenTrans)
        const quotTokenArbit = new Uint256(exchange.quotTokenArbit)
        return {
          buyyOrderIndex: buyyOrderIndex.uu.toPhex(),
          sellOrderIndex: sellOrderIndex.uu.toPhex(),
          quotTokenTrans: quotTokenTrans.uu.toPhex(),
          variTokenTrans: variTokenTrans.uu.toPhex(),
          quotTokenArbit: quotTokenArbit.uu.toPhex()
        }
      })
    ]

    await this.ethersContract.execute(...args)

  }

}
