pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import './token/ERC20/ERC20.sol';
import './ownership/Ownable.sol';
import './ExecutorOracle.interface.sol';


contract Alchemilla is Ownable {

  address public executorOracle;
  mapping(address => mapping(address => uint256)) public balances;
  mapping(bytes32 => bool) public isAnchorExecuted;

  function setExecutorOracle(address _executorOracle) public onlyOwner() {
    executorOracle = _executorOracle;
  }

  modifier onlyExecutorHot() {
    /* require(
      msg.sender == ExecutorOracleInterface(executorOracle).hot(),
      'Only Executor Hot'
    ); */
    _;
  }

  /* TODO: events? */

  struct Order {
    uint8   orderType;
    address originator;
    uint256 priceNumer;
    uint256 priceDenom;
    uint256 tokenLimit;
    uint256 tokenFilled;
    uint8   signatureV;
    bytes32 signatureR;
    bytes32 signatureS;
  }

  struct Exchange {
    uint8   buyyOrderIndex;
    uint8   sellOrderIndex;
    uint256 quotTokenTrans;
    uint256 variTokenTrans;
    uint256 quotTokenArbit;
  }


  function execute(
    bytes32     prevBlockHash,
    address     quotToken,
    address     variToken,
    Order[]     memory orders,
    Exchange[]  memory exchanges
  ) public onlyExecutorHot() {

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

    bytes32 orderPriority;
    bytes32 _orderPriority;
    Order memory order;

    for (uint256 orderIndex = 0; orderIndex < orders.length; orderIndex++) {

      order = orders[orderIndex];

      require(order.originator == ecrecover(
        keccak256(abi.encodePacked(
          anchor,
          order.orderType,
          order.priceNumer,
          order.priceDenom,
          order.tokenLimit
        )),
        order.signatureV,
        order.signatureR,
        order.signatureS
      ), 'originator');

      _orderPriority = keccak256(abi.encodePacked(
        order.signatureV,
        order.signatureR,
        order.signatureS
      ));

      require(
        orderPriority != _orderPriority,
        "Order Priority"
      );

      /* orderPriority = _orderPriority; */

    }

    Exchange memory exchange;
    Order memory buyyOrder;
    Order memory sellOrder;
    uint256 quotTokenTotal;

    for (uint256 exchangeIndex = 0; exchangeIndex < exchanges.length; exchangeIndex++) {

      exchange = exchanges[exchangeIndex];
      buyyOrder = orders[exchange.buyyOrderIndex];
      sellOrder = orders[exchange.sellOrderIndex];

      require(buyyOrder.orderType == 0, "buyyOrderType");
      require(sellOrder.orderType == 1, "sellOrderType");

      quotTokenTotal = exchange.quotTokenTrans + exchange.quotTokenArbit;


      /* Check buy price is lte than or equal to total price */
      require(
        (buyyOrder.priceNumer * exchange.variTokenTrans) <= (buyyOrder.priceDenom * quotTokenTotal),
        "buy price is lte than or equal to total price"
      );

      /* Check sell price is gte than or equal to trans price */
      require(
        (sellOrder.priceNumer * exchange.variTokenTrans) >= (sellOrder.priceDenom * exchange.quotTokenTrans),
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
        exchange.variTokenTrans + sellOrder.tokenFilled <= sellOrder.tokenLimit,
        "vari token fillability"
      );

      /* Transfer quot token trans from buyer to seller; Transfer quot token arbit from buyer to executor cold*/
      balances[buyyOrder.originator][quotToken] -= quotTokenTotal;
      balances[sellOrder.originator][quotToken] += exchange.quotTokenTrans;
      /* TODO: Transfer to msg.sender or executorCold */
      balances[msg.sender][quotToken] += exchange.quotTokenArbit;

      /* Transfer vari token trans from buyer to seller */
      balances[sellOrder.originator][variToken] -= exchange.variTokenTrans;
      balances[buyyOrder.originator][variToken] += exchange.variTokenTrans;

      /* Update token filled */
      buyyOrder.tokenFilled += quotTokenTotal;
      sellOrder.tokenFilled += exchange.variTokenTrans;
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
