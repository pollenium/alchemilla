import { Keypair } from 'pollenium-ilex'
import { Address, Uint256 } from 'pollenium-buttercup'
import { $enum } from 'ts-enum-util'


export enum AccountNames {
  ALICE = 'alice',
  BOB = 'bob',
  DEPLOYER = 'deployer',
  ADMIN = 'admin',
  ATTACKER = 'attacker',
  MONARCH_HOT = 'monarchHot',
  MONARCH_COLD = 'monarchCold',
  COINBASE = 'coinbase',
  SWEEPER = 'sweeper'
}

export const traderNames: Array<AccountNames> = [
  AccountNames.ALICE,
  AccountNames.BOB
]

export enum TokenNames {
  DAI = 'dai',
  USDC = 'usdc',
  WETH = 'weth',
  MKR = 'mkr'
}

// export const traderNames = ['alice', 'bob']
// // const accountNames = ['deployer', 'admin', 'attacker', 'monarchHot', 'monarchCold', ...traderNames]
// // const tokenNames = ['dai', 'usdc', 'weth', 'mkr']
//
// const nullAddress = Address.genNull()
// const uint256Zero = Uint256.fromNumber(0)
//
export const startBalance = Uint256.fromNumber(1000)
export const totalSupply = startBalance.opMul(Uint256.fromNumber(traderNames.length))
//
// const addresses = {}

// accountNames.forEach((accountName) => {
//   keypairs[accountName] = Keypair.generate()
//   addresses[accountName] = keypairs[accountName].getAddress()
// })

// export {
//   keypairs,
//   addresses,
//   nullAddress,
//   uint256Zero,
//   startBalance,
//   totalSupply
// }
