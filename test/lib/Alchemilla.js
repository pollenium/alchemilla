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

  async fetchOligarchyBidToken() {
    const web3Contract = await this.fetchWeb3Contract()
    return Address.fromHexish(
      await web3Contract.oligarchyBidToken()
    )
  }

  async broadcastSetOligarchBidToken(from, bidToken) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.setOligarchyBidToken(bidToken.getPhex(), {
      from: from.getPhex()
    })
  }

  async fetchOligarchyProfiteer() {
    const web3Contract = await this.fetchWeb3Contract()
    return Address.fromHexish(
      await web3Contract.oligarchyProfiteer()
    )
  }

  async broadcastSetOligarchyProfiteer(from, oligarchyProfiteer) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.setOligarchyProfiteer(oligarchyProfiteer.getPhex(), {
      from: from.getPhex()
    })
  }

  async fetchOligarchAddress(index) {
    const web3Contract = await this.fetchWeb3Contract()
    return Address.fromHexish(
     await web3Contract.oligarchs(index.getBn())
    )
  }

  async fetchOligarchBidAmount(index) {
    const web3Contract = await this.fetchWeb3Contract()
    return Uint256.fromBn(
      await web3Contract.oligarchBidAmounts(index.getBn())
    )
  }

  async fetchOligarchIsLocked(index) {
    const web3Contract = await this.fetchWeb3Contract()
    return await web3Contract.getOligarchIsLocked(index.getBn())
  }

  async fetchOligarchStruct(index) {
    const web3Contract = await this.fetchWeb3Contract()
    return {
      index: index,
      address: await this.fetchOligarchAddress(index),
      bidAmount: await this.fetchOligarchBidAmount(index),
      isLocked: await this.fetchOligarchIsLocked(index)
    }
  }

  async broadcastOverthrowOligarch(from, index, bid) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.overthrowOligarch(index.getNumber(), bid.getNumber(), {
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

    const orderUint8s      = []
    const orderUint256s    = []
    const orderBytes32s    = []

    const exchangeUint8s   = []
    const exchangeUint256s = []

    executionRequest.signedOrders.forEach((signedOrder) => {
      orderUint8s.push(
        signedOrder.type,
        signedOrder.signature.v.getBn()
      )
      orderUint256s.push(
        signedOrder.priceNumer.getBn(),
        signedOrder.priceDenom.getBn(),
        signedOrder.tokenLimit.getBn()
      )
      orderBytes32s.push(
        signedOrder.signature.r.getPhex(),
        signedOrder.signature.s.getPhex(),
      )
    })

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
      executionRequest.signedOrders.length - 1,
      executionRequest.exchanges.length - 1,
      orderUint8s,
      orderUint256s,
      orderBytes32s,
      exchangeUint8s,
      exchangeUint256s,
      executionRequest.quotToken.getPhex(),
      executionRequest.variToken.getPhex()
    ]

    const estimatedGas = await web3Contract.execute.estimateGas(...args, { from: from.getPhex() })

    console.log(estimatedGas)

    await web3Contract.execute(...args, { from: from.getPhex(), gas: Math.floor(estimatedGas * 1.1) })
  }

}
