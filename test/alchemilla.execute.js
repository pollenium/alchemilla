const alchemillaPromise = require('./alchemilla')
const tokensPromise = require('./tokens')
const orchid = require('pollenium-orchid')
const takeSnapshot = require('./lib/takeSnapshot')
const restoreSnapshot = require('./lib/restoreSnapshot')
const frangipani = require('pollenium-frangipani')
const fixtures = require('./lib/fixtures')
const buttercup = require('pollenium-buttercup')
const web3 = require('./lib/web3')

const Uint256 = buttercup.Uint256
const Uint8 = buttercup.Uint8
const Uint16 = buttercup.Uint16
const Bytes32 = buttercup.Bytes32

const ORDER_TYPE = orchid.enums.ORDER_TYPE
const Order = orchid.Order
const SignedOrder = orchid.SignedOrder
const SignedOrderPair = orchid.SignedOrderPair

let alchemilla
let tokens

function arrayOf(length, callback) {
  const array = []
  for (let i = 0; i < length; i ++) {
    array.push(callback(i))
  }
  return array
}

describe('alchemilla.execute', () => {
  before(async () => {
    alchemilla = await alchemillaPromise
    tokens = await tokensPromise
  })
  describe('executions', () => {

    let snapshotId
    let prevBlockHash

    before(async () => {
      snapshotId = await takeSnapshot()


      const prevBlock = await web3.eth.getBlock('latest')
      prevBlockHash = Bytes32.fromHexish(prevBlock.hash)
    })

    frangipani.forEach((fixture, index) => {

      describe(`fixture ${index}`, () => {

        after(async () => {
          await restoreSnapshot(snapshotId)
          snapshotId = await takeSnapshot()
        })

        it('balances should be startBalance', async () => {
          const balanceAliceDai = await alchemilla.fetchBalance(
            fixtures.addresses.alice,
            tokens.dai.address
          )
          const balanceAliceWeth = await alchemilla.fetchBalance(
            fixtures.addresses.bob,
            tokens.dai.address
          )
          const balanceBobDai = await alchemilla.fetchBalance(
            fixtures.addresses.alice,
            tokens.weth.address
          )
          const balanceBobWeth = await alchemilla.fetchBalance(
            fixtures.addresses.bob,
            tokens.weth.address
          )

          balanceAliceDai.getNumber().should.equal(fixtures.startBalance.getNumber())
          balanceAliceWeth.getNumber().should.equal(fixtures.startBalance.getNumber())
          balanceBobDai.getNumber().should.equal(fixtures.startBalance.getNumber())
          balanceBobWeth.getNumber().should.equal(fixtures.startBalance.getNumber())

        })


        const quotTokenTrans = Uint256.fromNumber(fixture.solution.quotTokenTrans)
        const variTokenTrans = Uint256.fromNumber(fixture.solution.variTokenTrans)
        const quotTokenArbit = Uint256.fromNumber(fixture.solution.quotTokenArbit)
        const quotTokenTotal = quotTokenTrans.add(quotTokenArbit)

        it('should execute', async () => {

          const buyyOrder = new Order({
            prevBlockHash: prevBlockHash,
            type: ORDER_TYPE.BUYY,
            quotToken: tokens.dai.address,
            variToken: tokens.weth.address,
            originator: fixtures.addresses.alice,
            tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
            priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
            priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom),
            expiration: Uint256.fromNumber(1),
            salt: Uint256.fromNumber(1)
          })

          const sellOrder = new Order({
            prevBlockHash: prevBlockHash,
            type: ORDER_TYPE.SELL,
            quotToken: tokens.dai.address,
            variToken: tokens.weth.address,
            originator: fixtures.addresses.bob,
            tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
            priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
            priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom),
            expiration: Uint256.fromNumber(1),
            salt: Uint256.fromNumber(1)
          })

          const signedBuyyOrder = new SignedOrder(
            buyyOrder,
            fixtures.keypairs.alice.getSignature(buyyOrder.getEncodingHash())
          )

          const signedSellOrder = new SignedOrder(
            sellOrder,
            fixtures.keypairs.bob.getSignature(sellOrder.getEncodingHash())
          )

          signedBuyyOrder.getIsValidSignature().should.equal(true)
          signedSellOrder.getIsValidSignature().should.equal(true)

          const buyyOrderSolidityEncodingHash = await alchemilla.fetchEncodingHash(prevBlockHash, signedBuyyOrder)
          const buyyOrderJsEncodingHash = signedBuyyOrder.getEncodingHash()
          const sellOrderSolidityEncodingHash = await alchemilla.fetchEncodingHash(prevBlockHash, signedSellOrder)
          const sellOrderJsEncodingHash = signedSellOrder.getEncodingHash()

          await alchemilla.broadcastExecute(fixtures.addresses.monarchHot, {
            prevBlockHash: prevBlockHash,
            buyyOrders: [signedBuyyOrder],
            sellOrders: [signedSellOrder],
            exchanges: [
              {
                signedBuyyOrderIndex: Uint8.fromNumber(0),
                signedSellOrderIndex: Uint8.fromNumber(0),
                quotTokenTrans,
                variTokenTrans,
                quotTokenArbit
              }
            ]
          })
        })

        it('should have transferred dai from alice to bob and monarchHot', async () => {
          const balanceAlice = await alchemilla.fetchBalance(
            fixtures.addresses.alice,
            tokens.dai.address
          )
          const balanceBob = await alchemilla.fetchBalance(
            fixtures.addresses.bob,
            tokens.dai.address
          )
          const balanceMonarchHot = await alchemilla.fetchBalance(
            fixtures.addresses.monarchHot,
            tokens.dai.address
          )

          balanceAlice.getNumber().should.equal(fixtures.startBalance.sub(quotTokenTotal).getNumber())
          balanceBob.getNumber().should.equal(fixtures.startBalance.add(quotTokenTrans).getNumber())
          balanceMonarchHot.getNumber().should.equal(quotTokenArbit.getNumber())
        })

        it('should have transferred weth from bob to alice', async () => {
          const balanceBob = await alchemilla.fetchBalance(
            fixtures.addresses.bob,
            tokens.weth.address
          )
          const balanceAlice = await alchemilla.fetchBalance(
            fixtures.addresses.alice,
            tokens.weth.address
          )
          balanceAlice.getNumber().should.equal(fixtures.startBalance.add(variTokenTrans).getNumber())
          balanceBob.getNumber().should.equal(fixtures.startBalance.sub(variTokenTrans).getNumber())
        })
      })
    })

    describe('multis', () => {

      const multisFixtures = [
        {
          buyyOrdersCount: 1,
          buyyOrderTokenLimit: 1,
          sellOrdersCount: 1,
          sellOrderTokenLimit: 1,
          exchanges: [{
            buyyOrderIndex: 0,
            sellOrderIndex: 0
          }]
        },
        {
          buyyOrdersCount: 1,
          buyyOrderTokenLimit: 255,
          sellOrdersCount: 255,
          sellOrderTokenLimit: 1,
          exchanges: arrayOf(255, (i) => {
            return {
              buyyOrderIndex: 0,
              sellOrderIndex: i
            }
          })
        },
        ,
        {
          buyyOrdersCount: 1,
          buyyOrderTokenLimit: 500,
          sellOrdersCount: 500,
          sellOrderTokenLimit: 1,
          exchanges: arrayOf(500, (i) => {
            return {
              buyyOrderIndex: 0,
              sellOrderIndex: i
            }
          })
        },
        {
          buyyOrdersCount: 255,
          buyyOrderTokenLimit: 1,
          sellOrdersCount: 255,
          sellOrderTokenLimit: 1,
          exchanges: arrayOf(255, (i) => {
            return {
              buyyOrderIndex: i,
              sellOrderIndex: i
            }
          })
        },
      ]

      multisFixtures.forEach((multisFixture, index) => {
        describe(`multisFixture #${index}: [${multisFixture.buyyOrdersCount}, ${multisFixture.sellOrdersCount}, ${multisFixture.exchanges.length}]`, () => {
          after(async () => {
            await restoreSnapshot(snapshotId)
            snapshotId = await takeSnapshot()
          })
          it(`should execute batch of orders`, async () => {

            const buyyOrder = new Order({
              prevBlockHash: prevBlockHash,
              type: ORDER_TYPE.BUYY,
              quotToken: tokens.dai.address,
              variToken: tokens.weth.address,
              originator: fixtures.addresses.alice,
              tokenLimit: Uint256.fromNumber(multisFixture.buyyOrderTokenLimit),
              priceNumer: Uint256.fromNumber(1),
              priceDenom: Uint256.fromNumber(1),
              expiration: Uint256.fromNumber(1),
              salt: Uint256.fromNumber(1)
            })

            const sellOrder = new Order({
              prevBlockHash: prevBlockHash,
              type: ORDER_TYPE.SELL,
              quotToken: tokens.dai.address,
              variToken: tokens.weth.address,
              originator: fixtures.addresses.bob,
              tokenLimit: Uint256.fromNumber(multisFixture.sellOrderTokenLimit),
              priceNumer: Uint256.fromNumber(1),
              priceDenom: Uint256.fromNumber(1),
              expiration: Uint256.fromNumber(1),
              salt: Uint256.fromNumber(1)
            })

            const signedBuyyOrder = new SignedOrder(
              buyyOrder,
              fixtures.keypairs.alice.getSignature(buyyOrder.getEncodingHash())
            )

            const signedSellOrder = new SignedOrder(
              sellOrder,
              fixtures.keypairs.bob.getSignature(sellOrder.getEncodingHash())
            )

            const signedBuyyOrders = []
            const signedSellOrders = []
            const exchanges = []

            for (let i = 0; i < multisFixture.buyyOrdersCount; i++) {
              signedBuyyOrders.push(signedBuyyOrder)
            }

            for (let i = 0; i < multisFixture.sellOrdersCount; i++) {
              signedSellOrders.push(signedSellOrder)
            }

            for (let i = 0; i < multisFixture.exchanges.length; i++) {
              const exchangeFixture = multisFixture.exchanges[i]
              exchanges.push({
                signedBuyyOrderIndex: Uint16.fromNumber(exchangeFixture.buyyOrderIndex),
                signedSellOrderIndex: Uint16.fromNumber(exchangeFixture.sellOrderIndex),
                quotTokenTrans: Uint256.fromNumber(1),
                variTokenTrans: Uint256.fromNumber(1),
                quotTokenArbit: Uint256.fromNumber(0)
              })
            }

            await alchemilla.broadcastExecute(fixtures.addresses.alice, {
              prevBlockHash: prevBlockHash,
              buyyOrders: signedBuyyOrders,
              sellOrders: signedSellOrders,
              exchanges: exchanges
            })
          })

        })
      })
    })
  })
})
