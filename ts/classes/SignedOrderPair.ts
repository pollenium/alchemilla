import { OrderDirection } from '../enums'
import { Address, Uint256, Bytes32, Uintable } from 'pollenium-buttercup'
import { SignedOrder, SignedOrderStruct } from './SignedOrder'
import { OrderPair } from './OrderPair'
import { StateFetcher } from './StateFetcher'
import Bn from 'bn.js'

export interface Solution {
  quotTokenTrans: Uint256,
  variTokenTrans: Uint256,
  quotTokenArbit: Uint256
}

function calcTokenAvail(struct: { limit: Uintable, fill: Uintable, balance: Uintable}): Uint256 {
  const unfill = new Uint256(struct.limit).opSub(struct.fill)
  if (unfill.compLt(struct.balance)) {
    return unfill
  } else {
    return new Uint256(struct.balance)
  }
}


export class SignedOrderPair extends OrderPair {

  public signedBuyyOrder: SignedOrder;
  public signedSellOrder: SignedOrder;
  public quotToken: Address;
  public variToken: Address;

  constructor(struct: {
    signedBuyyOrder: SignedOrder,
    signedSellOrder: SignedOrder
  }) {
    super({ buyyOrder: struct.signedBuyyOrder, sellOrder: struct.signedSellOrder })
    this.signedBuyyOrder = struct.signedBuyyOrder
    this.signedSellOrder = struct.signedSellOrder
  }

  async calcSolution(stateFetcher: StateFetcher): Promise<Solution> {

    const quotTokenAvail = calcTokenAvail({
      limit: this.buyyOrder.tokenLimit,
      fill: await stateFetcher.fetchFill(this.signedBuyyOrder.getSignatureHash()),
      balance: await stateFetcher.fetchBalance({
        holder: this.signedBuyyOrder.getTrader(),
        token: this.quotToken
      })
    })

    const variTokenAvail = calcTokenAvail({
      limit: this.sellOrder.tokenLimit,
      fill: await stateFetcher.fetchFill(this.signedSellOrder.getSignatureHash()),
      balance: await stateFetcher.fetchBalance({
        holder: this.signedSellOrder.getTrader(),
        token: this.variToken
      })
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
