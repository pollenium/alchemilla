pragma solidity ^0.5.0;

contract WithdrawNotificationHandlerInterface {
  function handleWithdrawNotification(address from, address token, uint256 amount) public;
}
