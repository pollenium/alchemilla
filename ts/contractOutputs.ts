import { Uu } from 'pollenium-uvaursi'
import { ContractOutput } from 'pollenium-clover'

export const engineOutput: ContractOutput = {
  abiJson: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"isWithdraw","type":"bool"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes8","name":"nonce","type":"bytes8"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"name":"depositOrWithdrawViaSignature","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"toAndFrom","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"depositViaSweep","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dowvsSalt","outputs":[{"internalType":"bytes15","name":"","type":"bytes15"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"prevBlockHash","type":"bytes32"},{"components":[{"internalType":"address","name":"originator","type":"address"},{"internalType":"address","name":"quotToken","type":"address"},{"internalType":"address","name":"variToken","type":"address"},{"internalType":"uint256","name":"priceNumer","type":"uint256"},{"internalType":"uint256","name":"priceDenom","type":"uint256"},{"internalType":"uint256","name":"tokenLimit","type":"uint256"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"internalType":"struct Engine.Order[]","name":"buyyOrders","type":"tuple[]"},{"components":[{"internalType":"address","name":"originator","type":"address"},{"internalType":"address","name":"quotToken","type":"address"},{"internalType":"address","name":"variToken","type":"address"},{"internalType":"uint256","name":"priceNumer","type":"uint256"},{"internalType":"uint256","name":"priceDenom","type":"uint256"},{"internalType":"uint256","name":"tokenLimit","type":"uint256"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"internalType":"struct Engine.Order[]","name":"sellOrders","type":"tuple[]"},{"components":[{"internalType":"uint16","name":"buyyOrderIndex","type":"uint16"},{"internalType":"uint16","name":"sellOrderIndex","type":"uint16"},{"internalType":"uint256","name":"quotTokenTrans","type":"uint256"},{"internalType":"uint256","name":"variTokenTrans","type":"uint256"},{"internalType":"uint256","name":"quotTokenArbit","type":"uint256"}],"internalType":"struct Engine.Exchange[]","name":"exchanges","type":"tuple[]"}],"name":"execute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"executorOracle","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"isDowvsHashSeen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_executorOracle","type":"address"}],"name":"setExecutorOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  bytecode: Uu.fromHexish('6080604052600480546001600160781b0319166ef5ee510934b6e8b72969b3ab8217d71790556100366001600160e01b0361008316565b600080546001600160a01b0319166001600160a01b03928316178082556040519216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3610087565b3390565b611956806100966000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063c23f001f11610066578063c23f001f146101a6578063cee7fbfc146101c6578063ee72d6c5146101db578063f2fde38b146101ee576100ea565b80638da5cb5b146101835780638f32d59b1461018b5780639f796d3b14610193576100ea565b806359b9fc23116100c857806359b9fc23146101355780636199407014610155578063715018a6146101685780637f92834514610170576100ea565b80630e8df6a1146100ef57806333f095071461010457806334c6610714610122575b600080fd5b6101026100fd3660046111e0565b610201565b005b61010c6108e2565b604051610119919061167b565b60405180910390f35b610102610130366004611029565b6108f1565b6101486101433660046111c2565b610937565b60405161011991906116d3565b6101026101633660046110a7565b61094c565b61010261095d565b61010261017e366004611112565b6100ea565b61010c6109cb565b6101486109da565b6101026101a13660046110a7565b6109fe565b6101b96101b436600461106d565b610a0a565b60405161011991906117ed565b6101ce610a27565b60405161011991906116e1565b6101026101e936600461106d565b610a30565b6101026101fc366004611029565b610abd565b600160009054906101000a90046001600160a01b03166001600160a01b031663dde9c2976040518163ffffffff1660e01b815260040160206040518083038186803b15801561024f57600080fd5b505afa158015610263573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610287919081019061104f565b6001600160a01b0316336001600160a01b0316146102c05760405162461bcd60e51b81526004016102b7906117dd565b60405180910390fd5b600143034084146102e35760405162461bcd60e51b81526004016102b79061175d565b6000806102ee610cee565b60005b86518110156104505786818151811061030657fe5b60200260200101519150600188600060f81b84602001518560400151866060015187608001518860a0015160405160200161034797969594939291906115c9565b604051602081830303815290604052805190602001208360c001518460e001518561010001516040516000815260200160405260405161038a94939291906116ef565b6020604051602081039080840390855afa1580156103ac573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b0316146103ea5760405162461bcd60e51b81526004016102b7906117ad565b8160c001518260e0015183610100015160405160200161040c93929190611644565b6040516020818303038152906040528051906020012092508383116104435760405162461bcd60e51b81526004016102b79061178d565b91925082916001016102f1565b5060009250825b85518110156105b65785818151811061046c57fe5b60200260200101519150600188600160f81b84602001518560400151866060015187608001518860a001516040516020016104ad97969594939291906115c9565b604051602081830303815290604052805190602001208360c001518460e00151856101000151604051600081526020016040526040516104f094939291906116ef565b6020604051602081039080840390855afa158015610512573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b0316146105505760405162461bcd60e51b81526004016102b7906117ad565b8160c001518260e0015183610100015160405160200161057293929190611644565b6040516020818303038152906040528051906020012092508383116105a95760405162461bcd60e51b81526004016102b79061178d565b9192508291600101610457565b506105bf610d3a565b6105c7610cee565b6105cf610cee565b600080600080600160009054906101000a90046001600160a01b03166001600160a01b031663578e9dc56040518163ffffffff1660e01b815260040160206040518083038186803b15801561062357600080fd5b505afa158015610637573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061065b919081019061104f565b905060005b8b518110156108d1578b818151811061067557fe5b602002602001015197508d886000015161ffff168151811061069357fe5b602002602001015196508c886020015161ffff16815181106106b157fe5b6020026020010151955085602001516001600160a01b031687602001516001600160a01b0316146106f45760405162461bcd60e51b81526004016102b7906117cd565b85604001516001600160a01b031687604001516001600160a01b03161461072d5760405162461bcd60e51b81526004016102b79061177d565b86602001519350866040015192508760800151886040015101945084876080015102886060015188606001510211156107785760405162461bcd60e51b81526004016102b79061176d565b8760400151866080015102886060015187606001510210156107ac5760405162461bcd60e51b81526004016102b79061174d565b8660a001518511156107d05760405162461bcd60e51b81526004016102b7906117bd565b8560a00151886060015111156107f85760405162461bcd60e51b81526004016102b79061172d565b86516001600160a01b03908116600090815260026020818152604080842089861680865290835281852080548c900390558d8201518c518716865284845282862082875284528286208054909101905560808e015188871686528484528286209186529083528185208054909101905560608d0180518c51871686528484528286208a881680885290855283872080549290920390915581518e51909716865293835281852093855292909152909120805490920190915560a08089018051889003905290519087018051919091039052600101610660565b505050505050505050505050505050565b6001546001600160a01b031681565b6108f96109da565b6109155760405162461bcd60e51b81526004016102b79061179d565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b60036020526000908152604090205460ff1681565b61095833848484610aed565b505050565b6109656109da565b6109815760405162461bcd60e51b81526004016102b79061179d565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b600080546001600160a01b03166109ef610c69565b6001600160a01b031614905090565b61095833848484610bab565b600260209081526000928352604080842090915290825290205481565b60045460881b81565b6040516370a0823160e01b81526000906001600160a01b038316906370a0823190610a5f90869060040161167b565b60206040518083038186803b158015610a7757600080fd5b505afa158015610a8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610aaf9190810190611289565b905061095883848484610bab565b610ac56109da565b610ae15760405162461bcd60e51b81526004016102b79061179d565b610aea81610c6d565b50565b60405163a9059cbb60e01b81526001600160a01b0383169063a9059cbb90610b1b90869085906004016116b1565b602060405180830381600087803b158015610b3557600080fd5b505af1158015610b49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610b6d91908101906110f4565b610b7657600080fd5b6001600160a01b0393841660009081526002602090815260408083209490961682529290925292902080549290920390915550565b6040516323b872dd60e01b81526001600160a01b038316906323b872dd90610bdb90879030908690600401611689565b602060405180830381600087803b158015610bf557600080fd5b505af1158015610c09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610c2d91908101906110f4565b610c3657600080fd5b6001600160a01b039283166000908152600260209081526040808320949095168252929092529190208054909101905550565b3390565b6001600160a01b038116610c935760405162461bcd60e51b81526004016102b79061173d565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081019190915290565b6040518060a00160405280600061ffff168152602001600061ffff1681526020016000815260200160008152602001600081525090565b8035610d7c816118d2565b92915050565b8051610d7c816118d2565b600082601f830112610d9e57600080fd5b8135610db1610dac82611822565b6117fb565b915081818352602084019350602081019050838560a0840282011115610dd657600080fd5b60005b83811015610e045781610dec8882610eae565b84525060209092019160a09190910190600101610dd9565b5050505092915050565b600082601f830112610e1f57600080fd5b8135610e2d610dac82611822565b9150818183526020840193506020810190508385610120840282011115610e5357600080fd5b60005b83811015610e045781610e698882610f31565b8452506020909201916101209190910190600101610e56565b8035610d7c816118e6565b8051610d7c816118e6565b8035610d7c816118ef565b8035610d7c816118f8565b600060a08284031215610ec057600080fd5b610eca60a06117fb565b90506000610ed88484611008565b8252506020610ee984848301611008565b6020830152506040610efd84828501610e98565b6040830152506060610f1184828501610e98565b6060830152506080610f2584828501610e98565b60808301525092915050565b60006101208284031215610f4457600080fd5b610f4f6101206117fb565b90506000610f5d8484610d71565b8252506020610f6e84848301610d71565b6020830152506040610f8284828501610d71565b6040830152506060610f9684828501610e98565b6060830152506080610faa84828501610e98565b60808301525060a0610fbe84828501610e98565b60a08301525060c0610fd28482850161101e565b60c08301525060e0610fe684828501610e98565b60e083015250610100610ffb84828501610e98565b6101008301525092915050565b8035610d7c81611901565b8051610d7c816118ef565b8035610d7c8161190a565b60006020828403121561103b57600080fd5b60006110478484610d71565b949350505050565b60006020828403121561106157600080fd5b60006110478484610d82565b6000806040838503121561108057600080fd5b600061108c8585610d71565b925050602061109d85828601610d71565b9150509250929050565b6000806000606084860312156110bc57600080fd5b60006110c88686610d71565b93505060206110d986828701610d71565b92505060406110ea86828701610e98565b9150509250925092565b60006020828403121561110657600080fd5b60006110478484610e8d565b600080600080600080600080610100898b03121561112f57600080fd5b600061113b8b8b610e82565b985050602061114c8b828c01610d71565b975050604061115d8b828c01610d71565b965050606061116e8b828c01610e98565b955050608061117f8b828c01610ea3565b94505060a06111908b828c0161101e565b93505060c06111a18b828c01610e98565b92505060e06111b28b828c01610e98565b9150509295985092959890939650565b6000602082840312156111d457600080fd5b60006110478484610e98565b600080600080608085870312156111f657600080fd5b60006112028787610e98565b945050602085013567ffffffffffffffff81111561121f57600080fd5b61122b87828801610e0e565b935050604085013567ffffffffffffffff81111561124857600080fd5b61125487828801610e0e565b925050606085013567ffffffffffffffff81111561127157600080fd5b61127d87828801610d8d565b91505092959194509250565b60006020828403121561129b57600080fd5b60006110478484611013565b60006112b38383611330565b505060200190565b6112c481611855565b82525050565b6112c46112d682611855565b6118af565b838110156113055781516112ef87826112a7565b96506112fa83611846565b9250506001016112db565b505050505050565b6112c481611860565b6112c481611872565b6112c461132b82611865565b611843565b6112c481611843565b6112c461132b82611843565b600061135260168361184c565b757661726920746f6b656e2066696c6c6162696c69747960501b815260200192915050565b600061138460268361184c565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b60006113cc602e8361184c565b7f73656c6c20707269636520697320677465207468616e206f7220657175616c2081526d746f207472616e7320707269636560901b602082015260400192915050565b600061141c60098361184c565b68084d8dec6d6d0c2e6d60bb1b815260200192915050565b6000611441602d8361184c565b7f627579207072696365206973206c7465207468616e206f7220657175616c207481526c6f20746f74616c20707269636560981b602082015260400192915050565b600061149060098361184c565b682b30b934aa37b5b2b760b91b815260200192915050565b60006114b560088361184c565b6713dc99195c88125960c21b815260200192915050565b60006114d960208361184c565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b6000611512600a8361184c565b6937b934b3b4b730ba37b960b11b815260200192915050565b600061153860168361184c565b7571756f7420746f6b656e2066696c6c6162696c69747960501b815260200192915050565b600061156a60098361184c565b6828bab7ba2a37b5b2b760b91b815260200192915050565b600061158f60118361184c565b7013db9b1e48115e1958dd5d1bdc88121bdd607a1b815260200192915050565b6112c4816118a9565b6112c46115c4826118a9565b6118c0565b60006115d5828a611339565b6020820191506115e5828961131f565b6001820191506115f582886112ca565b60148201915061160582876112ca565b6014820191506116158286611339565b6020820191506116258285611339565b6020820191506116358284611339565b50602001979650505050505050565b600061165082866115b8565b6001820191506116608285611339565b6020820191506116708284611339565b506020019392505050565b60208101610d7c82846112bb565b6060810161169782866112bb565b6116a460208301856112bb565b6110476040830184611330565b604081016116bf82856112bb565b6116cc6020830184611330565b9392505050565b60208101610d7c828461130d565b60208101610d7c8284611316565b608081016116fd8287611330565b61170a60208301866115af565b6117176040830185611330565b6117246060830184611330565b95945050505050565b60208082528101610d7c81611345565b60208082528101610d7c81611377565b60208082528101610d7c816113bf565b60208082528101610d7c8161140f565b60208082528101610d7c81611434565b60208082528101610d7c81611483565b60208082528101610d7c816114a8565b60208082528101610d7c816114cc565b60208082528101610d7c81611505565b60208082528101610d7c8161152b565b60208082528101610d7c8161155d565b60208082528101610d7c81611582565b60208101610d7c8284611330565b60405181810167ffffffffffffffff8111828210171561181a57600080fd5b604052919050565b600067ffffffffffffffff82111561183957600080fd5b5060209081020190565b90565b60200190565b90815260200190565b6000610d7c8261189d565b151590565b6001600160f81b03191690565b70ffffffffffffffffffffffffffffffffff191690565b6001600160c01b03191690565b61ffff1690565b6001600160a01b031690565b60ff1690565b6000610d7c826000610d7c826118cc565b6000610d7c8260f81b90565b60601b90565b6118db81611855565b8114610aea57600080fd5b6118db81611860565b6118db81611843565b6118db81611889565b6118db81611896565b6118db816118a956fea365627a7a72315820fe73903938fedfdc7ce6ced2db521f370096b997953bcd697225e3441f9ef5a36c6578706572696d656e74616cf564736f6c63430005100040')
}

