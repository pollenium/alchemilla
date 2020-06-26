import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8, Uintable } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ContractWriter, ContractWriterChildStruct, StateChange } from 'pollenium-clover'
import { engineOutput } from '../../../'
import { SignedOrder } from '../../SignedOrder'
import { SignatureStruct, Signature } from 'pollenium-ilex'

export interface Exchange {
  signedBuyyOrderIndex: Uintable,
  signedSellOrderIndex: Uintable,
  quotTokenTrans: Uintable,
  variTokenTrans: Uintable,
  quotTokenArbit: Uintable
}

export interface ExecutionRequest {
  signedOrders: Array<SignedOrder>,
  exchanges: Array<Exchange>
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

  async setOwner(ownerUish: Uish): Promise<StateChange> {
    const owner = new Address(ownerUish)
    return this.genStateChange(
      this.ethersContract.transferOwnership(owner.uu.toPhex())
    )
  }

  async setExecutorOracle(executorOracleUish: Uish): Promise<StateChange> {
    const executorOracle = new Address(executorOracleUish)
    return this.genStateChange(
      this.ethersContract.setExecutorOracle(executorOracle.uu.toPhex())
    )
  }

  async depositViaNative(struct: {
    to: Uish,
    token: Uish,
    amount: Uintable
  }): Promise<StateChange> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    return this.genStateChange(
      this.ethersContract.depositViaNative(
        to.uu.toPhex(),
        token.uu.toPhex(),
        amount.uu.toPhex()
      )
    )
  }

  async depositViaSignature(struct: ActionViaSignatureStruct): Promise<StateChange> {
    return this.actionViaSignature(this.ethersContract.depositViaSignature, struct)
  }

  async withdrawViaNative(struct: {
    to: Uish,
    token: Uish,
    amount: Uintable
  }): Promise<StateChange> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    return this.genStateChange(
      this.ethersContract.withdrawViaNative(
        to.uu.toPhex(),
        token.uu.toPhex(),
        amount.uu.toPhex()
      )
    )
  }

  async withdrawViaSignature(struct: ActionViaSignatureStruct): Promise<StateChange> {
    return this.actionViaSignature(this.ethersContract.withdrawViaSignature, struct)
  }

  async withdrawAndNotifyViaNative(struct: {
    to: Uish,
    token: Uish,
    amount: Uintable
  }): Promise<StateChange> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    return this.genStateChange(
      this.ethersContract.withdrawAndNotifyViaNative(
        to.uu.toPhex(),
        token.uu.toPhex(),
        amount.uu.toPhex()
      )
    )
  }

  async withdrawAndNotifyViaSignature(struct: ActionViaSignatureStruct): Promise<StateChange> {
    return this.actionViaSignature(this.ethersContract.withdrawAndNotifyViaSignature, struct)
  }

  async execute(executionRequest: ExecutionRequest): Promise<StateChange> {

    const args = [
      executionRequest.signedOrders.map((signedOrder) => {
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

    return this.genStateChange(
      this.ethersContract.execute(...args)
    )

  }

  private async actionViaSignature(ethersContractFunction: (...any) => any, struct: ActionViaSignatureStruct): Promise<StateChange> {
    const to = new Address(struct.to)
    const token = new Address(struct.token)
    const amount = new Uint256(struct.amount)
    const expiration = new Uint256(struct.expiration)
    const nonce = new Bytes32(struct.nonce)
    const signature = new Signature(struct.signature)

    return this.genStateChange(
      ethersContractFunction(
        to.uu.toPhex(),
        token.uu.toPhex(),
        amount.uu.toPhex(),
        expiration.uu.toPhex(),
        nonce.uu.toPhex(),
        signature.v.uu.toPhex(),
        signature.r.uu.toPhex(),
        signature.s.uu.toPhex()
      )
    )

  }

}
