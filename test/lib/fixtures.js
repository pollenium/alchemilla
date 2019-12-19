const ganache = require('ganache-cli')
const ilex = require('pollenium-ilex')
const buttercup = require('pollenium-buttercup')

const oligarchNames = ['alice', 'bob']
const traderNames = ['charlie', 'dave']
const oligarchAndTraderNames = oligarchNames.concat(traderNames)
const accountNames = ['deployer', 'admin', 'profiteer', 'attacker', ...oligarchNames, ...traderNames]
const tokenNames = ['biddy', 'dai', 'usdc', 'weth', 'mkr']

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
  oligarchNames,
  traderNames,
  oligarchAndTraderNames,
  accountNames,
  tokenNames,
  keypairs,
  addresses,
  nullAddress,
  uint256Zero,
  startBalance,
  totalSupply
}
