// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
interface IERC721{

    function tokenURI(uint256 tokenId) external  view returns (string memory);
    function balanceOf(address owner)  external  view returns (uint256 balance);
    function ownerOf(uint256 tokenId)  external view returns (address owner);
}
