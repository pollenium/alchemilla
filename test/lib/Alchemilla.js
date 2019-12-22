const buttercup = require('pollenium-buttercup')
const Contract = require('./Contract')

const Address = buttercup.Address
const Uint256 = buttercup.Uint256

module.exports = class Alchemilla extends Contract {

  constructor(address) {
    super('Alchemilla', address)
  }

  async fetchOwner() {
    const web3Contract = await this.fetchWeb3Contract()
    return Address.fromHexish(
      await web3Contract.owner()
    )
  }

  async broadcastSetOwner(from, owner) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.transferOwnership(owner.getPhex(), {
      from: from.getPhex()
    })
  }

  async broadcastDeposit(from, to, token, amount) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.deposit(to.getPhex(), token.getPhex(), amount.getPhex(), {
      from: from.getPhex()
    })
  }


  async fetchBalance(owner, token) {
    const web3Contract = await this.fetchWeb3Contract()
    return Uint256.fromBn(await web3Contract.balances(
      owner.getPhex(),
      token.getPhex()
    ))
  }

  async broadcastExecute(from, executionRequest) {
    const web3Contract = await this.fetchWeb3Contract()

    const exchangeUint8s   = []
    const exchangeUint256s = []

    executionRequest.exchanges.forEach((exchange) => {
      exchangeUint8s.push(
        exchange.signedBuyyOrderIndex.getBn(),
        exchange.signedSellOrderIndex.getBn()
      )
      exchangeUint256s.push(
        exchange.quotTokenTrans.getBn(),
        exchange.variTokenTrans.getBn(),
        exchange.quotTokenArbit.getBn()
      )
    })

    const args = [
      executionRequest.prevBlockHash.getPhex(),
      executionRequest.quotToken.getPhex(),
      executionRequest.variToken.getPhex(),
      executionRequest.signedOrders.map((signedOrder) => {
        return {
          orderType: signedOrder.type,
          originator: signedOrder.originator.getPhex(),
          priceNumer: signedOrder.priceNumer.getPhex(),
          priceDenom: signedOrder.priceDenom.getPhex(),
          tokenLimit: signedOrder.tokenLimit.getPhex(),
          tokenFilled: 0,
          signatureV: signedOrder.signature.v.getNumber(),
          signatureR: signedOrder.signature.r.getPhex(),
          signatureS: signedOrder.signature.s.getPhex()
        }
      }),
      executionRequest.exchanges.map((exchange) => {
        return {
          buyyOrderIndex: exchange.signedBuyyOrderIndex.getPhex(),
          sellOrderIndex: exchange.signedSellOrderIndex.getPhex(),
          quotTokenTrans: exchange.quotTokenTrans.getPhex(),
          variTokenTrans: exchange.variTokenTrans.getPhex(),
          quotTokenArbit: exchange.quotTokenArbit.getPhex()
        }
      })
    ]

    const estimatedGas = await web3Contract.execute.estimateGas(...args, { from: from.getPhex() })

    console.log(estimatedGas)

    await web3Contract.execute(...args, { from: from.getPhex(), gas: Math.floor(estimatedGas * 1.1) })
  }

}