export const monarchicExecutorOracleOutput: ContractOutput = {
  abiJson: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"cold","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hot","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_cold","type":"address"}],"name":"setCold","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_hot","type":"address"}],"name":"setHot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  bytecode: Uu.fromHexish('60806040526100156001600160e01b0361006616565b600280546001600160a01b0319166001600160a01b0392831617908190556040519116906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a361006a565b3390565b610482806100796000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146101075780638f32d59b1461010f578063dde9c2971461012b578063f2fde38b1461013357610088565b8063578e9dc51461008d57806359f34998146100b1578063715018a6146100d95780638aa4daa1146100e1575b600080fd5b610095610159565b604080516001600160a01b039092168252519081900360200190f35b6100d7600480360360208110156100c757600080fd5b50356001600160a01b0316610168565b005b6100d76101d1565b6100d7600480360360208110156100f757600080fd5b50356001600160a01b0316610262565b6100956102cb565b6101176102da565b604080519115158252519081900360200190f35b610095610300565b6100d76004803603602081101561014957600080fd5b50356001600160a01b031661030f565b6001546001600160a01b031681565b6101706102da565b6101af576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6101d96102da565b610218576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b6002546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600280546001600160a01b0319169055565b61026a6102da565b6102a9576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6002546001600160a01b031690565b6002546000906001600160a01b03166102f1610362565b6001600160a01b031614905090565b6000546001600160a01b031681565b6103176102da565b610356576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b61035f81610366565b50565b3390565b6001600160a01b0381166103ab5760405162461bcd60e51b81526004018080602001828103825260268152602001806104086026913960400191505060405180910390fd5b6002546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280546001600160a01b0319166001600160a01b039290921691909117905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a265627a7a723158208b94dd7fa42a12a75523e6a4f47f01681091e06545f0556c16da6a549099bbb564736f6c63430005100032')
}