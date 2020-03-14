import { Uish, Uu } from 'pollenium-uvaursi'
import { Uint256, Address, Bytes32 } from 'pollenium-buttercup'
import { ActionViaSignatureStruct } from '../classes/Contract/Engine/Writer'
import { Keypair, Signature } from 'pollenium-ilex'
import abi from 'ethereumjs-abi'
import web3Utils from 'web3-utils'

interface GenActionViaSignatureStructStruct extends Omit<ActionViaSignatureStruct, 'signature'> {
  fromPrivateKey: Uish,
  actionSalt: Uish
}

export function genActionViaSignatureStruct(struct: GenActionViaSignatureStructStruct): ActionViaSignatureStruct {


  const prehashBuffer = abi.rawEncode([
    'bytes20',
    'bytes20',
    'bytes32',
    'bytes32',
    'bytes32',
    'bytes32'
  ], [
    new Address(struct.to).uu.toPhex(),
    new Address(struct.token).uu.toPhex(),
    new Uint256(struct.amount).uu.toPhex(),
    new Uint256(struct.expiration).uu.toPhex(),
    new Bytes32(struct.nonce).uu.toPhex(),
    new Bytes32(struct.actionSalt).uu.toPhex()
  ])
  const prehash = new Uu(prehashBuffer)

  const hashHexish = web3Utils.soliditySha3({
    type: 'bytes',
    value: prehash.toPhex()
  })
  const hash = Uu.fromHexish(hashHexish)

  const keypair = new Keypair(struct.fromPrivateKey)
  const signature = keypair.getSignature(hash)

  return {
    ...struct,
    signature
  }
}
