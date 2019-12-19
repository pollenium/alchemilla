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

  struct Order {
    uint8   orderType;
    address originator;
    uint256 priceNumer;
    uint256 priceDenom;
    uint256 tokenLimit;
    uint256 tokenFilled;
  }

  function execute(
    bytes32 anchor,
    address[] memory tokens,
    uint8[]   counts,

    uint8[]   memory orderUint8s,
    uint256[] memory orderUint256s,
    bytes32[] memory orderBytes32s,

    uint8[]   memory exchangeUint8s,
    uint256[] memory exchangeUint256s

  ) public onlyBlockOligarch() {

    Order[256] memory orders;

    bytes32 tokensHash = keccak256(abi.encodePacked(
      tokens[0], tokens[1]
    ));

    for (uint256 orderIndex = 0; orderIndex < counts[0]; orderIndex++) {
      uint256 orderIndexTimes2 = orderIndex * 2;
      uint256 orderIndexTimes3 = orderIndex * 3;

      address originator = ecrecover(
        keccak256(abi.encodePacked(
          anchor,
          /*orderType*/  orderUint8s[orderIndexTimes2],
          /*quotToken*/  tokensHash,
          /*priceNumer*/ orderUint256s[orderIndexTimes3],
          /*priceDenom*/ orderUint256s[orderIndexTimes3 + 1],
          /*tokenLimit*/ orderUint256s[orderIndexTimes3 + 2]
        )),
        /*signatureV*/ orderUint8s[orderIndexTimes2 + 1],
        /*signatureR*/ orderBytes32s[orderIndexTimes2],
        /*signatureS*/ orderBytes32s[orderIndexTimes2 + 1]
      );

      orders[orderIndex] = Order(
        /*orderType*/ orderUint8s[orderIndexTimes2],
        originator,
        /*priceNumer*/ orderUint256s[orderIndexTimes3],
        /*priceDenom*/ orderUint256s[orderIndexTimes3 + 1],
        /*tokenLimit*/ orderUint256s[orderIndexTimes3 + 2],
        0
      );

    }

    for (uint256 exchangeIndex = 0; exchangeIndex < counts[1]; exchangeIndex++) {
      uint256 exchangeUint8Index   = exchangeIndex * 5;
      uint256 exchangeUint256Index = exchangeIndex * 5;

      Order memory buyyOrder = orders[exchangeUint8s[exchangeUint8Index]];
      Order memory sellOrder = orders[exchangeUint8s[exchangeUint8Index + 1]];

      require(buyyOrder.orderType == 0);
      require(sellOrder.orderType == 1);

      uint256 quotTokenTrans = exchangeUint256s[exchangeUint256Index];
      uint256 variTokenTrans = exchangeUint256s[exchangeUint256Index + 1];
      uint256 quotTokenArbit = exchangeUint256s[exchangeUint256Index + 2];

      uint256 quotTokenTotal = quotTokenTrans + quotTokenArbit;


      /* Check buy price is lte than or equal to total price */
      require(
        (buyyOrder.priceNumer * quotTokenTotal) <= (buyyOrder.priceDenom * variTokenTrans)
      );

      /* Check sell price is gte than or equal to trans price */
      require(
        (sellOrder.priceNumer * quotTokenTrans) >= (sellOrder.priceDenom * variTokenTrans)
      );

      /* Check quot token fillability */
      /* TODO: Determine if balance check is necessary */
      require(
        quotTokenTotal + buyyOrder.tokenFilled <= buyyOrder.tokenLimit
      );

      /* Check vari token fillability */
      /* TODO: Determine if balance check is necessary */
      require(
        variTokenTrans + sellOrder.tokenFilled <= sellOrder.tokenLimit
      );

      /* Transfer quot token trans from buyer to seller; Transfer quot token arbit from buyer to oligarch*/
      balances[buyyOrder.originator][tokens[0]] -= quotTokenTotal;
      balances[sellOrder.originator][tokens[0]] += quotTokenTrans;
      balances[msg.sender          ][tokens[0]] += quotTokenArbit;

      /* Transfer vari token trans from buyer to seller */
      balances[sellOrder.originator][tokens[1]] -= quotTokenTrans;
      balances[buyyOrder.originator][tokens[1]] += variTokenTrans;

    }
  }


  function executeOld(
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
