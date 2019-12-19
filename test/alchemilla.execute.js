const alchemillaPromise = require('./alchemilla.oligarchy')
const tokensPromise = require('./tokens')
const orchid = require('pollenium-orchid')
const takeSnapshot = require('./lib/takeSnapshot')
const restoreSnapshot = require('./lib/restoreSnapshot')
const frangipani = require('pollenium-frangipani')
const fixtures = require('./lib/fixtures')
const buttercup = require('pollenium-buttercup')

const Uint256 = buttercup.Uint256

const ORDER_TYPE = orchid.enums.ORDER_TYPE
const Order = orchid.Order
const SignedOrder = orchid.SignedOrder
const SignedOrderPair = orchid.SignedOrderPair

let alchemilla
let tokens

describe('alchemilla.execute', () => {
  before(async () => {
    alchemilla = await alchemillaPromise
    tokens = await tokensPromise
  })
  describe('executions', () => {
    frangipani.forEach((fixture, index) => {
      it(`fixture ${index}`, () => {
        const chainState = {
          buyyOrderTokenFilled: Uint256.fromNumber(fixture.chainState.buyyOrderTokenFilled),
          sellOrderTokenFilled: Uint256.fromNumber(fixture.chainState.sellOrderTokenFilled),
          buyyOrderTokenBalance: Uint256.fromNumber(fixture.chainState.buyyOrderTokenBalance),
          sellOrderTokenBalance: Uint256.fromNumber(fixture.chainState.sellOrderTokenBalance)
        }

        const buyyOrder = new Order({
          type: ORDER_TYPE.BUYY,
          quotToken: tokens.dai.address,
          variToken: tokens.weth.address,
          originator: fixtures.addresses.charlie,
          tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
          priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
          priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom),
          expiration: Uint256.fromNumber(1),
          salt: Uint256.fromNumber(1)
        })

        const sellOrder = new Order({
          type: ORDER_TYPE.SELL,
          quotToken: tokens.dai.address,
          variToken: tokens.weth.address,
          originator: fixtures.addresses.dave,
          tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
          priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
          priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom),
          expiration: Uint256.fromNumber(1),
          salt: Uint256.fromNumber(1)
        })

        const signedBuyyOrder = new SignedOrder(
          buyyOrder,
          fixtures.keypairs.charlie.getSignature(buyyOrder.getEncodingHash())
        )

        const signedSellOrder = new SignedOrder(
          sellOrder,
          fixtures.keypairs.dave.getSignature(sellOrder.getEncodingHash())
        )

        signedBuyyOrder.getIsValidSignature().should.equal(true)
        signedSellOrder.getIsValidSignature().should.equal(true)

        const signedOrderPair = new SignedOrderPair({ buyyOrder: signedBuyyOrder, sellOrder: signedSellOrder })

        alchemilla.broadcastExecute(fixtures.addresses.alice, {
          tokenPairs: [
            {
              quotToken: tokens.dai.address,
              variToken: tokens.dai.address,
              signedBuyyOrders: [signedBuyyOrder],
              signedSellOrders: [signedSellOrder],
              exchanges: [{
                signedBuyyOrderIndex: Uint16.fromNumber(0),
                signedSellOrderIndex: Uint16.fromNumber(0),
                quotTokenTrans:
              }]
            }
          ]
        })

      })
    })
  })
})
