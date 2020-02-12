pragma solidity ^0.5.0;

import './openzeppelin/ownership/Ownable.sol';
import './ExecutorOracle.interface.sol';

contract MonarchicExecutorOracle is ExecutorOracleInterface, Ownable {

  function setHot(address _hot) public onlyOwner() {
    hot = _hot;
  }

  function setCold(address _cold) public onlyOwner() {
    cold = _cold;
  }
}
