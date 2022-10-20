// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const KtpInspector = await ethers.getContractFactory("KtpInspector");
  const contract = await KtpInspector.deploy();
  await contract.deployed();

  const temp = await contract.isSuperAdmin(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  );

  console.log("Contract address:", contract.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(contract);
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "KtpInspector-address.json"),
    JSON.stringify({ KtpInspector: contract.address }, undefined, 2)
  );

  const KtpInspectorArtifacts = artifacts.readArtifactSync("KtpInspector");

  fs.writeFileSync(
    path.join(contractsDir, "KtpInspector.json"),
    JSON.stringify(KtpInspectorArtifacts, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
