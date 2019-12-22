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

      return

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

          await alchemilla.broadcastExecute(fixtures.addresses.monarchHot, {
            prevBlockHash: prevBlockHash,
            quotToken: tokens.dai.address,
            variToken: tokens.weth.address,
            signedOrders: [signedBuyyOrder, signedSellOrder],
            exchanges: [
              {
                signedBuyyOrderIndex: Uint8.fromNumber(0),
                signedSellOrderIndex: Uint8.fromNumber(1),
                quotTokenTrans: quotTokenTrans,
                variTokenTrans: variTokenTrans,
                quotTokenArbit: quotTokenArbit
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

    describe('max', () => {

      const ordersCount = 254

      it(`should execute batch of ${ordersCount} orders`, async () => {
        const buyyOrder = new Order({
          prevBlockHash: prevBlockHash,
          type: ORDER_TYPE.BUYY,
          quotToken: tokens.dai.address,
          variToken: tokens.weth.address,
          originator: fixtures.addresses.alice,
          tokenLimit: Uint256.fromNumber(ordersCount - 1),
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
          tokenLimit: Uint256.fromNumber(1),
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

        const signedSellOrders = []
        const exchanges = []

        for (let i = 1; i < ordersCount; i++) {
          signedSellOrders.push(signedSellOrder)
          exchanges.push({
            signedBuyyOrderIndex: Uint8.fromNumber(0),
            signedSellOrderIndex: Uint8.fromNumber(i),
            quotTokenTrans: Uint256.fromNumber(1),
            variTokenTrans: Uint256.fromNumber(1),
            quotTokenArbit: Uint256.fromNumber(0)
          })
        }

        await alchemilla.broadcastExecute(fixtures.addresses.alice, {
          prevBlockHash: prevBlockHash,
          quotToken: tokens.dai.address,
          variToken: tokens.weth.address,
          signedOrders: [signedBuyyOrder, ...signedSellOrders],
          exchanges: exchanges
        })


      })
    })
  })
})
