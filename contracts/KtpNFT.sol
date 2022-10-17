// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./abstractcontracts/ERC721.sol";
import "./abstractcontracts/Authorize.sol";

contract KtpNFT is ERC721, Authorize {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Kartu Tanda Penduduk", "KTP") {
        UsersAddress[msg.sender].isValid = true;
        UsersAddress[msg.sender].role = 1;
    }

    function safeMint(address to, string memory uri) public AdministratorOnly{
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
