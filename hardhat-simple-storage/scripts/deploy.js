const { ethers, run, network } = require('hardhat')

async function main() {
  // Deploying Contract
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract!! Please wait...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Contract Deployed: ${simpleStorage.address}`)

  /// Verfying the contract only if its running on Goerli and not on hardhat(local) network
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  // Interacting with contract
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value: ${currentValue}`)
  const transactionResponse = await simpleStorage.store('9022012')
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value: ${updatedValue}`)
}

// verify function
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
