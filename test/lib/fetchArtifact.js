const Resolver = require('truffle-resolver')
const provider = require('./provider')

const artifactsDirectory = `${__dirname}/../../artifacts`
const resolver = new Resolver({
  working_directory: artifactsDirectory,
  contracts_build_directory: artifactsDirectory
})


const artifacts = {}

module.exports = async function fetchArtifact(name) {
  if (artifacts[name]) {
    return artifacts[name]
  }

  artifacts[name] = await resolver.require(name)
  artifacts[name].setProvider(provider)
  return artifacts[name]
}
