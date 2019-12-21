const alchemillaPromise = require('./alchemilla.oligarchy')
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
          const balanceCharlieDai = await alchemilla.fetchBalance(
            fixtures.addresses.charlie,
            tokens.dai.address
          )
          const balanceCharlieWeth = await alchemilla.fetchBalance(
            fixtures.addresses.dave,
            tokens.dai.address
          )
          const balanceDaveDai = await alchemilla.fetchBalance(
            fixtures.addresses.charlie,
            tokens.weth.address
          )
          const balanceDaveWeth = await alchemilla.fetchBalance(
            fixtures.addresses.dave,
            tokens.weth.address
          )

          balanceCharlieDai.getNumber().should.equal(fixtures.startBalance.getNumber())
          balanceCharlieWeth.getNumber().should.equal(fixtures.startBalance.getNumber())
          balanceDaveDai.getNumber().should.equal(fixtures.startBalance.getNumber())
          balanceDaveWeth.getNumber().should.equal(fixtures.startBalance.getNumber())

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
            originator: fixtures.addresses.charlie,
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

          await alchemilla.broadcastExecute(fixtures.addresses.alice, {
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

        it('should have transferred dai from charlie to alice and dave', async () => {
          const balanceAlice = await alchemilla.fetchBalance(
            fixtures.addresses.alice,
            tokens.dai.address
          )
          const balanceCharlie = await alchemilla.fetchBalance(
            fixtures.addresses.charlie,
            tokens.dai.address
          )
          const balanceDave = await alchemilla.fetchBalance(
            fixtures.addresses.dave,
            tokens.dai.address
          )
          balanceAlice.getNumber().should.equal(quotTokenArbit.getNumber())
          balanceCharlie.getNumber().should.equal(fixtures.startBalance.sub(quotTokenTotal).getNumber())
          balanceDave.getNumber().should.equal(fixtures.startBalance.add(quotTokenTrans).getNumber())
        })

        it('should have transferred weth from dave to charlie', async () => {
          const balanceDave = await alchemilla.fetchBalance(
            fixtures.addresses.dave,
            tokens.weth.address
          )
          const balanceCharlie = await alchemilla.fetchBalance(
            fixtures.addresses.charlie,
            tokens.weth.address
          )
          balanceCharlie.getNumber().should.equal(fixtures.startBalance.add(variTokenTrans).getNumber())
          balanceDave.getNumber().should.equal(fixtures.startBalance.sub(variTokenTrans).getNumber())
        })
      })
    })

    describe('max', () => {
      it('should execute max', async () => {
        const buyyOrder = new Order({
          prevBlockHash: prevBlockHash,
          type: ORDER_TYPE.BUYY,
          quotToken: tokens.dai.address,
          variToken: tokens.weth.address,
          originator: fixtures.addresses.charlie,
          tokenLimit: Uint256.fromNumber(255),
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
          originator: fixtures.addresses.dave,
          tokenLimit: Uint256.fromNumber(1),
          priceNumer: Uint256.fromNumber(1),
          priceDenom: Uint256.fromNumber(1),
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

        const signedSellOrders = []
        const exchanges = []

        for (let i = 1; i <= 255; i++) {
          signedSellOrders.push(signedSellOrder)
          exchanges.push({
            signedBuyyOrderIndex: Uint8.fromNumber(0),
            signedSellOrderIndex: Uint8.fromNumber(i),
            quotTokenTrans: Uint256.fromNumber(1),
            variTokenTrans: Uint256.fromNumber(1),
            quotTokenArbit: Uint256.fromNumber(0)
          })
        }

        console.log(signedSellOrder)
        console.log(exchanges)

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
