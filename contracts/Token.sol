pragma solidity ^0.5.0;

import './token/ERC20/ERC20.sol';

contract Token is ERC20 {
  constructor(uint256 totalSupply) public {
    _mint(msg.sender, totalSupply);
  }
}
