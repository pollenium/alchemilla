import { ORDER_TYPE } from '../enums'
import { Address, Uint256, Uintable } from 'pollenium-buttercup'
import { Order, OrderStruct } from './Order'
import Bn from 'bn.js'


export class OrderPair {

  public buyyOrder: Order;
  public sellOrder: Order;
  public quotToken: Address;
  public variToken: Address;

  constructor(readonly struct: {
    buyyOrder: Order | OrderStruct,
    sellOrder: Order | OrderStruct
  }) {

    this.buyyOrder = struct.buyyOrder instanceof Order ? this.buyyOrder : new Order(this.buyyOrder)
    this.sellOrder = struct.sellOrder instanceof Order ? this.sellOrder : new Order(this.sellOrder)

    Object.assign(this, struct)

    if (this.buyyOrder.type !== ORDER_TYPE.BUYY) {
      throw new InvalidBuyyOrderTypeError()
    }

    if (this.sellOrder.type !== ORDER_TYPE.SELL) {
      throw new InvalidSellOrderTypeError()
    }

    if (!this.buyyOrder.quotToken.uu.getIsEqual(this.sellOrder.quotToken)) {
      throw new QuotTokenMismatchError()
    }

    if (!this.buyyOrder.variToken.uu.getIsEqual(this.sellOrder.variToken)) {
      throw new VariTokenMismatchError()
    }

    if (
      this.buyyOrder.priceNumer.opMul(this.sellOrder.priceDenom)
        .compLt(
          this.buyyOrder.priceDenom.opMul(this.sellOrder.priceNumer)
        )
    ) {
      throw new PriceConstraintError
    }

    this.quotToken = this.buyyOrder.quotToken,
    this.variToken = this.buyyOrder.variToken
  }

  getSolution(struct: {
    buyyOrderTokenFilled: Uintable,
    buyyOrderTokenBalance: Uintable,
    sellOrderTokenFilled: Uintable,
    sellOrderTokenBalance: Uintable
  }): {
    quotTokenTrans: Uint256,
    variTokenTrans: Uint256,
    quotTokenArbit: Uint256
  } {

    const quotTokenAvail = this.buyyOrder.getTokenAvail({
      tokenFilled: struct.buyyOrderTokenFilled,
      tokenBalance: struct.buyyOrderTokenBalance
    })
    const variTokenAvail = this.sellOrder.getTokenAvail({
      tokenFilled: struct.sellOrderTokenFilled,
      tokenBalance: struct.sellOrderTokenBalance
    })

    const buyyOrderVariTokenTransMax
      = quotTokenAvail
        .opMul(this.buyyOrder.priceDenom)
        .opDiv(this.buyyOrder.priceNumer)

    const variTokenTrans
      = (buyyOrderVariTokenTransMax.compLt(variTokenAvail))
      ? buyyOrderVariTokenTransMax
      : variTokenAvail

    const quotTokenTrans
      = variTokenTrans
        .opMul(this.sellOrder.priceNumer)
        .opDiv(this.sellOrder.priceDenom)

    const quotTokenArbit
      = variTokenTrans
        .opMul(this.buyyOrder.priceNumer)
        .opDiv(this.buyyOrder.priceDenom)
        .opSub(quotTokenTrans)

    return {
      quotTokenTrans,
      quotTokenArbit,
      variTokenTrans
    }
  }
}

export class InvalidBuyyOrderTypeError extends Error {
  constructor() {
    super('buyyOrder has invalid type')
    Object.setPrototypeOf(this, InvalidBuyyOrderTypeError.prototype)
  }
}

export class InvalidSellOrderTypeError extends Error {
  constructor() {
    super('sellOrder has invalid type')
    Object.setPrototypeOf(this, InvalidSellOrderTypeError.prototype)
  }
}

export class QuotTokenMismatchError extends Error {
  constructor() {
    super('quotToken mismatch')
    Object.setPrototypeOf(this, QuotTokenMismatchError.prototype)
  }
}

export class VariTokenMismatchError extends Error {
  constructor() {
    super('variToken mismatch')
    Object.setPrototypeOf(this, VariTokenMismatchError.prototype)
  }
}

export class PriceConstraintError extends Error {
  constructor() {
    super('buyy order price should not be less than sell order price')
    Object.setPrototypeOf(this, PriceConstraintError.prototype)
  }
}
