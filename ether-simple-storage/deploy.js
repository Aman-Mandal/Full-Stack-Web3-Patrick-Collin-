const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://127.0.0.1:7545 - RpcProvider

  // provider takes the url from Ganache to connect to the local blockchain network (like VM Network in remix)
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  // wallet takes (private key, provider)
  const wallet = new ethers.Wallet(
    "c6e3acc7b75e21b7d21088d68148bd27254db92f42201703a7822ed7e0b96b31",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // ContractFactory is an object provided by ethers to deploy contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying the contract!! Please wait...");

  // Deploying Contract
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
