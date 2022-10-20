// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./contract_abstracts/Authorize.sol";

contract KtpNFT is ERC721, ERC721URIStorage, Authorize {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("KtpNFT", "KTP") {}

    function safeMint(address to, string memory uri) public AdministratorOnly {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }  

    // Add access modifier to certain functions

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        AdministratorOnly
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function balanceOf(address owner) public view virtual override AdministratorOnly returns (uint256) {
        return super.balanceOf(owner);
    }

    function ownerOf(uint256 tokenId) public view virtual override AdministratorOnly returns (address) {
        return super.ownerOf(tokenId);
    }

    // Disable certain functions

    function _burn(uint256 tokenId) internal pure override(ERC721, ERC721URIStorage) {
        revert("This Function is Disabled");
    }
    

    function approve(address to, uint256 tokenId) public virtual override{
        revert("This Function is Disabled");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("This Function is Disabled");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        revert("This Function is Disabled");
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        revert("This Function is Disabled");
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("This Function is Disabled");
    }

    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        revert("This Function is Disabled");
    }

    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        revert("This Function is Disabled");
    }
}

