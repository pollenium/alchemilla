import { Uu } from 'pollenium-uvaursi'
import { ContractOutput } from 'pollenium-clover'

export const engineOutput: ContractOutput = {
  abiJson: '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"depositSalt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"expiration","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"name":"depositViaSignature","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"components":[{"internalType":"address","name":"originator","type":"address"},{"internalType":"address","name":"quotToken","type":"address"},{"internalType":"address","name":"variToken","type":"address"},{"internalType":"uint256","name":"priceNumer","type":"uint256"},{"internalType":"uint256","name":"priceDenom","type":"uint256"},{"internalType":"uint256","name":"tokenLimit","type":"uint256"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"internalType":"struct Engine.Order[]","name":"buyyOrders","type":"tuple[]"},{"components":[{"internalType":"address","name":"originator","type":"address"},{"internalType":"address","name":"quotToken","type":"address"},{"internalType":"address","name":"variToken","type":"address"},{"internalType":"uint256","name":"priceNumer","type":"uint256"},{"internalType":"uint256","name":"priceDenom","type":"uint256"},{"internalType":"uint256","name":"tokenLimit","type":"uint256"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"internalType":"struct Engine.Order[]","name":"sellOrders","type":"tuple[]"},{"components":[{"internalType":"uint16","name":"buyyOrderIndex","type":"uint16"},{"internalType":"uint16","name":"sellOrderIndex","type":"uint16"},{"internalType":"uint256","name":"quotTokenTrans","type":"uint256"},{"internalType":"uint256","name":"variTokenTrans","type":"uint256"},{"internalType":"uint256","name":"quotTokenArbit","type":"uint256"}],"internalType":"struct Engine.Exchange[]","name":"exchanges","type":"tuple[]"}],"name":"execute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"executorOracle","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"isHashUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"orderSalt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_executorOracle","type":"address"}],"name":"setExecutorOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"withdrawAndNotifySalt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawAndNotifyViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"expiration","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"name":"withdrawAndNotifyViaSignature","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"withdrawSalt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"expiration","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"name":"withdrawViaSignature","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  bytecode: Uu.fromHexish('60806040523480156200001157600080fd5b506000620000276001600160e01b036200015316565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620000a57f45448858f8ed69bb96ea3b54e5a7116ef90c0299d45fa999873b1aa5da32354e6001600160e01b036200015716565b600455620000dc7f3a390be7d74e7491004044212317d5f713ae844ddbefe48b63984f65547431106001600160e01b036200015716565b600555620001137f7e2ebcfb1ca871cba79813ccecc9cd6e1d00ddc99b0be067304fd894bbbb70e26001600160e01b036200015716565b6006556200014a7fd92b07381a16dcb4e94d1c35863c076e14ee3a830349326a830606d334b9a9346001600160e01b036200015716565b60075562000266565b3390565b60006040518060600160405280838152602001600143034081526020013060601b6001600160601b0319168152506040516020016200019791906200023b565b604051602081830303815290604052805190602001209050919050565b6000620001c283836200022a565b505060200190565b620001d58162000255565b620001e1818462000261565b9250620001ee8262000252565b8060005b8381101562000222578151620002098782620001b4565b965062000216836200025b565b925050600101620001f2565b505050505050565b620002358162000252565b82525050565b6000620002498284620001ca565b50606001919050565b90565b50600390565b60200190565b919050565b611dc480620002766000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063715018a6116100ad5780638f32d59b116100715780638f32d59b146102155780639f796d3b1461021d578063c23f001f14610230578063cfc08be814610243578063f2fde38b1461025657610121565b8063715018a6146101e257806384c419f8146101ea578063857286bf146101f25780638da5cb5b146101fa5780638e9fcc0b1461020257610121565b80632fdeaf6a116100f45780632fdeaf6a1461018c57806333f095071461019f57806334c66107146101b45780634bdcefb5146101c757806361994070146101cf57610121565b806307629ebf1461012657806311d688241461013b57806320021d8b1461014e5780632d55c72114610177575b600080fd5b6101396101343660046112dc565b610269565b005b6101396101493660046112dc565b610286565b61016161015c3660046113aa565b610299565b60405161016e9190611b41565b60405180910390f35b61017f6102ae565b60405161016e9190611b4f565b61013961019a36600461128f565b6102b4565b6101a76102c5565b60405161016e9190611ae9565b6101396101c2366004611211565b6102d4565b61017f610323565b6101396101dd36600461128f565b610329565b610139610335565b61017f6103a3565b61017f6103a9565b6101a76103af565b6101396102103660046113c8565b6103be565b610161610a9e565b61013961022b36600461128f565b610ac2565b61017f61023e366004611255565b610ace565b6101396102513660046112dc565b610aeb565b610139610264366004611211565b610afe565b61027c8888888888888888600554610b2e565b5050505050505050565b61027c8888888888888888600754610b2e565b60036020526000908152604090205460ff1681565b60055481565b6102c033848484610cbd565b505050565b6001546001600160a01b031681565b6102dc610a9e565b6103015760405162461bcd60e51b81526004016102f890611c1b565b60405180910390fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b60065481565b6102c033848484610d27565b61033d610a9e565b6103595760405162461bcd60e51b81526004016102f890611c1b565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60045481565b60075481565b6000546001600160a01b031690565b600160009054906101000a90046001600160a01b03166001600160a01b031663dde9c2976040518163ffffffff1660e01b815260040160206040518083038186803b15801561040c57600080fd5b505afa158015610420573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506104449190810190611237565b6001600160a01b0316336001600160a01b0316146104745760405162461bcd60e51b81526004016102f890611b9b565b4384146104935760405162461bcd60e51b81526004016102f890611c6b565b60001960006104a0610ef7565b60005b8651811015610606578681815181106104b857fe5b60200260200101519150600160045489600060f81b85602001518660400151876060015188608001518960a001516040516020016104fd989796959493929190611a26565b604051602081830303815290604052805190602001208360c001518460e00151856101000151604051600081526020016040526040516105409493929190611b5d565b6020604051602081039080840390855afa158015610562573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b0316146105a05760405162461bcd60e51b81526004016102f890611c5b565b8160c001518260e001518361010001516040516020016105c293929190611ab2565b6040516020818303038152906040528051906020012092508383106105f95760405162461bcd60e51b81526004016102f890611bfb565b91925082916001016104a3565b50600019925060005b85518110156107725785818151811061062457fe5b60200260200101519150600160045489600160f81b85602001518660400151876060015188608001518960a00151604051602001610669989796959493929190611a26565b604051602081830303815290604052805190602001208360c001518460e00151856101000151604051600081526020016040526040516106ac9493929190611b5d565b6020604051602081039080840390855afa1580156106ce573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b03161461070c5760405162461bcd60e51b81526004016102f890611c5b565b8160c001518260e0015183610100015160405160200161072e93929190611ab2565b6040516020818303038152906040528051906020012092508383106107655760405162461bcd60e51b81526004016102f890611bfb565b919250829160010161060f565b5061077b610f43565b610783610ef7565b61078b610ef7565b600080600080600160009054906101000a90046001600160a01b03166001600160a01b031663578e9dc56040518163ffffffff1660e01b815260040160206040518083038186803b1580156107df57600080fd5b505afa1580156107f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506108179190810190611237565b905060005b8b51811015610a8d578b818151811061083157fe5b602002602001015197508d886000015161ffff168151811061084f57fe5b602002602001015196508c886020015161ffff168151811061086d57fe5b6020026020010151955085602001516001600160a01b031687602001516001600160a01b0316146108b05760405162461bcd60e51b81526004016102f890611bbb565b85604001516001600160a01b031687604001516001600160a01b0316146108e95760405162461bcd60e51b81526004016102f890611c2b565b86602001519350866040015192508760800151886040015101945084876080015102886060015188606001510211156109345760405162461bcd60e51b81526004016102f890611c3b565b8760400151866080015102886060015187606001510210156109685760405162461bcd60e51b81526004016102f890611beb565b8660a0015185111561098c5760405162461bcd60e51b81526004016102f890611c0b565b8560a00151886060015111156109b45760405162461bcd60e51b81526004016102f890611c4b565b86516001600160a01b03908116600090815260026020818152604080842089861680865290835281852080548c900390558d8201518c518716865284845282862082875284528286208054909101905560808e015188871686528484528286209186529083528185208054909101905560608d0180518c51871686528484528286208a881680885290855283872080549290920390915581518e51909716865293835281852093855292909152909120805490920190915560a0808901805188900390529051908701805191909103905260010161081c565b505050505050505050505050505050565b600080546001600160a01b0316610ab3610e1f565b6001600160a01b031614905090565b6102c033848484610e23565b600260209081526000928352604080842090915290825290205481565b61027c8888888888888888600654610b2e565b610b06610a9e565b610b225760405162461bcd60e51b81526004016102f890611c1b565b610b2b81610e76565b50565b85421115610b4e5760405162461bcd60e51b81526004016102f890611c7b565b60006040518060c001604052808b60601b6bffffffffffffffffffffffff191681526020018a60601b6bffffffffffffffffffffffff191681526020018960001b81526020018860001b815260200187815260200183815250604051602001610bb79190611a11565b60408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff1615610bff5760405162461bcd60e51b81526004016102f890611bcb565b6000818152600360209081526040808320805460ff19166001908117909155815184815290920190819052610c3b908490899089908990611b5d565b6020604051602081039080840390855afa158015610c5d573d6000803e3d6000fd5b505050602060405103519050600554831415610c8457610c7f818c8c8c610e23565b610cb0565b600654831415610c9a57610c7f818c8c8c610d27565b600754831415610cb057610cb0818c8c8c610cbd565b5050505050505050505050565b610cc984848484610d27565b604051634f191ba960e01b81526001600160a01b03841690634f191ba990610cf990879086908690600401611af7565b600060405180830381600087803b158015610d1357600080fd5b505af115801561027c573d6000803e3d6000fd5b6001600160a01b03808516600090815260026020908152604080832093861683529290522054811115610d6c5760405162461bcd60e51b81526004016102f890611bdb565b6001600160a01b0380851660009081526002602090815260408083209386168084529390915290819020805484900390555163a9059cbb60e01b815263a9059cbb90610dbe9086908590600401611b1f565b602060405180830381600087803b158015610dd857600080fd5b505af1158015610dec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610e10919081019061138c565b610e1957600080fd5b50505050565b3390565b6001600160a01b0380841660009081526002602090815260408083209386168084529390915290819020805484019055516323b872dd60e01b81526323b872dd90610dbe90879030908690600401611af7565b6001600160a01b038116610e9c5760405162461bcd60e51b81526004016102f890611bab565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081019190915290565b6040518060a00160405280600061ffff168152602001600061ffff1681526020016000815260200160008152602001600081525090565b8035610f8581611d49565b92915050565b8051610f8581611d49565b600082601f830112610fa757600080fd5b8135610fba610fb582611cb2565b611c8b565b915081818352602084019350602081019050838560a0840282011115610fdf57600080fd5b60005b8381101561100d5781610ff588826110a1565b84525060209092019160a09190910190600101610fe2565b5050505092915050565b600082601f83011261102857600080fd5b8135611036610fb582611cb2565b915081818352602084019350602081019050838561012084028201111561105c57600080fd5b60005b8381101561100d57816110728882611124565b845250602090920191610120919091019060010161105f565b8051610f8581611d5d565b8035610f8581611d66565b600060a082840312156110b357600080fd5b6110bd60a0611c8b565b905060006110cb84846111fb565b82525060206110dc848483016111fb565b60208301525060406110f084828501611096565b604083015250606061110484828501611096565b606083015250608061111884828501611096565b60808301525092915050565b6000610120828403121561113757600080fd5b611142610120611c8b565b905060006111508484610f7a565b825250602061116184848301610f7a565b602083015250604061117584828501610f7a565b604083015250606061118984828501611096565b606083015250608061119d84828501611096565b60808301525060a06111b184828501611096565b60a08301525060c06111c584828501611206565b60c08301525060e06111d984828501611096565b60e0830152506101006111ee84828501611096565b6101008301525092915050565b8035610f8581611d6f565b8035610f8581611d78565b60006020828403121561122357600080fd5b600061122f8484610f7a565b949350505050565b60006020828403121561124957600080fd5b600061122f8484610f8b565b6000806040838503121561126857600080fd5b60006112748585610f7a565b925050602061128585828601610f7a565b9150509250929050565b6000806000606084860312156112a457600080fd5b60006112b08686610f7a565b93505060206112c186828701610f7a565b92505060406112d286828701611096565b9150509250925092565b600080600080600080600080610100898b0312156112f957600080fd5b60006113058b8b610f7a565b98505060206113168b828c01610f7a565b97505060406113278b828c01611096565b96505060606113388b828c01611096565b95505060806113498b828c01611096565b94505060a061135a8b828c01611206565b93505060c061136b8b828c01611096565b92505060e061137c8b828c01611096565b9150509295985092959890939650565b60006020828403121561139e57600080fd5b600061122f848461108b565b6000602082840312156113bc57600080fd5b600061122f8484611096565b600080600080608085870312156113de57600080fd5b60006113ea8787611096565b945050602085013567ffffffffffffffff81111561140757600080fd5b61141387828801611017565b935050604085013567ffffffffffffffff81111561143057600080fd5b61143c87828801611017565b925050606085013567ffffffffffffffff81111561145957600080fd5b61146587828801610f96565b91505092959194509250565b600061147d8383611513565b505060200190565b61148e81611cf0565b82525050565b61148e6114a082611cf0565b611d26565b6114ae81611cd6565b6114b88184611ce2565b92506114c382611cd3565b8060005b838110156114f15781516114db8782611471565b96506114e683611cdc565b9250506001016114c7565b505050505050565b61148e81611cfb565b61148e61150e82611d00565b611cd3565b61148e81611cd3565b61148e61150e82611cd3565b6000611535603083611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f696e766181526f1b1a590b595e1958dd5d1bdc8b5a1bdd60821b602082015260400192915050565b6000611587602683611ce7565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b60006115cf602f83611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f71756f7481526e05ae8ded6cadc5adad2e6dac2e8c6d608b1b602082015260400192915050565b6000611620603d83611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f6163746981527f6f6e5669615369676e61747572652f686173682d6475706c6963617465000000602082015260400192915050565b600061167f603983611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f7769746881527f647261772f696e73756666696369656e742d62616c616e636500000000000000602082015260400192915050565b60006116de602e83611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f73656c6c81526d2d70726963652d746f6f2d6c6f7760901b602082015260400192915050565b600061172e603283611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f696e76618152716c69642d6f726465722d7072696f7269747960701b602082015260400192915050565b6000611782603583611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f71756f748152740b5d1bdad95b8b5b1a5b5a5d0b595e18d959591959605a1b602082015260400192915050565b60006117d9602083611ce7565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b6000611812602f83611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f7661726981526e05ae8ded6cadc5adad2e6dac2e8c6d608b1b602082015260400192915050565b6000611863602e83611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f6275792d81526d0e0e4d2c6ca5ae8dede5ad0d2ced60931b602082015260400192915050565b60006118b3603583611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f766172698152740b5d1bdad95b8b5b1a5b5a5d0b595e18d959591959605a1b602082015260400192915050565b600061190a602e83611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f7369676e81526d0c2e8eae4ca5adad2e6dac2e8c6d60931b602082015260400192915050565b600061195a603083611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f696e766181526f3634b216b13637b1b596b73ab6b132b960811b602082015260400192915050565b60006119ac603683611ce7565b7f706f6c6c656e69756d2f616c6368656d696c6c612f656e67696e652f616374698152751bdb959a5854da59db985d1d5c994bd95e1c1a5c995960521b602082015260400192915050565b61148e81611d20565b61148e611a0c82611d20565b611d37565b6000611a1d82846114a5565b5060c001919050565b6000611a32828b61151c565b602082019150611a42828a61151c565b602082019150611a528289611502565b600182019150611a628288611494565b601482019150611a728287611494565b601482019150611a82828661151c565b602082019150611a92828561151c565b602082019150611aa2828461151c565b5060200198975050505050505050565b6000611abe8286611a00565b600182019150611ace828561151c565b602082019150611ade828461151c565b506020019392505050565b60208101610f858284611485565b60608101611b058286611485565b611b126020830185611485565b61122f6040830184611513565b60408101611b2d8285611485565b611b3a6020830184611513565b9392505050565b60208101610f8582846114f9565b60208101610f858284611513565b60808101611b6b8287611513565b611b7860208301866119f7565b611b856040830185611513565b611b926060830184611513565b95945050505050565b60208082528101610f8581611528565b60208082528101610f858161157a565b60208082528101610f85816115c2565b60208082528101610f8581611613565b60208082528101610f8581611672565b60208082528101610f85816116d1565b60208082528101610f8581611721565b60208082528101610f8581611775565b60208082528101610f85816117cc565b60208082528101610f8581611805565b60208082528101610f8581611856565b60208082528101610f85816118a6565b60208082528101610f85816118fd565b60208082528101610f858161194d565b60208082528101610f858161199f565b60405181810167ffffffffffffffff81118282101715611caa57600080fd5b604052919050565b600067ffffffffffffffff821115611cc957600080fd5b5060209081020190565b90565b50600690565b60200190565b919050565b90815260200190565b6000610f8582611d14565b151590565b6001600160f81b03191690565b61ffff1690565b6001600160a01b031690565b60ff1690565b6000610f85826000610f8582611d43565b6000610f858260f81b90565b60601b90565b611d5281611cf0565b8114610b2b57600080fd5b611d5281611cfb565b611d5281611cd3565b611d5281611d0d565b611d5281611d2056fea365627a7a7231582089c7e9a66e7f7df9d3f0ee9063d024813e72a98daa0cea67a8c5e036159650c36c6578706572696d656e74616cf564736f6c63430005100040')
}

