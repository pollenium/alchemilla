import {
  alice,
  weth,
  usdc,
  nullAddress,
  uint256Zero,
  validOrderStruct
} from '../fixtures'
import { Uint256 } from 'pollenium-buttercup'
import { ORDER_TYPE } from '../enums'
import {
  Order,
  QuotVariTokenMatchError,
  NullQuotTokenError,
  NullVariTokenError,
  ZeroTokenLimitError,
  ZeroPriceNumerError,
  ZeroPriceDenomError
} from './Order'

const invalidOrderStructFixtures = [
  {
    error: QuotVariTokenMatchError,
    delta: {
      variToken: usdc
    }
  },
  {
    error: NullQuotTokenError,
    delta: {
      quotToken: nullAddress
    }
  },
  {
    error: NullVariTokenError,
    delta: {
      variToken: nullAddress
    }
  },
  {
    error: ZeroTokenLimitError,
    delta: {
      tokenLimit: uint256Zero
    }
  },
  {
    error: ZeroPriceNumerError,
    delta: {
      priceNumer: uint256Zero
    }
  },
  {
    error: ZeroPriceDenomError,
    delta: {
      priceDenom: uint256Zero
    }
  }
]

test('valid', () => {
  new Order(validOrderStruct)
})

invalidOrderStructFixtures.forEach((fixture) => {
  test(fixture.error.name, () => {
    expect(() => {
      const orderStruct = Object.assign(Object.assign({}, validOrderStruct), fixture.delta)
      new Order(orderStruct)
    }).toThrow(fixture.error)
  })
})
