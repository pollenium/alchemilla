import { AccountNames, TokenNames, totalSupply } from '../fixtures'
import { getWallet } from './getWallet'
import { EngineDeployer } from '../../../'
import { Address } from 'pollenium-buttercup'

let engineAddress: Address

export async function fetchOrDeployEngineAddress(): Promise<Address> {
  if (engineAddress) {
    return engineAddress
  }
  const engineDeployer = new EngineDeployer({
    signer: getWallet(AccountNames.DEPLOYER)
  })
  const { address } = await engineDeployer.deploy()
  engineAddress = new Address(address)
  return engineAddress
}
