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
    await web3Contract.transferOwnership(owner.getHex(), {
      from: from.getHex()
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
    await web3Contract.setOligarchyBidToken(bidToken.getHex(), {
      from: from.getHex()
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
    await web3Contract.setOligarchyProfiteer(oligarchyProfiteer.getHex(), {
      from: from.getHex()
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
      from: from.getHex()
    })
  }

}
