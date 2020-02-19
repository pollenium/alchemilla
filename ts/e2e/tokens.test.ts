import { AccountNames, TokenNames, traderNames, totalSupply, startBalance } from './lib/fixtures'
import {
  getKeypair,
  fetchOrDeployTokenAddress,
  fetchTokenReader,
  fetchTokenWriter,
  getAccountAddress
} from './lib/utils'
import { $enum } from 'ts-enum-util'
import { TokenReader } from 'pollenium-toadflax'

const deployerAddress = getAccountAddress(AccountNames.DEPLOYER)

$enum(TokenNames).forEach((tokenName) => {

  let tokenReader: TokenReader

  test(`fetch ${tokenName} reader/writer`, async () => {
    tokenReader = await fetchTokenReader(tokenName)
  })
  test('balance of DEPLOYER should be totalSupply', async () => {
    const balance = await tokenReader.fetchBalance(deployerAddress)
    expect(balance.toNumber()).toBe(totalSupply.toNumber())
  })
})
