const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

module.exports = async function (getNamedAccounts, deployments) {
    const { deploy, log } = deployments
    const { deployer } = getNamedAccounts()
    const chainId = network.name.chainId

    if (developmentChains.includes(network.name)) {
        console.log("Local network detected! Deploying mocks... ")
    }
}
