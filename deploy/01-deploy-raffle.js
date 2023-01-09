const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

const SUB_ID_FUND_AMOUNT = ethers.utils.parseEther("2")

module.exports = async function (getNamedAccounts, deployments) {
    const { deploy, log } = deployments
    const { deployer } = getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, subcriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContractAt("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const transactionResponse = await vrfCoordinatorV2Mock.createSubcription()
        const transactionReceipt = await transactionResponse.wait(1)
        subcriptionId = transactionReceipt.events[0].args.subId
        await vrfCoordinatorV2Mock.fundSubscription(subcriptionId, SUB_ID_FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subcriptionId = networkConfig[chainId]["subscriptionId"]
    }

    const entranceFee = networkConfig[chainId]["entranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const interval = networkConfig[chainId]["interval"]

    const args = [vrfCoordinatorV2Address, entranceFee, gasLane, subcriptionId, callbackGasLimit, interval]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}
