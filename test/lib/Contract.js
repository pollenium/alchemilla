const fetchArtifact = require('./fetchArtifact')

module.exports = class Contract {
  constructor(name, address) {
    this.name = name
    this.address = address
  }
  async fetchWeb3Contract() {
    if (this._web3Contract) {
      return this._web3Contract
    }
    const artifact = await fetchArtifact(this.name)
    this._web3Contract = await artifact.at(`0x${this.address.getHex()}`)
    return this._web3Contract
  }

}
