//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ISwappingERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    function transfer(address dst, uint wad) external returns (bool);
    function approve(address spender, uint256 amount) external returns(bool);
    
    function decimals() external view returns(uint digits);
    function balanceOf(address user) external view returns(uint);
}