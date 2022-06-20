const { ethers } = require("ethers");
const { expect } = require("chai");

const DAIABI = [{ "inputs": [{ "internalType": "uint256", "name": "chainId_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": true, "inputs": [{ "indexed": true, "internalType": "bytes4", "name": "sig", "type": "bytes4" }, { "indexed": true, "internalType": "address", "name": "usr", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "arg1", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "arg2", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "deny", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "move", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "allowed", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "pull", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "push", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "rely", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "wards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
const WETHABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];

const signerAddress = "0x5D38B4e4783E34e2301A2a36c39a03c45798C4dD";
const Router02ContractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const DaiContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETHContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

describe("basic testing", () => {
    let uniswap;
    let signer;
    let provider;
    let DAIContract;
    let WETHContract;

    beforeEach(async () => {
        
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

        signer = await hre.ethers.provider.getSigner(signerAddress);

        const Uniswap = await hre.ethers.getContractFactory("Uniswap");
        uniswap = await Uniswap.deploy(Router02ContractAddress, DaiContractAddress, WETHContractAddress);

        DAIContract = await hre.ethers.getContractAt(DAIABI, DaiContractAddress, signer);
        WETHContract = await hre.ethers.getContractAt(WETHABI, WETHContractAddress, signer);

    });

    it("is the deploy contract successfully and address of router factory and dai factory and WETH factory is set", async () => {

        const DAIAddress = await uniswap.connect(signer).daiFactory();
        const RouterAddress = await uniswap.connect(signer).routerFactory();
        const WETHAddress = await uniswap.connect(signer).wethFactory();

        expect(DAIAddress).to.equals(DaiContractAddress);
        expect(RouterAddress).to.equals(RouterAddress);
        expect(WETHAddress).to.equals(WETHContractAddress);

    });

    it("is getAmountIn working correctly", async () => {
        
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [signerAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            signerAddress,
            "0x10000000000000000000",
        ]);

        const NeededTokens = (ethers.utils.parseEther("1.0"));
        const amountIn = await uniswap.functions.getAmountIn(NeededTokens);

        expect(Number(amountIn[0][1])).to.greaterThan(0);
        expect(Number(amountIn[0][1])).to.equals(Number(NeededTokens));

    });

    it("is swapping from Token to ETH working properly", async () => {
        
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [signerAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            signerAddress,
            "0x10000000000000000000",
        ]);

        const NeededTokens = (ethers.utils.parseEther("1.0"));
        const amountIn = await uniswap.functions.getAmountIn(NeededTokens);

        await DAIContract.functions.approve(uniswap.address, amountIn[0][0]);

        const beforeSwapBalance = await provider.getBalance(signerAddress);
        const beforeSwapDaiBalance = await DAIContract.balanceOf(signerAddress);

        await uniswap.connect(signer).SwapTokentoETH(NeededTokens, { gasLimit: 500000 });

        const afterSwapBalance = await provider.getBalance(signerAddress);
        const afterSwapDaiBalance = await DAIContract.balanceOf(signerAddress);

        const differenceOfDaiAfterSwap = Number(beforeSwapDaiBalance) - Number(afterSwapDaiBalance); 
        expect(Number(afterSwapBalance)).to.greaterThan(Number(beforeSwapBalance));
        expect(Number(amountIn[0][0]) * 10 ** 18 - differenceOfDaiAfterSwap).to.equals(Number(amountIn[0][0]) * 10 ** 18);

    });

    it("is swapping from Token to Token working properly", async () => {

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [signerAddress],
        });

        await network.provider.send("hardhat_setBalance", [
            signerAddress,
            "0x10000000000000000000",
        ]);

        const NeededTokens = (ethers.utils.parseEther("10.0"));
        const amountIn = await uniswap.functions.getAmountIn(NeededTokens);

        await DAIContract.functions.approve(uniswap.address, amountIn[0][0]);

        const beforeSwapDaiBalance = await DAIContract.balanceOf(signerAddress);
        const beforeSwapWETHBalance = await WETHContract.balanceOf(signerAddress);
        
        await uniswap.connect(signer).SwapTokentoToken(NeededTokens, { gasLimit: 500000 });
        
        const afterSwapDaiBalance = await DAIContract.balanceOf(signerAddress);
        const afterSwapWETHBalance = await WETHContract.balanceOf(signerAddress);

        const differenceOfDaiAfterSwap = Number(beforeSwapDaiBalance) - Number(afterSwapDaiBalance); 
        expect(Number(afterSwapWETHBalance)).to.equals((Number(beforeSwapWETHBalance) + (10 * (10 **18))));
        expect(Number(amountIn[0][0]) * 10 ** 18 - differenceOfDaiAfterSwap).to.equals(Number(amountIn[0][0]) * 10 ** 18);

    });

});