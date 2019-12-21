pragma solidity ^0.5.0;

import './token/ERC20/ERC20.sol';
import './ownership/Ownable.sol';
import './Oligarchy.sol';


contract Alchemilla is Ownable, Oligarchy {

  mapping(address => mapping(address => uint256)) public balances;
  mapping(bytes32 => bool) public isAnchorExecuted;

  /* TODO: events? */

  struct Order {
    uint8   orderType;
    address originator;
    uint256 priceNumer;
    uint256 priceDenom;
    uint256 tokenLimit;
    uint256 tokenFilled;
  }

  function execute(
    bytes32   prevBlockHash,

    uint8     ordersLastIndex,
    uint8     exchangesLastIndex,

    uint8[]   memory orderUint8s,
    uint256[] memory orderUint256s,
    bytes32[] memory orderBytes32s,

    uint8[]   memory exchangeUint8s,
    uint256[] memory exchangeUint256s,

    address quotToken,
    address variToken
  ) public {

    require(
      prevBlockHash == blockhash(block.number - 1),
      "Blockhash"
    );

    /*TODO: Execute anchors only once */

    bytes32 anchor = keccak256(abi.encodePacked(
      prevBlockHash, quotToken, variToken
    ));

    require(
      !isAnchorExecuted[anchor],
      "Anchor already executed"
    );

    isAnchorExecuted[anchor] = true;

    /*TODO: create execute2, execute4, ... execute256 with different memory sizes */
    Order[256] memory orders;

    bytes32 orderPriority;

    for (uint256 orderIndex = 0; orderIndex <= ordersLastIndex; orderIndex++) {

      uint256 orderIndexTimes2 = orderIndex * 2;
      uint256 orderIndexTimes3 = orderIndex * 3;

      Order memory order = orders[orderIndex];

      order.orderType  = orderUint8s[orderIndexTimes2];
      order.priceNumer = orderUint256s[orderIndexTimes3];
      order.priceDenom = orderUint256s[orderIndexTimes3 + 1];
      order.tokenLimit = orderUint256s[orderIndexTimes3 + 2];

      order.originator = ecrecover(
        keccak256(abi.encodePacked(
          anchor,
          order.orderType,
          order.priceNumer,
          order.priceDenom,
          order.tokenLimit
        )),
        /*signatureV*/ orderUint8s[orderIndexTimes2 + 1],
        /*signatureR*/ orderBytes32s[orderIndexTimes2],
        /*signatureS*/ orderBytes32s[orderIndexTimes2 + 1]
      );

      bytes32 _orderPriority = keccak256(abi.encodePacked(
        /*signatureV*/ orderUint8s[orderIndexTimes2 + 1],
        /*signatureR*/ orderBytes32s[orderIndexTimes2],
        /*signatureS*/ orderBytes32s[orderIndexTimes2 + 1]
      ));

      require(
        orderPriority != _orderPriority,
        "Order Priority"
      );

      /* orderPriority = _orderPriority; */

    }

    address _quotToken = quotToken;
    address _variToken = variToken;

    for (uint256 exchangeIndex = 0; exchangeIndex <= exchangesLastIndex; exchangeIndex++) {
      uint256 exchangeUint8Index   = exchangeIndex * 2;
      uint256 exchangeUint256Index = exchangeIndex * 3;

      Order memory buyyOrder = orders[exchangeUint8s[exchangeUint8Index]];
      Order memory sellOrder = orders[exchangeUint8s[exchangeUint8Index + 1]];

      require(buyyOrder.orderType == 0, "buyyOrderType");
      require(sellOrder.orderType == 1, "sellOrderType");

      uint256 quotTokenTrans = exchangeUint256s[exchangeUint256Index];
      uint256 variTokenTrans = exchangeUint256s[exchangeUint256Index + 1];
      uint256 quotTokenArbit = exchangeUint256s[exchangeUint256Index + 2];

      uint256 quotTokenTotal = quotTokenTrans + quotTokenArbit;


      /* Check buy price is lte than or equal to total price */
      require(
        (buyyOrder.priceNumer * variTokenTrans) <= (buyyOrder.priceDenom * quotTokenTotal),
        "buy price is lte than or equal to total price"
      );

      /* Check sell price is gte than or equal to trans price */
      require(
        (sellOrder.priceNumer * variTokenTrans) >= (sellOrder.priceDenom * quotTokenTrans),
        "sell price is gte than or equal to trans price"
      );

      /* Check quot token fillability */
      /* TODO: Determine if balance check is necessary */
      require(
        quotTokenTotal + buyyOrder.tokenFilled <= buyyOrder.tokenLimit,
        "quot token fillability"
      );

      /* Check vari token fillability */
      /* TODO: Determine if balance check is necessary */
      require(
        variTokenTrans + sellOrder.tokenFilled <= sellOrder.tokenLimit,
        "vari token fillability"
      );

      /* Transfer quot token trans from buyer to seller; Transfer quot token arbit from buyer to oligarch*/
      balances[buyyOrder.originator][_quotToken] -= quotTokenTotal;
      balances[sellOrder.originator][_quotToken] += quotTokenTrans;
      /* TODO: Transfer to msg.sender or arbit */
      balances[msg.sender          ][_quotToken] += quotTokenArbit;

      /* Transfer vari token trans from buyer to seller */
      balances[sellOrder.originator][_variToken] -= variTokenTrans;
      balances[buyyOrder.originator][_variToken] += variTokenTrans;

      /* Update token filled */
      buyyOrder.tokenFilled += quotTokenTotal;
      sellOrder.tokenFilled += variTokenTrans;
    }
  }

  function deposit(
    address to,
    address token,
    uint256 amount
  ) public {
    require(ERC20(token).transferFrom(msg.sender, address(this), amount));
    balances[to][token] += amount;
  }

  function withdraw(
    address to,
    address token,
    uint256 amount
  ) public {
    require(ERC20(token).transferFrom(address(this), to, amount));
    balances[msg.sender][token] -= amount;
  }

}
