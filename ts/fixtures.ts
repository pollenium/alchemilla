import { Address, Uint256, Bytes32 } from 'pollenium-buttercup'
import { ORDER_TYPE } from './enums'
import crypto from 'crypto'
import { Keypair } from 'pollenium-ilex'

export const alice = new Address(crypto.randomBytes(20))
export const bob = new Address(crypto.randomBytes(20))
export const dai = new Address(crypto.randomBytes(20))
export const usdc = new Address(crypto.randomBytes(20))
export const weth = new Address(crypto.randomBytes(20))
export const mkr = new Address(crypto.randomBytes(20))
export const nullAddress = Address.genNull()
export const uint256Zero = Uint256.fromNumber(0)
export const nullBytes32 = new Bytes32(
  (new Uint8Array(32)).fill(0)
)

export const keypair = Keypair.generate()

export const validOrderStruct = {
  prevBlockHash: nullBytes32,
  type: ORDER_TYPE.BUYY,
  quotToken: usdc,
  variToken: weth,
  originator: keypair.getAddress(),
  tokenLimit: Uint256.fromNumber(1),
  priceNumer: Uint256.fromNumber(1),
  priceDenom: Uint256.fromNumber(1)
}
