import { Order } from './Order'
import { SignedOrder } from './SignedOrder'
import { validOrderStruct, keypair } from '../fixtures'
import { Uint8, Bytes32 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'

const order = new Order(validOrderStruct)

test('Order -> SignedOrder', () => {
  SignedOrder.gen({ order, privateKey: keypair.privateKey})
})

test('getLigma/fromLigma', () => {
  const signedOrder0 = SignedOrder.gen({ order, privateKey: keypair.privateKey })
  const ligma = signedOrder0.getLigma()
  const signedOrder1 = SignedOrder.fromLigma(ligma)

  expect(
    signedOrder0.salt.uu.getIsEqual(
      signedOrder1.salt.uu
    )
  ).toBe(true)
  expect(
    signedOrder0.expiration.uu.getIsEqual(
      signedOrder1.expiration.uu
    )
  ).toBe(true)
  expect(signedOrder0.direction).toBe(signedOrder1.direction)
  expect(
    signedOrder0.quotToken.uu.getIsEqual(
      signedOrder1.quotToken.uu
    )
  ).toBe(true)
  expect(
    signedOrder0.variToken.uu.getIsEqual(
      signedOrder1.variToken.uu
    )
  ).toBe(true)
  expect(
    signedOrder0.priceNumer.uu.getIsEqual(
      signedOrder1.priceNumer.uu
    )
  ).toBe(true)
  expect(
    signedOrder0.priceDenom.uu.getIsEqual(
      signedOrder1.priceDenom.uu
    )
  ).toBe(true)
  expect(
    signedOrder0.tokenLimit.uu.getIsEqual(
      signedOrder1.tokenLimit.uu
    )
  ).toBe(true)
  expect(
    signedOrder0.signature.v.uu.getIsEqual(
      signedOrder1.signature.v
    )
  ).toBe(true)
  expect(
    signedOrder0.signature.r.uu.getIsEqual(
      signedOrder1.signature.r
    )
  ).toBe(true)
  expect(
    signedOrder0.signature.s.uu.getIsEqual(
      signedOrder1.signature.s
    )
  ).toBe(true)
  expect(
    signedOrder0.getTrader().uu.getIsEqual(
      signedOrder1.getTrader().uu
    )
  ).toBe(true)
  expect(
    signedOrder0.getTrader().uu.getIsEqual(
      signedOrder1.getTrader().uu
    )
  ).toBe(true)


})
