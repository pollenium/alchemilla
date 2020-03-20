import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8, Uintable } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover'
import { engineOutput } from '../../../'
import { SignedOrder } from '../../SignedOrder'
import { SignatureStruct, Signature } from 'pollenium-ilex'

export interface ExecutionRequest {
  target: Uintable,
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

export interface ActionViaSignatureStruct {
  to: Uish
  token: Uish,
  amount: Uintable,
  expiration: Uintable,
  nonce: Uish,
  signature: SignatureStruct
}

export class EngineWriter extends ContractWriter {

  constructor(struct: ContractWriterChildStruct) {
    super({
      ...engineOutput,
      ...struct
    })
  }

  async setOwner(ownerUish: Uish): Promise<void> {
    const owner = new Address(ownerUish)
    await this.ethersContract.transferOwnership(owner.uu.toPhex())
  }

  async setExecutorOracle(executorOracleUish: Uish): Promise<void> {
    const executorOracle = new Address(executorOracleUish)
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

  async depositViaSignature(struct: ActionViaSignatureStruct): Promise<void> {
    await this.actionViaSignature(this.ethersContract.depositViaSignature, struct)
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

  async withdrawViaSignature(struct: ActionViaSignatureStruct): Promise<void> {
    await this.actionViaSignature(this.ethersContract.withdrawViaSignature, struct)
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

  async withdrawAndNotifyViaSignature(struct: ActionViaSignatureStruct): Promise<void> {
    await this.actionViaSignature(this.ethersContract.withdrawAndNotifyViaSignature, struct)
  }

  async execute(executionRequest: ExecutionRequest): Promise<void> {

    const blockNumber = new Uint256(executionRequest.target)

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

  private async actionViaSignature(ethersContractFunction: (...any) => any, struct: ActionViaSignatureStruct) {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    const expiration = new Uint256(struct.expiration)
    const nonce = new Bytes32(struct.nonce)
    const signature = new Signature(struct.signature)

    await ethersContractFunction(
      to.uu.toPhex(),
      token.uu.toPhex(),
      amount.uu.toPhex(),
      expiration.uu.toPhex(),
      nonce.uu.toPhex(),
      signature.v.uu.toPhex(),
      signature.r.uu.toPhex(),
      signature.s.uu.toPhex()
    )
  }

}