export const monarchicExecutorOracleOutput: ContractOutput = {
  abiJson: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"cold","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hot","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_cold","type":"address"}],"name":"setCold","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_hot","type":"address"}],"name":"setHot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  bytecode: Uu.fromHexish('608060405260006100176001600160e01b0361006a16565b600280546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6104828061007d6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146101075780638f32d59b1461010f578063dde9c2971461012b578063f2fde38b1461013357610088565b8063578e9dc51461008d57806359f34998146100b1578063715018a6146100d95780638aa4daa1146100e1575b600080fd5b610095610159565b604080516001600160a01b039092168252519081900360200190f35b6100d7600480360360208110156100c757600080fd5b50356001600160a01b0316610168565b005b6100d76101d1565b6100d7600480360360208110156100f757600080fd5b50356001600160a01b0316610262565b6100956102cb565b6101176102da565b604080519115158252519081900360200190f35b610095610300565b6100d76004803603602081101561014957600080fd5b50356001600160a01b031661030f565b6001546001600160a01b031681565b6101706102da565b6101af576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6101d96102da565b610218576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b6002546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600280546001600160a01b0319169055565b61026a6102da565b6102a9576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6002546001600160a01b031690565b6002546000906001600160a01b03166102f1610362565b6001600160a01b031614905090565b6000546001600160a01b031681565b6103176102da565b610356576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b61035f81610366565b50565b3390565b6001600160a01b0381166103ab5760405162461bcd60e51b81526004018080602001828103825260268152602001806104086026913960400191505060405180910390fd5b6002546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280546001600160a01b0319166001600160a01b039290921691909117905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a265627a7a72315820dab80821bc02b90af86199776cee1e3093893918bae54e677435fdf7cb43364464736f6c63430005100032')
}