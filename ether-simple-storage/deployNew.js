const ethers = require('ethers')
const fs = require('fs-extra')
require('dotenv').config()

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const encryptedJsonKey = fs.readFileSync(
    './encryptedJsonKeyNew.json',
    'utf-8'
  )
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJsonKey,
    process.env.PRIVATE_KEY_PASSWORD
  )
  wallet = await wallet.connect(provider)

  const abi = fs.readFileSync(
    './SimpleStorageNew_sol_SimpleStorageNew.abi',
    'utf-8'
  )
  const binary = fs.readFileSync(
    './SimpleStorageNew_sol_SimpleStorageNew.bin',
    'utf-8'
  )

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log('Deploying Contract!! Please Wait.....')

  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1) // transaction Receipt

  console.log(`Contract Address : ${contract.address}`)

  const currentFavNumber = await contract.retrieve()
  console.log(`Current Fav Number : ${currentFavNumber}`)

  const transactionResponse = await contract.store('98392')
  const transactionReceipt = await transactionResponse.wait(1)

  const newFavNumber = await contract.retrieve()
  console.log(`New Fav Number after storing : ${newFavNumber} `)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
