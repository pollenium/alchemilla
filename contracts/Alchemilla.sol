pragma solidity ^0.5.0;

import './token/ERC20/ERC20.sol';


contract AlchemillaV1 {

  address public owner;

  constructor() public{
    owner = msg.sender;
  }

  function getPersonalMessageHash (
    address quotToken,
    address variToken,
    uint256 tokenLimit,
    uint256 priceNumer,
    uint256 priceDenom,
    uint256 expiration,
    uint256 salt
  ) public view returns(bytes32 hash) {
      return keccak256(abi.encodePacked(
          "\x19Ethereum Signed Message:\n53Alchemilla V1 Order:\n",
          address(this),
          quotToken,
          variToken,
          tokenLimit,
          priceNumer,
          priceDenom,
          expiration,
          salt
      ));
  }

  function recoverOriginator(
    address quotToken,
    address variToken,
    uint256 tokenLimit,
    uint256 priceNumer,
    uint256 priceDenom,
    uint256 expiration,
    uint256 salt,
    uint8 signatureV,
    bytes32 signatureR,
    bytes32 signatureS
  ) public view returns(address originator) {
    return ecrecover(this.getPersonalMessageHash(
      quotToken,
      variToken,
      tokenLimit,
      priceNumer,
      priceDenom,
      expiration,
      salt
    ), signatureV, signatureR, signatureS);
  }

  mapping(address => mapping(address => uint256)) public balances;
  mapping(uint256 => uint256) public tokenFills;

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
    address     quotToken,
    address     variToken,
    uint256     quotTokenTrans,
    uint256     variTokenTrans,
    uint256     quotTokenArbit,

    address     buyyOrderOriginator,
    uint256     buyyOrderQuotTokenLimit,
    uint256     buyyOrderPriceNumer,
    uint256     buyyOrderPriceDenom,
    uint256     buyyOrderExpiration,
    uint256     buyyOrderSalt,
    uint8       buyyOrderSignatureV,
    bytes32     buyyOrderSignatureR,
    bytes32     buyyOrderSignatureS,

    address     sellOrderOriginator,
    uint256     sellOrderQuotTokenLimit,
    uint256     sellOrderPriceNumer,
    uint256     sellOrderPriceDenom,
    uint256     sellOrderExpiration,
    uint256     sellOrderSalt,
    uint8       sellOrderSignatureV,
    bytes32     sellOrderSignatureR,
    bytes32     sellOrderSignatureS
  ) public {

      /* Check signatures */
      require(buyyOrderOriginator == recoverOriginator(
        quotToken,
        variToken,
        buyyOrderQuotTokenLimit,
        buyyOrderPriceNumer,
        buyyOrderPriceDenom,
        buyyOrderExpiration,
        buyyOrderSalt,
        buyyOrderSignatureV,
        buyyOrderSignatureR,
        buyyOrderSignatureS
      ));

      require(sellOrderOriginator == recoverOriginator(
        quotToken,
        variToken,
        sellOrderQuotTokenLimit,
        sellOrderPriceNumer,
        sellOrderPriceDenom,
        sellOrderExpiration,
        sellOrderSalt,
        sellOrderSignatureV,
        sellOrderSignatureR,
        sellOrderSignatureS
      ));

      /* Check expirations */
      require(buyyOrderExpiration > now);
      require(sellOrderExpiration > now);

      uint256 quotTokenTotal = quotTokenTrans + quotTokenArbit;

      /* Check buy price is lte than or equal to total price */
      require(
        (buyyOrderPriceNumer * quotTokenTotal)
        <=
        (buyyOrderPriceDenom * variTokenTrans)
      );

      /* Check sell price is gte than or equal to trans price */
      require(
        (sellOrderPriceNumer * quotTokenTrans)
        >=
        (sellOrderPriceDenom * variTokenTrans)
      );


      /* Check quot token fillability */
      /* TODO: Use hash instead of salt */
      /* TODO: Determine if balance check is necessary */
      require(quotTokenTotal + tokenFills[buyyOrderSalt] <= buyyOrderQuotTokenLimit);
      require(quotTokenTrans <= balances[buyyOrderOriginator][quotToken]);

      /* Check vari token fillability */
      /* TODO: Use hash instead of salt */
      /* TODO: Determine if balance check is necessary */
      require(variTokenTrans + tokenFills[sellOrderSalt] <= sellOrderQuotTokenLimit);
      require(variTokenTrans <= balances[sellOrderOriginator][variToken]);

      /* Transfer quot token from buyer to seller and arbitrager */
      balances[buyyOrderOriginator][quotToken] -= quotTokenTotal;
      balances[sellOrderOriginator][quotToken] += quotTokenTrans;
      balances[sellOrderOriginator][quotToken] += quotTokenArbit;

      /* Transfer vari token from buyer to seller */
      balances[sellOrderOriginator][variToken] -= quotTokenTrans;
      balances[buyyOrderOriginator][variToken] += variTokenTrans;

        /* Transfer quot token from buyer to seller */
      balances[sellOrderOriginator][variToken] -= variTokenTrans;
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
