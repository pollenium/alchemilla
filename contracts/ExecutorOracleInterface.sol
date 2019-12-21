pragma solidity ^0.5.0;

contract ExecutorOracleInterface {
  function executorSigner() public returns(address);
  function executorCoinbase() public returns(address);
}
