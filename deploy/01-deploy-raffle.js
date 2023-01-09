const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async function (getNamedAccounts, deployments) {
    const { deploy, log } = deployments
    const { deployer } = getNamedAccounts()
    let vrfCoordinatorV2Address

    if (developmentChains.includes(network.name)) {
        const VRFCoordinatorV2Mock = await ethers.getContractAt("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address
    }

    const args = []
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}
