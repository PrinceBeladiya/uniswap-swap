//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ISwapping {
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    function transfer(address dst, uint wad) external returns (bool);
    function approve(address spender, uint256 amount) external returns(bool);

    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);

    function getAmountsIn(uint amountOut, address[] memory path) external view returns (uint[] memory amounts);
    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);

    function decimals() external view returns(uint digits);
    function WETH() external view returns(address);
    function balanceOf(address user) external view returns(uint);
}