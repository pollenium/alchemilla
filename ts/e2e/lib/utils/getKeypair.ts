import { AccountNames } from '../fixtures'
import { Keypair } from 'pollenium-ilex'

const keypairs = {}

export function getKeypair(accountName: AccountNames): Keypair {
  if (keypairs[accountName]) {
    return keypairs[accountName]
  }
  keypairs[accountName] = Keypair.generate()
  return keypairs[accountName]
}
