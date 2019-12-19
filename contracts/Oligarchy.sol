pragma solidity ^0.5.0;

import './token/ERC20/ERC20.sol';
import './ownership/Ownable.sol';

contract Oligarchy is Ownable {
  mapping(uint8 => address) public oligarchs;
  mapping(uint8 => uint256) public oligarchBidAmounts;

  address public oligarchyProfiteer;
  address public oligarchyBidToken;

  function setOligarchyProfiteer(address _oligarchyProfiteer) onlyOwner() public {
    oligarchyProfiteer = _oligarchyProfiteer;
  }

  function setOligarchyBidToken(address _oligarchyBidToken) onlyOwner() public {
    oligarchyBidToken = _oligarchyBidToken;
  }

  function getOligarchThisBlock() public view returns(address oligarch) {
    return oligarchs[uint8(block.number % 256)];
  }

  function getOligarchIsLocked(uint8 oligarchId) public view returns(bool isOligarchLocked) {
    if (oligarchId < block.number % 256) {
      return false;
    }
    if (oligarchId >= (block.number + 32) % 256) {
      return false;
    }
    return true;
  }

  function overthrowOligarch(uint8 oligarchId, uint256 bidAmount) public {
    require(!getOligarchIsLocked(oligarchId));

    address prevOligarch = oligarchs[oligarchId];
    uint256 prevBidAmount = oligarchBidAmounts[oligarchId];

    require(bidAmount > prevBidAmount);

    require(ERC20(oligarchyBidToken).transferFrom(msg.sender, oligarchyProfiteer, bidAmount - prevBidAmount));

    if (prevBidAmount > 0) {
      require(ERC20(oligarchyBidToken).transferFrom(msg.sender, prevOligarch, prevBidAmount));
    }

    oligarchs[oligarchId] = msg.sender;
    oligarchBidAmounts[oligarchId] = bidAmount;
  }

  modifier onlyBlockOligarch() {
    require(msg.sender == getOligarchThisBlock());
    _;
  }

}
