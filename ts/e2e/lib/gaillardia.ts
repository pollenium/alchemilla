import { Gaillardia, gaillardiaDefaults } from 'pollenium-gaillardia'
import { AccountNames } from './fixtures'
import { getKeypair } from './utils'
import { $enum } from 'ts-enum-util'
import { Uu } from 'pollenium-uvaursi'
import { ETHER } from 'pollenium-weigela'
import { Uint256 } from 'pollenium-buttercup'

export const gaillardia = new Gaillardia({
  ...gaillardiaDefaults,
  accounts: $enum(AccountNames).map((name) => {
    const keypair = getKeypair(name)
    return {
      privateKey: keypair.privateKey,
      startBalance: ETHER.opMul(10),
    }
  })
})
