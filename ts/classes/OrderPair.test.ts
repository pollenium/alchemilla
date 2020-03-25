import frangipani from 'pollenium-frangipani'
import { OrderDirection } from '../enums'
import { Order } from '../'
import { OrderPair } from '../'
import {
  InvalidBuyyOrderTypeError,
  InvalidSellOrderTypeError,
  QuotTokenMismatchError,
  VariTokenMismatchError,
  PriceConstraintError
} from './OrderPair'
import crypto from 'crypto'
import { Uint256, Address, Bytes32 } from 'pollenium-buttercup'
import { weth, mkr, dai, usdc, nullBytes32 } from '../fixtures'
import { Uu } from 'pollenium-uvaursi'

const salt = Uu.genRandom(32)
const expiration = new Bytes32(Uu.genFill({ length: 32, fill: 255 }))

frangipani.forEach((fixture, index) => {

  const chainState = {
    buyyOrderTokenFilled: Uint256.fromNumber(fixture.chainState.buyyOrderTokenFilled),
    sellOrderTokenFilled: Uint256.fromNumber(fixture.chainState.sellOrderTokenFilled),
    buyyOrderTokenBalance: Uint256.fromNumber(fixture.chainState.buyyOrderTokenBalance),
    sellOrderTokenBalance: Uint256.fromNumber(fixture.chainState.sellOrderTokenBalance)
  }

  const buyyOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
    priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
    priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom)
  })

  const sellOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.SELL,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
    priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
    priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom),
  })

  const orderPair = new OrderPair({ buyyOrder, sellOrder })
  const solution = orderPair.getSolution(chainState)

  test(`order pair #${index}: quotTokenTrans`, () => {
    expect(solution.quotTokenTrans.toNumber()).toBe(fixture.solution.quotTokenTrans)
  })
  test(`order pair #${index}: variTokenTrans`, () => {
    expect(solution.variTokenTrans.toNumber()).toBe(fixture.solution.variTokenTrans)
  })
  test(`order pair #${index}: quotTokenArbit`, () => {
    expect(solution.quotTokenArbit.toNumber()).toBe(fixture.solution.quotTokenArbit)
  })

})

test('InvalidBuyyOrderTypeError', () => {
  const buyyOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.SELL,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.SELL,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(InvalidBuyyOrderTypeError)
})

test('InvalidSellOrderTypeError', () => {
  const buyyOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(InvalidSellOrderTypeError)
})

test('QuotTokenMismatchError', () => {
  const buyyOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.SELL,
    quotToken: usdc,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(QuotTokenMismatchError)
})


test('VariTokenMismatchError', () => {
  const buyyOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.SELL,
    quotToken: dai,
    variToken: mkr,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(VariTokenMismatchError)
})

test('PriceConstraintError', () => {
  const buyyOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.BUYY,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    salt,
    expiration,
    type: OrderDirection.SELL,
    quotToken: dai,
    variToken: weth,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(2),
    priceDenom: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(PriceConstraintError)
})
