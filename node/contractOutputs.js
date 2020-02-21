"use strict";
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
exports.engineOutput = {
    abiJson: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"isWithdraw","type":"bool"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes8","name":"nonce","type":"bytes8"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"name":"depositOrWithdrawViaSignature","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"toAndFrom","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"depositViaSweep","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dowvsSalt","outputs":[{"internalType":"bytes15","name":"","type":"bytes15"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"prevBlockHash","type":"bytes32"},{"components":[{"internalType":"address","name":"originator","type":"address"},{"internalType":"address","name":"quotToken","type":"address"},{"internalType":"address","name":"variToken","type":"address"},{"internalType":"uint256","name":"priceNumer","type":"uint256"},{"internalType":"uint256","name":"priceDenom","type":"uint256"},{"internalType":"uint256","name":"tokenLimit","type":"uint256"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"internalType":"struct Engine.Order[]","name":"buyyOrders","type":"tuple[]"},{"components":[{"internalType":"address","name":"originator","type":"address"},{"internalType":"address","name":"quotToken","type":"address"},{"internalType":"address","name":"variToken","type":"address"},{"internalType":"uint256","name":"priceNumer","type":"uint256"},{"internalType":"uint256","name":"priceDenom","type":"uint256"},{"internalType":"uint256","name":"tokenLimit","type":"uint256"},{"internalType":"uint8","name":"signatureV","type":"uint8"},{"internalType":"bytes32","name":"signatureR","type":"bytes32"},{"internalType":"bytes32","name":"signatureS","type":"bytes32"}],"internalType":"struct Engine.Order[]","name":"sellOrders","type":"tuple[]"},{"components":[{"internalType":"uint16","name":"buyyOrderIndex","type":"uint16"},{"internalType":"uint16","name":"sellOrderIndex","type":"uint16"},{"internalType":"uint256","name":"quotTokenTrans","type":"uint256"},{"internalType":"uint256","name":"variTokenTrans","type":"uint256"},{"internalType":"uint256","name":"quotTokenArbit","type":"uint256"}],"internalType":"struct Engine.Exchange[]","name":"exchanges","type":"tuple[]"}],"name":"execute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"executorOracle","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"isDowvsHashSeen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_executorOracle","type":"address"}],"name":"setExecutorOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawAndNotifyViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawViaNative","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
    bytecode: pollenium_uvaursi_1.Uu.fromHexish('6080604052600480546001600160781b0319166ef5ee510934b6e8b72969b3ab8217d717905560006100386001600160e01b0361008716565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061008b565b3390565b6119f48061009a6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80637f92834511610097578063c23f001f11610066578063c23f001f146101c4578063cee7fbfc146101e4578063ee72d6c5146101f9578063f2fde38b1461020c576100f5565b80637f9283451461018e5780638da5cb5b146101a15780638f32d59b146101a95780639f796d3b146101b1576100f5565b806334c66107116100d357806334c661071461014057806359b9fc23146101535780636199407014610173578063715018a614610186576100f5565b80630e8df6a1146100fa5780632fdeaf6a1461010f57806333f0950714610122575b600080fd5b61010d61010836600461127e565b61021f565b005b61010d61011d366004611145565b610900565b61012a610911565b6040516101379190611719565b60405180910390f35b61010d61014e3660046110c7565b610920565b610166610161366004611260565b610966565b6040516101379190611771565b61010d610181366004611145565b61097b565b61010d610987565b61010d61019c3660046111b0565b6100f5565b61012a6109f5565b610166610a04565b61010d6101bf366004611145565b610a28565b6101d76101d236600461110b565b610a34565b604051610137919061188b565b6101ec610a51565b604051610137919061177f565b61010d61020736600461110b565b610a5a565b61010d61021a3660046110c7565b610ae7565b600160009054906101000a90046001600160a01b03166001600160a01b031663dde9c2976040518163ffffffff1660e01b815260040160206040518083038186803b15801561026d57600080fd5b505afa158015610281573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506102a591908101906110ed565b6001600160a01b0316336001600160a01b0316146102de5760405162461bcd60e51b81526004016102d59061187b565b60405180910390fd5b600143034084146103015760405162461bcd60e51b81526004016102d5906117fb565b60008061030c610d8c565b60005b865181101561046e5786818151811061032457fe5b60200260200101519150600188600060f81b84602001518560400151866060015187608001518860a001516040516020016103659796959493929190611667565b604051602081830303815290604052805190602001208360c001518460e00151856101000151604051600081526020016040526040516103a8949392919061178d565b6020604051602081039080840390855afa1580156103ca573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b0316146104085760405162461bcd60e51b81526004016102d59061184b565b8160c001518260e0015183610100015160405160200161042a939291906116e2565b6040516020818303038152906040528051906020012092508383116104615760405162461bcd60e51b81526004016102d59061182b565b919250829160010161030f565b5060009250825b85518110156105d45785818151811061048a57fe5b60200260200101519150600188600160f81b84602001518560400151866060015187608001518860a001516040516020016104cb9796959493929190611667565b604051602081830303815290604052805190602001208360c001518460e001518561010001516040516000815260200160405260405161050e949392919061178d565b6020604051602081039080840390855afa158015610530573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b03161461056e5760405162461bcd60e51b81526004016102d59061184b565b8160c001518260e00151836101000151604051602001610590939291906116e2565b6040516020818303038152906040528051906020012092508383116105c75760405162461bcd60e51b81526004016102d59061182b565b9192508291600101610475565b506105dd610dd8565b6105e5610d8c565b6105ed610d8c565b600080600080600160009054906101000a90046001600160a01b03166001600160a01b031663578e9dc56040518163ffffffff1660e01b815260040160206040518083038186803b15801561064157600080fd5b505afa158015610655573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061067991908101906110ed565b905060005b8b518110156108ef578b818151811061069357fe5b602002602001015197508d886000015161ffff16815181106106b157fe5b602002602001015196508c886020015161ffff16815181106106cf57fe5b6020026020010151955085602001516001600160a01b031687602001516001600160a01b0316146107125760405162461bcd60e51b81526004016102d59061186b565b85604001516001600160a01b031687604001516001600160a01b03161461074b5760405162461bcd60e51b81526004016102d59061181b565b86602001519350866040015192508760800151886040015101945084876080015102886060015188606001510211156107965760405162461bcd60e51b81526004016102d59061180b565b8760400151866080015102886060015187606001510210156107ca5760405162461bcd60e51b81526004016102d5906117eb565b8660a001518511156107ee5760405162461bcd60e51b81526004016102d59061185b565b8560a00151886060015111156108165760405162461bcd60e51b81526004016102d5906117cb565b86516001600160a01b03908116600090815260026020818152604080842089861680865290835281852080548c900390558d8201518c518716865284845282862082875284528286208054909101905560808e015188871686528484528286209186529083528185208054909101905560608d0180518c51871686528484528286208a881680885290855283872080549290920390915581518e51909716865293835281852093855292909152909120805490920190915560a0808901805188900390529051908701805191909103905260010161067e565b505050505050505050505050505050565b61090c33848484610b17565b505050565b6001546001600160a01b031681565b610928610a04565b6109445760405162461bcd60e51b81526004016102d59061183b565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b60036020526000908152604090205460ff1681565b61090c33848484610b8b565b61098f610a04565b6109ab5760405162461bcd60e51b81526004016102d59061183b565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b600080546001600160a01b0316610a19610d07565b6001600160a01b031614905090565b61090c33848484610c49565b600260209081526000928352604080842090915290825290205481565b60045460881b81565b6040516370a0823160e01b81526000906001600160a01b038316906370a0823190610a89908690600401611719565b60206040518083038186803b158015610aa157600080fd5b505afa158015610ab5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610ad99190810190611327565b905061090c83848484610c49565b610aef610a04565b610b0b5760405162461bcd60e51b81526004016102d59061183b565b610b1481610d0b565b50565b610b2384848484610b8b565b604051634f191ba960e01b81526001600160a01b03841690634f191ba990610b5390879086908690600401611727565b600060405180830381600087803b158015610b6d57600080fd5b505af1158015610b81573d6000803e3d6000fd5b5050505050505050565b60405163a9059cbb60e01b81526001600160a01b0383169063a9059cbb90610bb9908690859060040161174f565b602060405180830381600087803b158015610bd357600080fd5b505af1158015610be7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610c0b9190810190611192565b610c1457600080fd5b6001600160a01b0393841660009081526002602090815260408083209490961682529290925292902080549290920390915550565b6040516323b872dd60e01b81526001600160a01b038316906323b872dd90610c7990879030908690600401611727565b602060405180830381600087803b158015610c9357600080fd5b505af1158015610ca7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610ccb9190810190611192565b610cd457600080fd5b6001600160a01b039283166000908152600260209081526040808320949095168252929092529190208054909101905550565b3390565b6001600160a01b038116610d315760405162461bcd60e51b81526004016102d5906117db565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081019190915290565b6040518060a00160405280600061ffff168152602001600061ffff1681526020016000815260200160008152602001600081525090565b8035610e1a81611970565b92915050565b8051610e1a81611970565b600082601f830112610e3c57600080fd5b8135610e4f610e4a826118c0565b611899565b915081818352602084019350602081019050838560a0840282011115610e7457600080fd5b60005b83811015610ea25781610e8a8882610f4c565b84525060209092019160a09190910190600101610e77565b5050505092915050565b600082601f830112610ebd57600080fd5b8135610ecb610e4a826118c0565b9150818183526020840193506020810190508385610120840282011115610ef157600080fd5b60005b83811015610ea25781610f078882610fcf565b8452506020909201916101209190910190600101610ef4565b8035610e1a81611984565b8051610e1a81611984565b8035610e1a8161198d565b8035610e1a81611996565b600060a08284031215610f5e57600080fd5b610f6860a0611899565b90506000610f7684846110a6565b8252506020610f87848483016110a6565b6020830152506040610f9b84828501610f36565b6040830152506060610faf84828501610f36565b6060830152506080610fc384828501610f36565b60808301525092915050565b60006101208284031215610fe257600080fd5b610fed610120611899565b90506000610ffb8484610e0f565b825250602061100c84848301610e0f565b602083015250604061102084828501610e0f565b604083015250606061103484828501610f36565b606083015250608061104884828501610f36565b60808301525060a061105c84828501610f36565b60a08301525060c0611070848285016110bc565b60c08301525060e061108484828501610f36565b60e08301525061010061109984828501610f36565b6101008301525092915050565b8035610e1a8161199f565b8051610e1a8161198d565b8035610e1a816119a8565b6000602082840312156110d957600080fd5b60006110e58484610e0f565b949350505050565b6000602082840312156110ff57600080fd5b60006110e58484610e20565b6000806040838503121561111e57600080fd5b600061112a8585610e0f565b925050602061113b85828601610e0f565b9150509250929050565b60008060006060848603121561115a57600080fd5b60006111668686610e0f565b935050602061117786828701610e0f565b925050604061118886828701610f36565b9150509250925092565b6000602082840312156111a457600080fd5b60006110e58484610f2b565b600080600080600080600080610100898b0312156111cd57600080fd5b60006111d98b8b610f20565b98505060206111ea8b828c01610e0f565b97505060406111fb8b828c01610e0f565b965050606061120c8b828c01610f36565b955050608061121d8b828c01610f41565b94505060a061122e8b828c016110bc565b93505060c061123f8b828c01610f36565b92505060e06112508b828c01610f36565b9150509295985092959890939650565b60006020828403121561127257600080fd5b60006110e58484610f36565b6000806000806080858703121561129457600080fd5b60006112a08787610f36565b945050602085013567ffffffffffffffff8111156112bd57600080fd5b6112c987828801610eac565b935050604085013567ffffffffffffffff8111156112e657600080fd5b6112f287828801610eac565b925050606085013567ffffffffffffffff81111561130f57600080fd5b61131b87828801610e2b565b91505092959194509250565b60006020828403121561133957600080fd5b60006110e584846110b1565b600061135183836113ce565b505060200190565b611362816118f3565b82525050565b611362611374826118f3565b61194d565b838110156113a357815161138d8782611345565b9650611398836118e4565b925050600101611379565b505050505050565b611362816118fe565b61136281611910565b6113626113c982611903565b6118e1565b611362816118e1565b6113626113c9826118e1565b60006113f06016836118ea565b757661726920746f6b656e2066696c6c6162696c69747960501b815260200192915050565b60006114226026836118ea565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b600061146a602e836118ea565b7f73656c6c20707269636520697320677465207468616e206f7220657175616c2081526d746f207472616e7320707269636560901b602082015260400192915050565b60006114ba6009836118ea565b68084d8dec6d6d0c2e6d60bb1b815260200192915050565b60006114df602d836118ea565b7f627579207072696365206973206c7465207468616e206f7220657175616c207481526c6f20746f74616c20707269636560981b602082015260400192915050565b600061152e6009836118ea565b682b30b934aa37b5b2b760b91b815260200192915050565b60006115536008836118ea565b6713dc99195c88125960c21b815260200192915050565b60006115776020836118ea565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b60006115b0600a836118ea565b6937b934b3b4b730ba37b960b11b815260200192915050565b60006115d66016836118ea565b7571756f7420746f6b656e2066696c6c6162696c69747960501b815260200192915050565b60006116086009836118ea565b6828bab7ba2a37b5b2b760b91b815260200192915050565b600061162d6011836118ea565b7013db9b1e48115e1958dd5d1bdc88121bdd607a1b815260200192915050565b61136281611947565b61136261166282611947565b61195e565b6000611673828a6113d7565b60208201915061168382896113bd565b6001820191506116938288611368565b6014820191506116a38287611368565b6014820191506116b382866113d7565b6020820191506116c382856113d7565b6020820191506116d382846113d7565b50602001979650505050505050565b60006116ee8286611656565b6001820191506116fe82856113d7565b60208201915061170e82846113d7565b506020019392505050565b60208101610e1a8284611359565b606081016117358286611359565b6117426020830185611359565b6110e560408301846113ce565b6040810161175d8285611359565b61176a60208301846113ce565b9392505050565b60208101610e1a82846113ab565b60208101610e1a82846113b4565b6080810161179b82876113ce565b6117a8602083018661164d565b6117b560408301856113ce565b6117c260608301846113ce565b95945050505050565b60208082528101610e1a816113e3565b60208082528101610e1a81611415565b60208082528101610e1a8161145d565b60208082528101610e1a816114ad565b60208082528101610e1a816114d2565b60208082528101610e1a81611521565b60208082528101610e1a81611546565b60208082528101610e1a8161156a565b60208082528101610e1a816115a3565b60208082528101610e1a816115c9565b60208082528101610e1a816115fb565b60208082528101610e1a81611620565b60208101610e1a82846113ce565b60405181810167ffffffffffffffff811182821017156118b857600080fd5b604052919050565b600067ffffffffffffffff8211156118d757600080fd5b5060209081020190565b90565b60200190565b90815260200190565b6000610e1a8261193b565b151590565b6001600160f81b03191690565b70ffffffffffffffffffffffffffffffffff191690565b6001600160c01b03191690565b61ffff1690565b6001600160a01b031690565b60ff1690565b6000610e1a826000610e1a8261196a565b6000610e1a8260f81b90565b60601b90565b611979816118f3565b8114610b1457600080fd5b611979816118fe565b611979816118e1565b61197981611927565b61197981611934565b6119798161194756fea365627a7a723158205eea00451e5be4e154bd1afbe8db62b59804d7709e2ffc4b9ce66002bf6adc2d6c6578706572696d656e74616cf564736f6c63430005100040')
};
exports.monarchicExecutorOracleOutput = {
    abiJson: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"cold","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hot","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_cold","type":"address"}],"name":"setCold","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_hot","type":"address"}],"name":"setHot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
    bytecode: pollenium_uvaursi_1.Uu.fromHexish('608060405260006100176001600160e01b0361006a16565b600280546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6104828061007d6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146101075780638f32d59b1461010f578063dde9c2971461012b578063f2fde38b1461013357610088565b8063578e9dc51461008d57806359f34998146100b1578063715018a6146100d95780638aa4daa1146100e1575b600080fd5b610095610159565b604080516001600160a01b039092168252519081900360200190f35b6100d7600480360360208110156100c757600080fd5b50356001600160a01b0316610168565b005b6100d76101d1565b6100d7600480360360208110156100f757600080fd5b50356001600160a01b0316610262565b6100956102cb565b6101176102da565b604080519115158252519081900360200190f35b610095610300565b6100d76004803603602081101561014957600080fd5b50356001600160a01b031661030f565b6001546001600160a01b031681565b6101706102da565b6101af576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6101d96102da565b610218576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b6002546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600280546001600160a01b0319169055565b61026a6102da565b6102a9576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6002546001600160a01b031690565b6002546000906001600160a01b03166102f1610362565b6001600160a01b031614905090565b6000546001600160a01b031681565b6103176102da565b610356576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b61035f81610366565b50565b3390565b6001600160a01b0381166103ab5760405162461bcd60e51b81526004018080602001828103825260268152602001806104086026913960400191505060405180910390fd5b6002546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280546001600160a01b0319166001600160a01b039290921691909117905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a265627a7a72315820dab80821bc02b90af86199776cee1e3093893918bae54e677435fdf7cb43364464736f6c63430005100032')
};
