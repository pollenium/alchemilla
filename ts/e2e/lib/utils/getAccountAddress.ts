import { AccountNames } from '../fixtures'
import { getKeypair } from './getKeypair'
import { Address } from 'pollenium-buttercup'

export function getAccountAddress(accountName: AccountNames): Address {
  return getKeypair(accountName).getAddress()
}
