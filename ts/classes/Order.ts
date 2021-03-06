import { Address, Uint256, Bytes, Bytes1, Bytes32, Uint8, Uintable } from 'pollenium-buttercup'
import { OrderDirection } from '../enums'
import { soliditySha3 } from 'web3-utils'
import { Uu, Uish } from 'pollenium-uvaursi'
import Bignumber from 'bignumber.js'

export interface OrderStruct {
  salt: Uish;
  direction: OrderDirection;
  expiration: Uintable;
  quotToken: Uish;
  variToken: Uish;
  tokenLimit: Uintable;
  priceNumer: Uintable;
  priceDenom: Uintable;

}

export class Order {

  readonly salt: Bytes32;
  readonly direction: OrderDirection;
  readonly expiration: Uint256;
  readonly quotToken: Address;
  readonly variToken: Address;
  readonly tokenLimit: Uint256;
  readonly priceNumer: Uint256;
  readonly priceDenom: Uint256;

  private price: Bignumber;
  private sugma: Bytes;
  private sugmaHash: Bytes32;

  constructor(readonly struct: OrderStruct) {

    this.direction = struct.direction,
    this.salt = new Bytes32(struct.salt)
    this.expiration = new Uint256(struct.expiration)
    this.quotToken = new Address(struct.quotToken)
    this.variToken = new Address(struct.variToken)
    this.tokenLimit = new Uint256(struct.tokenLimit)
    this.priceNumer = new Uint256(struct.priceNumer)
    this.priceDenom = new Uint256(struct.priceDenom)

    if (this.quotToken.uu.getIsEqual(this.variToken.uu)) {
      throw new QuotVariTokenMatchError(this.quotToken)
    }

    if (this.quotToken.getIsNull()) {
      throw new NullQuotTokenError
    }

    if (this.variToken.getIsNull()) {
      throw new NullVariTokenError
    }

    if (this.tokenLimit.getIsZero()) {
      throw new ZeroTokenLimitError
    }

    if (this.priceNumer.getIsZero()) {
      throw new ZeroPriceNumerError
    }

    if (this.priceDenom.getIsZero()) {
      throw new ZeroPriceDenomError
    }

  }


  private getSugma(): Bytes {
    if (this.sugma) {
      return this.sugma
    }

    this.sugma = new Bytes(Uu.genConcat([
      this.salt,
      this.expiration,
      this.priceNumer,
      this.priceDenom,
      this.tokenLimit,
      this.quotToken,
      this.variToken,
      Uint8.fromNumber(this.direction),
    ]))
    return this.sugma
  }

  getSugmaHash(): Bytes32 {
    if (this.sugmaHash) {
      return this.sugmaHash
    }
    this.sugmaHash = new Bytes32(Uu.fromHexish(
      soliditySha3({
        t: 'bytes',
        v: this.getSugma().uu.toHex()
      })
    ))
    return this.sugmaHash
  }

  getPrice(): Bignumber {
    if (this.price) {
      return this.price
    }
    const priceNumerBignumber = new Bignumber(this.priceNumer.toNumberString(10))
    const priceDenomBignumber = new Bignumber(this.priceDenom.toNumberString(10))
    this.price = priceNumerBignumber.div(priceDenomBignumber)
    return this.price
  }

  getLimitingToken(): Address {
    if (this.direction === OrderDirection.BUYY) {
      return this.quotToken
    } else {
      return this.variToken
    }
  }

}

export class QuotVariTokenMatchError extends Error {
  constructor(token: Address) {
    super(`quotToken and variToken should be different, received ${token.uu.toHex()} for both`)
    Object.setPrototypeOf(this, QuotVariTokenMatchError.prototype)
  }
}

class NullError extends Error {
  constructor(variableName: string) {
    super(`${variableName} should not be null`)
  }
}

class ZeroError extends Error {
  constructor(variableName: string) {
    super(`${variableName} should not be zero`)
  }
}

export class NullQuotTokenError extends NullError {
  constructor() {
    super('quotToken')
    Object.setPrototypeOf(this, NullQuotTokenError.prototype)
  }
}

export class NullVariTokenError extends NullError {
  constructor() {
    super('variToken')
    Object.setPrototypeOf(this, NullVariTokenError.prototype)
  }
}

export class ZeroTokenLimitError extends ZeroError {
  constructor() {
    super('tokenLimit')
    Object.setPrototypeOf(this, ZeroTokenLimitError.prototype)
  }
}

export class ZeroPriceNumerError extends ZeroError {
  constructor() {
    super('priceNumer')
    Object.setPrototypeOf(this, ZeroPriceNumerError.prototype)
  }
}

export class ZeroPriceDenomError extends ZeroError {
  constructor() {
    super('priceDenom')
    Object.setPrototypeOf(this, ZeroPriceDenomError.prototype)
  }
}
