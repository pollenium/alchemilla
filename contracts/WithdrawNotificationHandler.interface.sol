pragma solidity ^0.5.0;

contract WithdrawNotificationHandlerInterface {
  function handleWithdrawNotification(address from, address to, uint256 amount) public;
}
