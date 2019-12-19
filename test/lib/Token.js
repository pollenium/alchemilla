const buttercup = require('pollenium-buttercup')
const Contract = require('./Contract')

const Address = buttercup.Address
const Uint256 = buttercup.Uint256

module.exports = class Token extends Contract {

  constructor(address) {
    super('Token', address)
  }

  async broadcastTransfer(from, to, amount) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.transfer(to.getHex(), amount.getBn(), {
      from: from.getHex()
    })
  }

  async fetchBalance(address) {
    const web3Contract = await this.fetchWeb3Contract()
    return Uint256.fromBn(
      await web3Contract.balanceOf(address.getHex())
    )
  }

  async fetchTotalSupply() {
    const web3Contract = await this.fetchWeb3Contract()
    return Uint256.fromBn(
      await web3Contract.totalSupply()
    )
  }

  async broadcastApprove(from, delegate, amount) {
    const web3Contract = await this.fetchWeb3Contract()
    await web3Contract.approve(
      delegate.getHex(),
      amount.getBn(),
      {
        from: from.getHex()
      }
    )
  }

}
