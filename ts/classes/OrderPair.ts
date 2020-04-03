import { OrderDirection } from '../enums'
import { Address, Uint256, Bytes32, Uintable } from 'pollenium-buttercup'
import { Order, OrderStruct } from './Order'
import { StateFetcher } from './StateFetcher'
import Bn from 'bn.js'


export class OrderPair {

  public buyyOrder: Order;
  public sellOrder: Order;
  public quotToken: Address;
  public variToken: Address;

  constructor(struct: {
    buyyOrder: Order,
    sellOrder: Order
  }) {

    this.buyyOrder = struct.buyyOrder
    this.sellOrder = struct.sellOrder

    Object.assign(this, struct)

    if (this.buyyOrder.direction !== OrderDirection.BUYY) {
      throw new InvalidBuyyOrderTypeError()
    }

    if (this.sellOrder.direction !== OrderDirection.SELL) {
      throw new InvalidSellOrderTypeError()
    }

    if (!this.buyyOrder.quotToken.uu.getIsEqual(this.sellOrder.quotToken)) {
      throw new QuotTokenMismatchError()
    }

    if (!this.buyyOrder.variToken.uu.getIsEqual(this.sellOrder.variToken)) {
      throw new VariTokenMismatchError()
    }

    if (this.buyyOrder.getPrice().lt(this.sellOrder.getPrice())) {
      throw new PriceConstraintError
    }

    this.quotToken = this.buyyOrder.quotToken,
    this.variToken = this.buyyOrder.variToken
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
