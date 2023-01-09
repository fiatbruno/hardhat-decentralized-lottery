const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9
args = [BASE_FEE, GAS_PRICE_LINK]

module.exports = async function (getNamedAccounts, deployments) {
    const { deploy, log } = deployments
    const { deployer } = getNamedAccounts()
    const chainId = network.name.chainId

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks... ")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("✨ Mocks Deployed!")
        log("-----------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
