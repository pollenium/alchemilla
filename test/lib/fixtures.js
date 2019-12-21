const ganache = require('ganache-cli')
const ilex = require('pollenium-ilex')
const buttercup = require('pollenium-buttercup')

const traderNames = ['alice', 'bob']
const accountNames = ['deployer', 'admin', 'attacker', 'monarchHot', 'monarchCold', ...traderNames]
const tokenNames = ['dai', 'usdc', 'weth', 'mkr']

const Keypair = ilex.Keypair
const Address = buttercup.Address
const Uint256 = buttercup.Uint256

const nullAddress = Address.genNull()
const uint256Zero = Uint256.fromNumber(0)

const startBalance = Uint256.fromNumber(1000)
const totalSupply = startBalance.mul(Uint256.fromNumber(tokenNames.length))

const keypairs = {}
const addresses = {}

accountNames.forEach((accountName) => {
  keypairs[accountName] = Keypair.generate()
  addresses[accountName] = keypairs[accountName].getAddress()
})

module.exports = {
  traderNames,

  accountNames,
  tokenNames,
  keypairs,
  addresses,
  nullAddress,
  uint256Zero,
  startBalance,
  totalSupply
}
