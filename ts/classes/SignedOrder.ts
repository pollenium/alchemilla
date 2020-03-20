import { ORDER_TYPE } from '../enums'
import { Bytes, Address, Bytes32, Uint8, Uint256 } from 'pollenium-buttercup'
import { Signature, SignatureStruct } from 'pollenium-ilex'
import { Order, OrderStruct } from './Order'
import { Uu, Uish } from 'pollenium-uvaursi'
import { soliditySha3 } from 'web3-utils'

export interface SignedOrderStruct {
  order: Order | OrderStruct,
  signature: SignatureStruct
}

export class SignedOrder extends Order {

  readonly signature

  private trader: Address;
  private ligma: Uu;
  private signatureHash: Bytes32;
  private priority: Uint256;

  constructor(struct: SignedOrderStruct) {
    super(struct.order instanceof Order ? struct.order.struct : struct.order)
    this.signature = new Signature(struct.signature)
  }

  getTrader(): Address {
    if (this.trader) {
      return this.trader
    }
    this.trader = new Address(this.signature.getSigner(this.getSugmaHash()))
    return this.trader
  }

  public getEthersArg(): any {
    return [
      this.getTrader().uu.toPhex(),
      this.quotToken.uu.toPhex(),
      this.variToken.uu.toPhex(),
      this.priceNumer.uu.toPhex(),
      this.priceDenom.uu.toPhex(),
      this.tokenLimit.uu.toPhex(),
      this.signature.v.toNumber(),
      this.signature.r.uu.toPhex(),
      this.signature.s.uu.toPhex(),
      this.getSignatureHash().uu.toPhex()
    ]
  }

  public getLigma(): Uu {
    if (this.ligma) {
      return this.ligma
    }
    this.ligma = Uu.genConcat([
      this.salt,
      this.target,
      Uint8.fromNumber(this.type),
      this.quotToken,
      this.variToken,
      this.priceNumer,
      this.priceDenom,
      this.tokenLimit,
      this.signature.v,
      this.signature.r,
      this.signature.s
    ])
    return this.ligma

  }

  static fromLigma(uishLigma: Uish): SignedOrder {
    const ligma = Uu.wrap(uishLigma)
    const salt = new Uint256(ligma.u.slice(0, 32))
    const target = new Uint256(ligma.u.slice(32, 64))
    const type: ORDER_TYPE = ligma.u[64]
    const quotToken = new Address(ligma.u.slice(65, 85))
    const variToken = new Address(ligma.u.slice(85, 105))
    const priceNumer = new Uint256(ligma.u.slice(105, 137))
    const priceDenom = new Uint256(ligma.u.slice(137, 169))
    const tokenLimit = new Uint256(ligma.u.slice(169, 201))
    const signatureV = new Uint8(ligma.u.slice(201, 202))
    const signatureR = new Bytes32(ligma.u.slice(202, 234))
    const signatureS = new Bytes32(ligma.u.slice(234, 266))

    const orderStruct: OrderStruct = {
      salt,
      target,
      type,
      quotToken,
      variToken,
      priceNumer,
      priceDenom,
      tokenLimit
    }
    const signature = new Signature({
      v: signatureV,
      r: signatureR,
      s: signatureS
    })
    return new SignedOrder({ order: orderStruct, signature })
  }

  getSignatureHash(): Bytes32 {
    if (this.signatureHash) {
      return this.signatureHash
    }
    this.signatureHash = new Bytes32(Uu.fromHexish(
      soliditySha3({
        t: 'bytes',
        v: this.signature.getEncoding().toHex()
      })
    ))
    return this.signatureHash
  }

  getPriority(): Uint256 {
    if (this.priority) {
      return this.priority
    }
    this.priority = new Uint256(this.getSignatureHash().u.slice().reverse())
    return this.priority
  }

}
