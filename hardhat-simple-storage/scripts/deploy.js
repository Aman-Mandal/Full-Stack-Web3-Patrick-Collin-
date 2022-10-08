const { ethers, run, network } = require('hardhat')

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract!! Please wait...')

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log(`Contract Deployed: ${simpleStorage.address}`)

  /// Verfying the contract only if its running on Goerli and not on hardhat(local) network
  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
}

async function verify(contractAddress, args) {
  try {
    console.log('Verifying Contract!! Please wait... ')
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    }) // run is hardhat package used to do the hardhat tasks!! eg. verify is already prebuild in hardhat
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!!')
    } else {
      console.error(error)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
