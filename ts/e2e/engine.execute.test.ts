import { gaillardia } from './lib/gaillardia'
import {
  fetchTokenReader,
  fetchEngineReader,
  fetchEngineWriter,
  getAccountAddress,
  fetchOrDeployTokenAddress,
  getKeypair
} from './lib/utils'
import { Bytes32, Uint256, Uint8 } from 'pollenium-buttercup'
import frangipani from 'pollenium-frangipani'
import { traderNames, TokenNames, AccountNames, startBalance } from './lib/fixtures'
import { $enum } from 'ts-enum-util'
import { OrderDirection, Order, SignedOrder } from '../'
import { EngineReader } from '../'

require('./deposit.test')

let snapshotId
let engineReader: EngineReader
let orderSalt: Bytes32

function arrayOf(length, callback) {
  const array = []
  for (let i = 0; i < length; i ++) {
    array.push(callback(i))
  }
  return array
}


test('fetch engineReader/orderSalt', async () => {
  engineReader = await fetchEngineReader()
  orderSalt = await engineReader.fetchOrderSalt()
})

test('snapshot', async () => {
  snapshotId = await gaillardia.takeSnapshot()
})

frangipani.forEach(async (fixture, index) => {
  describe(`fixture ${index}`, () => {

    const quotTokenTrans = Uint256.fromNumber(fixture.solution.quotTokenTrans)
    const variTokenTrans = Uint256.fromNumber(fixture.solution.variTokenTrans)
    const quotTokenArbit = Uint256.fromNumber(fixture.solution.quotTokenArbit)
    const quotTokenTotal = quotTokenTrans.opAdd(quotTokenArbit)

    let signedBuyyOrder: SignedOrder
    let signedSellOrder

    traderNames.forEach((traderName) => {
      $enum(TokenNames).forEach((tokenName) => {
        test(`${traderName}'s ${tokenName} balance should be ${startBalance}`, async () => {
          await gaillardia.restoreSnapshot(snapshotId)
          snapshotId = await gaillardia.takeSnapshot()
          const balance = await engineReader.fetchBalance({
            holder: getAccountAddress(traderName),
            token: await fetchOrDeployTokenAddress(tokenName)
          })
          expect(balance.toNumber()).toBe(startBalance)
        })
      })
      test('execute', async () => {
        await gaillardia.restoreSnapshot(snapshotId)
        snapshotId = await gaillardia.takeSnapshot()
        const block = await gaillardia.bellflower.fetchLatestBlock()

        const buyyOrder = new Order({
          salt: orderSalt,
          expiration: block.number.opAdd(10),
          direction: OrderDirection.BUYY,
          quotToken: await fetchOrDeployTokenAddress(TokenNames.DAI),
          variToken: await fetchOrDeployTokenAddress(TokenNames.WETH),
          tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
          priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
          priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom)
        })

        const sellOrder = new Order({
          salt: orderSalt,
          expiration: block.number.opAdd(10),
          direction: OrderDirection.SELL,
          quotToken: await fetchOrDeployTokenAddress(TokenNames.DAI),
          variToken: await fetchOrDeployTokenAddress(TokenNames.WETH),
          tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
          priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
          priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom)
        })

        signedBuyyOrder = new SignedOrder({
          order: buyyOrder,
          signature: getKeypair(AccountNames.ALICE).getSignature(buyyOrder.getSugmaHash())
        })

        signedSellOrder = new SignedOrder({
          order: sellOrder,
          signature: getKeypair(AccountNames.BOB).getSignature(sellOrder.getSugmaHash())
        })

        const engineWriter = await fetchEngineWriter(AccountNames.MONARCH_HOT)
        await engineWriter.execute({
          signedOrders: [signedBuyyOrder, signedSellOrder],
          exchanges: [
            {
              signedBuyyOrderIndex: 0,
              signedSellOrderIndex: 1,
              quotTokenTrans,
              variTokenTrans,
              quotTokenArbit
            }
          ]
        })

      })

      test('should have transferred DAI from ALICE to BOB and MONARCH_COLD', async () => {
        const balanceAlice = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.ALICE),
          token: await fetchOrDeployTokenAddress(TokenNames.DAI)
        })
        const balanceBob = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.BOB),
          token: await fetchOrDeployTokenAddress(TokenNames.DAI)
        })
        const balanceMonarchCold = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.MONARCH_COLD),
          token: await fetchOrDeployTokenAddress(TokenNames.DAI)
        })

        expect(balanceAlice.toNumber()).toBe(startBalance - quotTokenTotal.toNumber())
        expect(balanceBob.toNumber()).toBe(startBalance + quotTokenTrans.toNumber())
        expect(balanceMonarchCold.toNumber()).toBe(quotTokenArbit.toNumber())
      })

      test('should have transferred WETH from BOB to ALICE', async () => {
        const balanceAlice = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.ALICE),
          token: await fetchOrDeployTokenAddress(TokenNames.WETH)
        })
        const balanceBob = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.BOB),
          token: await fetchOrDeployTokenAddress(TokenNames.WETH)
        })
        expect(balanceAlice.toNumber()).toBe(startBalance + variTokenTrans.toNumber())
        expect(balanceBob.toNumber()).toBe(startBalance - variTokenTrans.toNumber())
      })

      test('fills', async () => {
        const buyyOrderFill = await engineReader.fetchFill(signedBuyyOrder.getSignatureHash())
        const sellOrderFill = await engineReader.fetchFill(signedSellOrder.getSignatureHash())
        expect(buyyOrderFill.toNumber()).toBe(quotTokenTotal.toNumber())
        expect(sellOrderFill.toNumber()).toBe(variTokenTrans.toNumber())
      })
    })
  })
})
