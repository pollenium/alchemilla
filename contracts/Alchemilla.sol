pragma solidity ^0.5.0;

import './token/ERC20/ERC20.sol';
import './ownership/Ownable.sol';
import './Oligarchy.sol';


contract Alchemilla is Ownable, Oligarchy {

  mapping(address => mapping(address => uint256)) public balances;
  mapping(bytes32 => uint256) public tokenFills;

  event Deposit(
    address indexed token,
    address indexed sender,
    address indexed receiver,
    uint256 amount
  );

  event Withdrawl(
    address indexed token,
    address indexed sender,
    address indexed receiver,
    uint256 amount
  );

  function execute(
    address[ 4] memory addressVars,
      /*
       0: quotToken,
       1: variToken,
       2: buyyOrderOriginator,
       3: sellOrderOriginator
      */
    uint256[13] memory uint256Vars,
    /*
       0: quotTokenTrans,
       1: variTokenTrans,
       2: quotTokenArbit,
       3: buyyOrderTokenLimit,
       4: buyyOrderPriceNumer,
       5: buyyOrderPriceDenom,
       6: buyyOrderExpiration,
       7: buyyOrderSalt,
       8: sellOrderTokenLimit,
       9: sellOrderPriceNumer,
      10: sellOrderPriceDenom,
      11: sellOrderExpiration
      12: sellOrderSalt
    */
    uint8[ 2] memory uint008Vars,
    /*
       0: buyyTokenSignatureV,
       1: sellTokenSignatureV
    */
    bytes32[ 4] memory bytes32Vars
    /*
       0: buyyOrderSignatureR,
       1: buyyOrderSignatureS,
       2: sellOrderSignatureR
       3: sellOrderSignatureS
    */
  ) public onlyBlockOligarch() {

    bytes32 buyyOrderHash = keccak256(abi.encodePacked(
      addressVars[ 0] /*quotToken*/,
      addressVars[ 1] /*variToken*/,
      uint256Vars[ 3] /*buyyOrderTokenLimit*/,
      uint256Vars[ 4] /*buyyOrderPriceNumer*/,
      uint256Vars[ 5] /*buyyOrderPriceDenom*/,
      uint256Vars[ 6] /*buyyOrderExpiration*/,
      uint256Vars[ 7] /*buyyOrderSalt*/
    ));

    bytes32 sellOrderHash = keccak256(abi.encodePacked(
      addressVars[ 0] /*quotToken*/,
      addressVars[ 1] /*variToken*/,
      uint256Vars[ 8] /*sellOrderTokenLimit*/,
      uint256Vars[ 9] /*sellOrderPriceNumer*/,
      uint256Vars[10] /*sellOrderPriceDenom*/,
      uint256Vars[11] /*sellOrderExpiration*/,
      uint256Vars[12] /*sellOrderSalt*/
    ));

    /* Check signatures */
    require(
      addressVars[ 2] /*buyyOrderOriginator*/ == ecrecover(
        buyyOrderHash,
        uint008Vars[ 0] /*buyyTokenSignatureV*/,
        bytes32Vars[ 0] /*buyyOrderSignatureR*/,
        bytes32Vars[ 1] /*buyyOrderSignatureS*/
      )
    );

    require(
      addressVars[ 3] /*sellOrderOriginator*/ == ecrecover(
        sellOrderHash,
        uint008Vars[ 1] /*sellTokenSignatureV*/,
        bytes32Vars[ 2] /*sellOrderSignatureR*/,
        bytes32Vars[ 3] /*sellOrderSignatureS*/
      )
    );

    /* Check expirations */
    require(uint256Vars[ 6] /*buyyOrderExpiration*/ > now);
    require(uint256Vars[11] /*sellOrderExpiration*/ > now);

    uint256 quotTokenTotal =
      uint256Vars[ 0] /*quotTokenTrans*/
      +
      uint256Vars[ 2] /*quotTokenArbit*/;

    /* Check buy price is lte than or equal to total price */
    require(
      (
        uint256Vars[ 4] /*buyyOrderPriceNumer*/
        *
        quotTokenTotal
      )
      <=
      (
        uint256Vars[ 5] /*buyyOrderPriceDenom*/
        *
        uint256Vars[ 1] /*variTokenTrans*/
      )
    );

    /* Check sell price is gte than or equal to trans price */
    require(
      (
        uint256Vars[ 9] /*sellOrderPriceNumer*/
        *
        uint256Vars[ 0] /*quotTokenTrans*/
      )
      >=
      (
        uint256Vars[10] /*sellOrderPriceDenom*/
        *
        uint256Vars[ 1] /*variTokenTrans*/
      )
    );


    /* Check quot token fillability */
    /* TODO: Determine if balance check is necessary */
    require(
      quotTokenTotal
      + tokenFills[buyyOrderHash]
      <=
      uint256Vars[ 3] /*buyyOrderTokenLimit*/
    );

    /* Check vari token fillability */
    /* TODO: Determine if balance check is necessary */
    require(
      uint256Vars[ 1] /*variTokenTrans*/
      +
      tokenFills[sellOrderHash]
      <=
      uint256Vars[ 8] /*sellOrderTokenLimit*/
    );

    /* Transfer quot token from buyer to seller and arbitrager */
    balances[addressVars[ 2] /*buyyOrderOriginator*/][addressVars[ 0] /*quotToken*/] -= quotTokenTotal;
    balances[addressVars[ 3] /*sellOrderOriginator*/][addressVars[ 0] /*quotToken*/] += uint256Vars[ 0] /*quotTokenTrans*/;
    balances[addressVars[ 3] /*sellOrderOriginator*/][addressVars[ 0] /*quotToken*/] += uint256Vars[ 2] /*quotTokenArbit*/;

    /* Transfer vari token from buyer to seller */
    balances[addressVars[ 3] /*sellOrderOriginator*/][addressVars[ 1] /*variToken*/] -= uint256Vars[ 0] /*quotTokenTrans*/;
    balances[addressVars[ 2] /*buyyOrderOriginator*/][addressVars[ 1] /*variToken*/] += uint256Vars[ 1] /*variTokenTrans*/;

    /* Transfer quot token from buyer to seller */
    balances[addressVars[ 3] /*sellOrderOriginator*/][addressVars[ 1] /*variToken*/] -= uint256Vars[ 1] /*variTokenTrans*/;
  }

  function deposit(
    address tokenAddress,
    address recipient,
    uint256 amount
  ) public {
    require(ERC20(tokenAddress).transferFrom(msg.sender, address(this), amount));
    balances[tokenAddress][recipient] += amount;
    emit Deposit(tokenAddress, msg.sender, recipient, amount);
  }

  function withdraw(
    address tokenAddress,
    address recipient,
    uint256 amount
  ) public {
    require(ERC20(tokenAddress).transferFrom(address(this), recipient, amount));
    balances[tokenAddress][msg.sender] -= amount;
    emit Withdrawl(tokenAddress, msg.sender, recipient, amount);
  }

}
