import { AccountNames, TokenNames, totalSupply } from '../fixtures'
import { getWallet } from './getWallet'
import { MonarchicExecutorOracleDeployer } from '../../../'
import { Address } from 'pollenium-buttercup'

let monarchicExecutorOracleAddress: Address

export async function fetchOrDeployMonarchicExecutorOracleAddress(): Promise<Address> {
  if (monarchicExecutorOracleAddress) {
    return monarchicExecutorOracleAddress
  }
  const monarchicExecutorOracleDeployer = new MonarchicExecutorOracleDeployer({
    signer: getWallet(AccountNames.DEPLOYER)
  })
  const { address } = await monarchicExecutorOracleDeployer.deploy()
  monarchicExecutorOracleAddress = new Address(address)
  return monarchicExecutorOracleAddress
}
