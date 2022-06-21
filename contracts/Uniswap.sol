//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../interfaces/ISwappingRouter.sol";
import "../interfaces/ISwappingERC20.sol";

contract Uniswap {
    ISwappingRouter public routerFactory;
    ISwappingERC20 public DAI;
    ISwappingERC20 public WETH;
    ISwappingERC20 public USDT;

    constructor(
        address _routerfactory,
        address _DAIAddress,
        address _WETHAddress,
        address _USDTAddress
    ) {
        routerFactory = ISwappingRouter(_routerfactory);
        DAI = ISwappingERC20(_DAIAddress);
        WETH = ISwappingERC20(_WETHAddress);
        USDT = ISwappingERC20(_USDTAddress);
    }

    function getAmountIn(uint256 amountOutMin)
        public
        view
        returns (uint256[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = address(DAI);
        path[1] = routerFactory.WETH();

        uint256[] memory amountIn = routerFactory.getAmountsIn(
            amountOutMin,
            path
        );

        return amountIn;
    }

    function SwapTokentoETH(uint256 MinAmountOfToken)
        public
        returns (uint256[] memory)
    {
        uint256 amountOutMin = MinAmountOfToken;
        uint256[] memory amountInArray = getAmountIn(amountOutMin);
        uint256 amountIn = amountInArray[0];

        require(
            DAI.transferFrom(msg.sender, address(this), amountIn),
            "transferFrom failed."
        );

        require(
            DAI.approve(address(routerFactory), amountIn),
            "approve failed."
        );

        address[] memory path = new address[](2);
        path[0] = address(DAI);
        path[1] = routerFactory.WETH();

        uint256[] memory amounts = routerFactory.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );

        return amounts;
    }

    function SwapTokentoToken(uint256 MinAmountOfToken)
        public
        returns (uint256[] memory)
    {
        uint256 amountOutMin = MinAmountOfToken;
        uint256[] memory amountInArray = getAmountIn(amountOutMin);
        uint256 amountIn = amountInArray[0];

        require(
            DAI.transferFrom(msg.sender, address(this), amountIn),
            "transferFrom failed."
        );

        require(
            DAI.approve(address(routerFactory), amountIn),
            "approve failed."
        );

        address[] memory path = new address[](2);
        path[0] = address(DAI);
        path[1] = routerFactory.WETH();

        uint256[] memory amounts = routerFactory.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );

        return amounts;
    }

    function getETHToSwap(uint256 amountOutMin)
        public
        view
        returns (uint256[] memory amount)
    {
        address[] memory path = new address[](2);
        path[0] = routerFactory.WETH();
        path[1] = address(USDT);

        uint256[] memory amountIn = routerFactory.getAmountsIn(
            amountOutMin,
            path
        );

        return amountIn;
    }

    function SwapETHtoToken(uint256 MinAmountOfToken)
        public
        payable
        returns (uint256[] memory)
    {
        uint256 amountOutMin = MinAmountOfToken;

        address[] memory path = new address[](2);
        path[0] = routerFactory.WETH();
        path[1] = address(USDT);

        uint256[] memory amounts = routerFactory.swapExactETHForTokens{ value : msg.value }(
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );

        return amounts;
    }
}
