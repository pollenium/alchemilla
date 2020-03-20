pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import './openzeppelin/token/ERC20/ERC20.sol';
import './openzeppelin/ownership/Ownable.sol';
import './ExecutorOracle.interface.sol';
import './WithdrawNotificationHandler.interface.sol';

/*ToDo: Rename for clarity */
contract Engine is Ownable {

  address public executorOracle;
  mapping(address => mapping(address => uint256)) public balances;

  mapping(bytes32 => bool) public isHashUsed;

  bytes32 public orderSalt;
  bytes32 public depositSalt;
  bytes32 public withdrawSalt;
  bytes32 public withdrawAndNotifySalt;

  event BuyyFill(bytes32 indexed signatureHash, uint256 amount);
  event SellFill(bytes32 indexed signatureHash, uint256 amount);
  event Arbit(bytes32 indexed buyySignatureHash, bytes32 indexed sellSignatureHash, uint256 amount);

  constructor() public {
    orderSalt = genSalt(0x45448858f8ed69bb96ea3b54e5a7116ef90c0299d45fa999873b1aa5da32354e);
    depositSalt = genSalt(0x3a390be7d74e7491004044212317d5f713ae844ddbefe48b63984f6554743110);
    withdrawSalt = genSalt(0x7e2ebcfb1ca871cba79813ccecc9cd6e1d00ddc99b0be067304fd894bbbb70e2);
    withdrawAndNotifySalt = genSalt(0xd92b07381a16dcb4e94d1c35863c076e14ee3a830349326a830606d334b9a934);
  }


  function genSalt(bytes32 pepper) private view returns(bytes32) {
    return keccak256(abi.encodePacked([
      pepper,
      blockhash(block.number - 1),
      bytes20(address(this))
    ]));
  }

  function setExecutorOracle(address _executorOracle) public onlyOwner() {
    executorOracle = _executorOracle;
  }

  modifier onlyExecutorHot() {
    require(
      msg.sender == ExecutorOracleInterface(executorOracle).hot(),
      "pollenium/alchemilla/engine/invalid-executor-hot"
    );
    _;
  }

  /* TODO: events? */

  struct Order {
    address trader;
    address quotToken;
    address variToken;
    uint256 priceNumer;
    uint256 priceDenom;
    uint256 tokenLimit;
    uint8   signatureV;
    bytes32 signatureR;
    bytes32 signatureS;
    bytes32 signatureHash;
  }

  struct Exchange {
    uint16  buyyOrderIndex;
    uint16  sellOrderIndex;
    uint256 quotTokenTrans;
    uint256 variTokenTrans;
    uint256 quotTokenArbit;
  }

  function execute(
    uint256     target,
    Order[]     memory buyyOrders,
    Order[]     memory sellOrders,
    Exchange[]  memory exchanges
  ) public onlyExecutorHot() {

    require(
      target == block.number,
      "pollenium/alchemilla/engine/invalid-target"
    );

    bytes32 signatureHash;
    Order memory order;

    for (uint256 orderIndex = 0; orderIndex < buyyOrders.length; orderIndex++) {

      order = buyyOrders[orderIndex];

      require(order.trader == ecrecover(
        // sugmaHash
        keccak256(abi.encodePacked(
          orderSalt,
          target,
          byte(0x00),
          order.quotToken,
          order.variToken,
          order.priceNumer,
          order.priceDenom,
          order.tokenLimit
        )),
        order.signatureV,
        order.signatureR,
        order.signatureS
      ), "pollenium/alchemilla/engine/invalid-trader");

      require(order.signatureHash == keccak256(abi.encodePacked(
        order.signatureV,
        order.signatureR,
        order.signatureS
      )), "pollenium/alchemilla/engine/invalid-signatureHash");

      require(
        order.signatureHash > signatureHash,
        "pollenium/alchemilla/engine/invalid-signatureHash-order"
      );

      signatureHash = order.signatureHash;


    }

    delete signatureHash;

    for (uint256 orderIndex = 0; orderIndex < sellOrders.length; orderIndex++) {

      order = sellOrders[orderIndex];

      require(order.trader == ecrecover(
        // sugmaHash
        keccak256(abi.encodePacked(
          orderSalt,
          target,
          byte(0x01),
          order.quotToken,
          order.variToken,
          order.priceNumer,
          order.priceDenom,
          order.tokenLimit
        )),
        order.signatureV,
        order.signatureR,
        order.signatureS
      ), "pollenium/alchemilla/engine/invalid-trader");


      require(order.signatureHash == keccak256(abi.encodePacked(
        order.signatureV,
        order.signatureR,
        order.signatureS
      )), "pollenium/alchemilla/engine/invalid-signatureHash");

      require(
        order.signatureHash > signatureHash,
        "pollenium/alchemilla/engine/invalid-signatureHash-order"
      );

      signatureHash = order.signatureHash;

    }


    Exchange memory exchange;
    Order memory buyyOrder;
    Order memory sellOrder;
    uint256 quotTokenTotal;
    address quotToken;
    address variToken;
    address executorCold = ExecutorOracleInterface(executorOracle).cold();

    for (uint256 exchangeIndex = 0; exchangeIndex < exchanges.length; exchangeIndex++) {

      exchange = exchanges[exchangeIndex];
      buyyOrder = buyyOrders[exchange.buyyOrderIndex];
      sellOrder = sellOrders[exchange.sellOrderIndex];

      require(buyyOrder.quotToken == sellOrder.quotToken, "pollenium/alchemilla/engine/quot-token-mismatch");
      require(buyyOrder.variToken == sellOrder.variToken, "pollenium/alchemilla/engine/vari-token-mismatch");

      quotToken = buyyOrder.quotToken;
      variToken = buyyOrder.variToken;

      quotTokenTotal = exchange.quotTokenTrans + exchange.quotTokenArbit;


      /* Check buy price is lte than or equal to total price */
      require(
        (buyyOrder.priceNumer * exchange.variTokenTrans) <= (buyyOrder.priceDenom * quotTokenTotal),
        "pollenium/alchemilla/engine/buy-price-too-high"
      );

      /* Check sell price is gte than or equal to trans price */
      require(
        (sellOrder.priceNumer * exchange.variTokenTrans) >= (sellOrder.priceDenom * exchange.quotTokenTrans),
        "pollenium/alchemilla/engine/sell-price-too-low"
      );

      /* Check quot token fillability */
      /* TODO: Determine if balance check is necessary */
      require(
        quotTokenTotal <= buyyOrder.tokenLimit,
        "pollenium/alchemilla/engine/quot-token-limit-exceeded"
      );

      /* Check vari token fillability */
      /* TODO: Determine if balance check is necessary */
      require(
        exchange.variTokenTrans <= sellOrder.tokenLimit,
        "pollenium/alchemilla/engine/vari-token-limit-exceeded"
      );

      /* Transfer quot token trans from buyer to seller; Transfer quot token arbit from buyer to executor cold*/
      balances[buyyOrder.trader][quotToken] -= quotTokenTotal;
      balances[sellOrder.trader][quotToken] += exchange.quotTokenTrans;
      balances[executorCold][quotToken] += exchange.quotTokenArbit;

      /* Transfer vari token trans from buyer to seller */
      balances[sellOrder.trader][variToken] -= exchange.variTokenTrans;
      balances[buyyOrder.trader][variToken] += exchange.variTokenTrans;

      /* Update token limits */
      buyyOrder.tokenLimit -= quotTokenTotal;
      sellOrder.tokenLimit -= exchange.variTokenTrans;

      emit BuyyFill(buyyOrder.signatureHash, quotTokenTotal);
      emit SellFill(sellOrder.signatureHash, exchange.variTokenTrans);
      emit Arbit(buyyOrder.signatureHash, sellOrder.signatureHash, exchange.quotTokenArbit);
    }
  }

  function _deposit(
    address from,
    address to,
    address token,
    uint256 amount
  ) private {
    require(amount > 0, "pollenium/alchemilla/engine/deposit/zero-amount");
    balances[to][token] += amount;
    require(ERC20(token).transferFrom(from, address(this), amount));
  }

  function _withdraw(
    address from,
    address to,
    address token,
    uint256 amount
  ) private {
    require(amount > 0, "pollenium/alchemilla/engine/withdraw/zero-amount");
    require(balances[from][token] >= amount, "pollenium/alchemilla/engine/withdraw/insufficient-balance");
    balances[from][token] -= amount;
    require(ERC20(token).transfer(to, amount));
  }

  function _withdrawAndNotify(
    address from,
    address to,
    address token,
    uint256 amount
  ) private {
    _withdraw(from, to, token, amount);
    WithdrawNotificationHandlerInterface(to).handleWithdrawNotification(from, token, amount);
  }

  function depositViaNative(
    address to,
    address token,
    uint256 amount
  ) public {
    _deposit(msg.sender, to, token, amount);
  }

  function withdrawViaNative(
    address to,
    address token,
    uint256 amount
  ) public {
    _withdraw(msg.sender, to, token, amount);
  }

  function withdrawAndNotifyViaNative(
    address to,
    address token,
    uint256 amount
  ) public {
    _withdrawAndNotify(msg.sender, to, token, amount);
  }

  function _actionViaSignature(
    address to,
    address token,
    uint256 amount,
    uint256 expiration,
    bytes32 nonce,
    uint8   signatureV,
    bytes32 signatureR,
    bytes32 signatureS,
    bytes32 actionSalt
  ) private {
    require(now <= expiration, "pollenium/alchemilla/engine/actionViaSignature/expired");

    bytes32 hash = keccak256(abi.encodePacked([
      bytes20(to),
      bytes20(token),
      bytes32(amount),
      bytes32(expiration),
      nonce,
      actionSalt
    ]));

    require(!isHashUsed[hash], "pollenium/alchemilla/engine/actionViaSignature/hash-duplicate");
    isHashUsed[hash] = true;

    address from = ecrecover(hash, signatureV, signatureR, signatureS);

    if (actionSalt == depositSalt) {
      _deposit(from, to, token, amount);
    } else if (actionSalt == withdrawSalt) {
      _withdraw(from, to, token, amount);
    } else if (actionSalt == withdrawAndNotifySalt) {
      _withdrawAndNotify(from, to, token, amount);
    }

  }

  function depositViaSignature(
    address to,
    address token,
    uint256 amount,
    uint256 expiration,
    bytes32 nonce,
    uint8   signatureV,
    bytes32 signatureR,
    bytes32 signatureS
  ) public {
    _actionViaSignature(
      to,
      token,
      amount,
      expiration,
      nonce,
      signatureV,
      signatureR,
      signatureS,
      depositSalt
    );
  }

  function withdrawViaSignature(
    address to,
    address token,
    uint256 amount,
    uint256 expiration,
    bytes32 nonce,
    uint8   signatureV,
    bytes32 signatureR,
    bytes32 signatureS
  ) public {
    _actionViaSignature(
      to,
      token,
      amount,
      expiration,
      nonce,
      signatureV,
      signatureR,
      signatureS,
      withdrawSalt
    );
  }

  function withdrawAndNotifyViaSignature(
    address to,
    address token,
    uint256 amount,
    uint256 expiration,
    bytes32 nonce,
    uint8   signatureV,
    bytes32 signatureR,
    bytes32 signatureS
  ) public {
    _actionViaSignature(
      to,
      token,
      amount,
      expiration,
      nonce,
      signatureV,
      signatureR,
      signatureS,
      withdrawAndNotifySalt
    );
  }

}
