import frangipani from 'pollenium-frangipani'
import { OrderDirection } from '../enums'
import { Order, SignedOrder, SignedOrderPair, StateFetcher } from '../'
import { Keypair } from 'pollenium-ilex'
import {
  InvalidBuyyOrderTypeError,
  InvalidSellOrderTypeError,
  QuotTokenMismatchError,
  VariTokenMismatchError,
  PriceConstraintError
} from './OrderPair'
import crypto from 'crypto'
import { Uint256, Address, Bytes32 } from 'pollenium-buttercup'
import { dai, weth } from '../fixtures'
import { Uu, Uish } from 'pollenium-uvaursi'

const salt = Uu.genRandom(32)
const expiration = new Bytes32(Uu.genFill({ length: 32, fill: 255 }))
const buyyer = Keypair.generate()
const seller = Keypair.generate()

class FixtureFetcher extends StateFetcher {

  fixture: any
  signedBuyyOrder: SignedOrder
  signedSellOrder: SignedOrder

  constructor(struct: {
    fixture: any,
    signedBuyyOrder: SignedOrder,
    signedSellOrder: SignedOrder
  }) {
    super()
    this.fixture = struct.fixture
    this.signedBuyyOrder = struct.signedBuyyOrder
    this.signedSellOrder = struct.signedSellOrder
  }
  async fetchBalance(struct: { holder: Uish, token: Uish }) {
    if (this.signedBuyyOrder.getTrader().uu.getIsEqual(struct.holder)) {
      if (this.signedBuyyOrder.quotToken.uu.getIsEqual(struct.token)) {
        return Uint256.fromNumber(this.fixture.chainState.buyyOrderTokenBalance)
      }
    }
    if (this.signedSellOrder.getTrader().uu.getIsEqual(struct.holder)) {
      if (this.signedSellOrder.variToken.uu.getIsEqual(struct.token)) {
        return Uint256.fromNumber(this.fixture.chainState.sellOrderTokenBalance)
      }
    }
    throw new Error('Unknown holder/token balance')
  }

  async fetchFill(signatureHash: Uish) {
    if (this.signedBuyyOrder.getSignatureHash().uu.getIsEqual(signatureHash)) {
      return this.fixture.chainState.buyyOrderTokenFilled
    }
    if (this.signedSellOrder.getSignatureHash().uu.getIsEqual(signatureHash)) {
      return this.fixture.chainState.sellOrderTokenFilled
    }
    throw new Error('Unknown fill')
  }
}

frangipani.forEach((fixture, index) => {

  const buyyOrder = new Order({
    salt,
    expiration,
    direction: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
    priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
    priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom)
  })

  const signedBuyyOrder = new SignedOrder({
    order: buyyOrder,
    signature: buyyer.getSignature(buyyOrder.getSugmaHash())
  })

  const sellOrder = new Order({
    salt,
    expiration,
    direction: OrderDirection.SELL,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
    priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
    priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom),
  })

  const signedSellOrder = new SignedOrder({
    order: sellOrder,
    signature: seller.getSignature(sellOrder.getSugmaHash())
  })


  const signedOrderPair = new SignedOrderPair({ signedBuyyOrder, signedSellOrder })

  const fixtureFetcher = new FixtureFetcher({
    signedBuyyOrder,
    signedSellOrder,
    fixture
  })



  test(`fixture #${index} solution`, async () => {
    const solution = await signedOrderPair.calcSolution(fixtureFetcher)
    expect(solution.quotTokenTrans.toNumber()).toBe(fixture.solution.quotTokenTrans)
    expect(solution.variTokenTrans.toNumber()).toBe(fixture.solution.variTokenTrans)
    expect(solution.quotTokenArbit.toNumber()).toBe(fixture.solution.quotTokenArbit)
  })
})
