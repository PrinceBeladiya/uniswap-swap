const { ethers } = require("ethers");
const { expect } = require("chai");

describe("basic testing", () => {
    let uniswap, DAIContract, WETHContract, USDTContract;
    let signer;
    let provider;

    const DAIAbi = require("../ABIs/DAIAbi.json");
    const WETHAbi = require("../ABIs/WETHAbi.json");
    const USDTAbi = require("../ABIs/USDTAbi.json");

    const DAIHolderAddress = "0x5D38B4e4783E34e2301A2a36c39a03c45798C4dD";
    const Router02ContractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const DaiContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WETHContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const USDTContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    beforeEach(async () => {

        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

        signer = await hre.ethers.provider.getSigner(DAIHolderAddress);

        const Uniswap = await hre.ethers.getContractFactory("Uniswap");
        uniswap = await Uniswap.deploy(Router02ContractAddress, DaiContractAddress, WETHContractAddress, USDTContractAddress);

        DAIContract = await hre.ethers.getContractAt(DAIAbi, DaiContractAddress, signer);
        WETHContract = await hre.ethers.getContractAt(WETHAbi, WETHContractAddress, signer);
        USDTContract = await hre.ethers.getContractAt(USDTAbi, USDTContractAddress, signer);

    });

    it("should deploy correctly and run constructor", async () => {

        const DAIAddress = await uniswap.connect(signer).DAI();
        const RouterAddress = await uniswap.connect(signer).routerFactory();
        const WETHAddress = await uniswap.connect(signer).WETH();
        const USDTAddress = await uniswap.connect(signer).USDT();

        expect(DAIAddress).to.equals(DaiContractAddress);
        expect(RouterAddress).to.equals(RouterAddress);
        expect(WETHAddress).to.equals(WETHContractAddress);
        expect(USDTAddress).to.equals(USDTContractAddress);

    });

    it("should get amountIn", async () => {

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolderAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            DAIHolderAddress,
            "0x10000000000000000000",
        ]);

        const outputTokens = ethers.utils.parseEther("1.0");
        const amountIn = await uniswap.functions.getAmountIn(outputTokens);

        expect(Number(amountIn[0][1])).to.greaterThan(0);
        expect(Number(amountIn[0][1])).to.equals(Number(outputTokens));

    });

    it("should swap token for ETH", async () => {

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolderAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            DAIHolderAddress,
            "0x10000000000000000000",
        ]);

        const outputTokens = ethers.utils.parseEther("1.0");
        const amountIn = await uniswap.functions.getAmountIn(outputTokens);

        await DAIContract.functions.approve(uniswap.address, amountIn[0][0]);

        const beforeSwapBalance = await provider.getBalance(DAIHolderAddress);
        const beforeSwapDaiBalance = await DAIContract.balanceOf(DAIHolderAddress);

        await uniswap.connect(signer).SwapTokentoETH(outputTokens, { gasLimit: 500000 });

        const afterSwapBalance = await provider.getBalance(DAIHolderAddress);
        const afterSwapDaiBalance = await DAIContract.balanceOf(DAIHolderAddress);

        expect(Number(afterSwapBalance)).to.greaterThan(Number(beforeSwapBalance));
        expect(Number(ethers.utils.formatEther(afterSwapDaiBalance)) + Number(ethers.utils.formatEther(amountIn[0][0]))).to.equals(Number(ethers.utils.formatEther(beforeSwapDaiBalance)));

    });

    it("should swap Token for Token", async () => {

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolderAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            DAIHolderAddress,
            "0x10000000000000000000",
        ]);

        const outputTokens = ethers.utils.parseEther("10.0");
        const amountIn = await uniswap.functions.getAmountIn(outputTokens);

        await DAIContract.functions.approve(uniswap.address, amountIn[0][0]);

        const beforeSwapDaiBalance = await DAIContract.balanceOf(DAIHolderAddress);
        const beforeSwapWETHBalance = await WETHContract.balanceOf(DAIHolderAddress);

        await uniswap.connect(signer).SwapTokentoToken(outputTokens, { gasLimit: 500000 });

        const afterSwapDaiBalance = await DAIContract.balanceOf(DAIHolderAddress);
        const afterSwapWETHBalance = await WETHContract.balanceOf(DAIHolderAddress);

        expect(Number(afterSwapWETHBalance)).to.equals(Number(beforeSwapWETHBalance) + Number(ethers.utils.parseEther("10")));
        expect(Number(ethers.utils.formatEther(afterSwapDaiBalance)) + Number(ethers.utils.formatEther(amountIn[0][0]))).to.equals(Number(ethers.utils.formatEther(beforeSwapDaiBalance)));

    });

    it("should swap ETH for Token", async () => {

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolderAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            DAIHolderAddress,
            "0x10000000000000000000",
        ]);

        const outputTokens = (10) * 10 ** 6;
        const amountIn = await uniswap.connect(signer).getETHToSwap(outputTokens);

        const beforeSwapBalance = await provider.getBalance(DAIHolderAddress);
        const beforeSwapUSDTBalance = await USDTContract.balanceOf(DAIHolderAddress);
        
        await uniswap.connect(signer).SwapETHtoToken(outputTokens, { value : Number(amountIn[0]) , gasLimit: 500000 });
        
        const afterSwapBalance = await provider.getBalance(DAIHolderAddress);
        const afterSwapUSDTBalance = await USDTContract.balanceOf(DAIHolderAddress);

        expect(Number(afterSwapUSDTBalance)).to.equals(Number(beforeSwapUSDTBalance) + Number(10 * 10 ** 6));
        expect(Number(amountIn[0]) + Number(afterSwapBalance)).to.equals(Number(beforeSwapBalance));

    });

});