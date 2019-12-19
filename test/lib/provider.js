const fixtures = require('./fixtures')
const ganache = require('ganache-cli')

module.exports = ganache.provider({
  gasLimit: 0xfffffffffff,
  gasPrice: 0x01,
  accounts: fixtures.accountNames.map((name) => {
    const keypair = fixtures.keypairs[name]
    return {
      balance: Number.MAX_SAFE_INTEGER,
      secretKey: keypair.privateKey.getBuffer()
    }
  })
})
