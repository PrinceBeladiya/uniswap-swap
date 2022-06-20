//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../interfaces/ISwapping.sol";
import "hardhat/console.sol";

contract Uniswap {
    ISwapping public routerFactory;
    ISwapping public daiFactory;
    ISwapping public wethFactory;

    constructor(
        address _routerfactory,
        address _daiFactory,
        address _wethFactory
    ) {
        routerFactory = ISwapping(_routerfactory);
        daiFactory = ISwapping(_daiFactory);
        wethFactory = ISwapping(_wethFactory);
    }

    function getAmountIn(uint256 amountOutMin)
        public
        view
        returns (uint256[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = address(daiFactory);
        path[1] = routerFactory.WETH();

        uint256[] memory amountIn = routerFactory.getAmountsIn(
            amountOutMin,
            path
        );

        return amountIn;
    }

    function SwapTokentoETH(uint256 MinAmountOfToken)
        public
        payable
        returns (uint256[] memory)
    {
        uint256 amountOutMin = MinAmountOfToken;
        uint256[] memory amountInArray = getAmountIn(amountOutMin);
        uint256 amountIn = amountInArray[0];

        require(
            daiFactory.transferFrom(msg.sender, address(this), amountIn),
            "transferFrom failed."
        );

        require(
            daiFactory.approve(address(routerFactory), amountIn),
            "approve failed."
        );

        address[] memory path = new address[](2);
        path[0] = address(daiFactory);
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
        payable
        returns (uint256[] memory)
    {
        uint256 amountOutMin = MinAmountOfToken;
        uint256[] memory amountInArray = getAmountIn(amountOutMin);
        uint256 amountIn = amountInArray[0];

        require(
            daiFactory.transferFrom(msg.sender, address(this), amountIn),
            "transferFrom failed."
        );

        require(
            daiFactory.approve(address(routerFactory), amountIn),
            "approve failed."
        );

        address[] memory path = new address[](2);
        path[0] = address(daiFactory);
        path[1] = routerFactory.WETH();

    console.log("msg.sender -> ", msg.sender);
        uint256[] memory amounts = routerFactory.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );

        return amounts;
    }
}
