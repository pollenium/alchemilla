"use strict";
exports.__esModule = true;
exports.engine = {
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "prevBlockHash",
                    "type": "bytes32"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "originator",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "quotToken",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "variToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "priceNumer",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "priceDenom",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenLimit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint8",
                            "name": "signatureV",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "signatureR",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "signatureS",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct Engine.Order[]",
                    "name": "buyyOrders",
                    "type": "tuple[]"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "originator",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "quotToken",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "variToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "priceNumer",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "priceDenom",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenLimit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint8",
                            "name": "signatureV",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "signatureR",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "signatureS",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct Engine.Order[]",
                    "name": "sellOrders",
                    "type": "tuple[]"
                },
                {
                    "components": [
                        {
                            "internalType": "uint16",
                            "name": "buyyOrderIndex",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint16",
                            "name": "sellOrderIndex",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint256",
                            "name": "quotTokenTrans",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "variTokenTrans",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "quotTokenArbit",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Engine.Exchange[]",
                    "name": "exchanges",
                    "type": "tuple[]"
                }
            ],
            "name": "execute",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "executorOracle",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_executorOracle",
                    "type": "address"
                }
            ],
            "name": "setExecutorOracle",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecodeHex": "60806040526100156001600160e01b0361006216565b600080546001600160a01b0319166001600160a01b03928316178082556040519216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3610066565b3390565b61165b806100756000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638da5cb5b116100665780638da5cb5b146101045780638f32d59b1461010c578063c23f001f14610121578063d9caed1214610141578063f2fde38b146101545761009e565b80630e8df6a1146100a357806333f09507146100b857806334c66107146100d6578063715018a6146100e95780638340f549146100f1575b600080fd5b6100b66100b1366004610f8d565b610167565b005b6100c0610848565b6040516100cd91906113c4565b60405180910390f35b6100b66100e4366004610ea4565b610857565b6100b661089d565b6100b66100ff366004610f22565b61090b565b6100c06109c8565b6101146109d7565b6040516100cd9190611408565b61013461012f366004610ee8565b6109fb565b6040516100cd9190611514565b6100b661014f366004610f22565b610a18565b6100b6610162366004610ea4565b610ad5565b600160009054906101000a90046001600160a01b03166001600160a01b031663dde9c2976040518163ffffffff1660e01b815260040160206040518083038186803b1580156101b557600080fd5b505afa1580156101c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506101ed9190810190610eca565b6001600160a01b0316336001600160a01b0316146102265760405162461bcd60e51b815260040161021d90611504565b60405180910390fd5b600143034084146102495760405162461bcd60e51b815260040161021d90611484565b600080610254610b8a565b60005b86518110156103b65786818151811061026c57fe5b60200260200101519150600188600060f81b84602001518560400151866060015187608001518860a001516040516020016102ad9796959493929190611312565b604051602081830303815290604052805190602001208360c001518460e00151856101000151604051600081526020016040526040516102f09493929190611416565b6020604051602081039080840390855afa158015610312573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b0316146103505760405162461bcd60e51b815260040161021d906114d4565b8160c001518260e001518361010001516040516020016103729392919061138d565b6040516020818303038152906040528051906020012092508383116103a95760405162461bcd60e51b815260040161021d906114b4565b9192508291600101610257565b5060009250825b855181101561051c578581815181106103d257fe5b60200260200101519150600188600160f81b84602001518560400151866060015187608001518860a001516040516020016104139796959493929190611312565b604051602081830303815290604052805190602001208360c001518460e00151856101000151604051600081526020016040526040516104569493929190611416565b6020604051602081039080840390855afa158015610478573d6000803e3d6000fd5b505050602060405103516001600160a01b031682600001516001600160a01b0316146104b65760405162461bcd60e51b815260040161021d906114d4565b8160c001518260e001518361010001516040516020016104d89392919061138d565b60405160208183030381529060405280519060200120925083831161050f5760405162461bcd60e51b815260040161021d906114b4565b91925082916001016103bd565b50610525610bd6565b61052d610b8a565b610535610b8a565b600080600080600160009054906101000a90046001600160a01b03166001600160a01b031663578e9dc56040518163ffffffff1660e01b815260040160206040518083038186803b15801561058957600080fd5b505afa15801561059d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506105c19190810190610eca565b905060005b8b51811015610837578b81815181106105db57fe5b602002602001015197508d886000015161ffff16815181106105f957fe5b602002602001015196508c886020015161ffff168151811061061757fe5b6020026020010151955085602001516001600160a01b031687602001516001600160a01b03161461065a5760405162461bcd60e51b815260040161021d906114f4565b85604001516001600160a01b031687604001516001600160a01b0316146106935760405162461bcd60e51b815260040161021d906114a4565b86602001519350866040015192508760800151886040015101945084876080015102886060015188606001510211156106de5760405162461bcd60e51b815260040161021d90611494565b8760400151866080015102886060015187606001510210156107125760405162461bcd60e51b815260040161021d90611474565b8660a001518511156107365760405162461bcd60e51b815260040161021d906114e4565b8560a001518860600151111561075e5760405162461bcd60e51b815260040161021d90611454565b86516001600160a01b03908116600090815260026020818152604080842089861680865290835281852080548c900390558d8201518c518716865284845282862082875284528286208054909101905560808e015188871686528484528286209186529083528185208054909101905560608d0180518c51871686528484528286208a881680885290855283872080549290920390915581518e51909716865293835281852093855292909152909120805490920190915560a080890180518890039052905190870180519190910390526001016105c6565b505050505050505050505050505050565b6001546001600160a01b031681565b61085f6109d7565b61087b5760405162461bcd60e51b815260040161021d906114c4565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6108a56109d7565b6108c15760405162461bcd60e51b815260040161021d906114c4565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6040516323b872dd60e01b81526001600160a01b038316906323b872dd9061093b903390309086906004016113d2565b602060405180830381600087803b15801561095557600080fd5b505af1158015610969573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061098d9190810190610f6f565b61099657600080fd5b6001600160a01b0392831660009081526002602090815260408083209490951682529290925291902080549091019055565b6000546001600160a01b031690565b600080546001600160a01b03166109ec610b05565b6001600160a01b031614905090565b600260209081526000928352604080842090915290825290205481565b6040516323b872dd60e01b81526001600160a01b038316906323b872dd90610a48903090879086906004016113fa565b602060405180830381600087803b158015610a6257600080fd5b505af1158015610a76573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610a9a9190810190610f6f565b610aa357600080fd5b3360009081526002602090815260408083206001600160a01b0395909516835293905291909120805491909103905550565b610add6109d7565b610af95760405162461bcd60e51b815260040161021d906114c4565b610b0281610b09565b50565b3390565b6001600160a01b038116610b2f5760405162461bcd60e51b815260040161021d90611464565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081019190915290565b6040518060a00160405280600061ffff168152602001600061ffff1681526020016000815260200160008152602001600081525090565b8035610c18816115e0565b92915050565b8051610c18816115e0565b600082601f830112610c3a57600080fd5b8135610c4d610c4882611549565b611522565b915081818352602084019350602081019050838560a0840282011115610c7257600080fd5b60005b83811015610ca05781610c888882610d34565b84525060209092019160a09190910190600101610c75565b5050505092915050565b600082601f830112610cbb57600080fd5b8135610cc9610c4882611549565b9150818183526020840193506020810190508385610120840282011115610cef57600080fd5b60005b83811015610ca05781610d058882610db7565b8452506020909201916101209190910190600101610cf2565b8051610c18816115f4565b8035610c18816115fd565b600060a08284031215610d4657600080fd5b610d5060a0611522565b90506000610d5e8484610e8e565b8252506020610d6f84848301610e8e565b6020830152506040610d8384828501610d29565b6040830152506060610d9784828501610d29565b6060830152506080610dab84828501610d29565b60808301525092915050565b60006101208284031215610dca57600080fd5b610dd5610120611522565b90506000610de38484610c0d565b8252506020610df484848301610c0d565b6020830152506040610e0884828501610c0d565b6040830152506060610e1c84828501610d29565b6060830152506080610e3084828501610d29565b60808301525060a0610e4484828501610d29565b60a08301525060c0610e5884828501610e99565b60c08301525060e0610e6c84828501610d29565b60e083015250610100610e8184828501610d29565b6101008301525092915050565b8035610c1881611606565b8035610c188161160f565b600060208284031215610eb657600080fd5b6000610ec28484610c0d565b949350505050565b600060208284031215610edc57600080fd5b6000610ec28484610c1e565b60008060408385031215610efb57600080fd5b6000610f078585610c0d565b9250506020610f1885828601610c0d565b9150509250929050565b600080600060608486031215610f3757600080fd5b6000610f438686610c0d565b9350506020610f5486828701610c0d565b9250506040610f6586828701610d29565b9150509250925092565b600060208284031215610f8157600080fd5b6000610ec28484610d1e565b60008060008060808587031215610fa357600080fd5b6000610faf8787610d29565b945050602085013567ffffffffffffffff811115610fcc57600080fd5b610fd887828801610caa565b935050604085013567ffffffffffffffff811115610ff557600080fd5b61100187828801610caa565b925050606085013567ffffffffffffffff81111561101e57600080fd5b61102a87828801610c29565b91505092959194509250565b61103f816115ac565b82525050565b61103f81611573565b61103f61105a82611573565b6115bd565b61103f8161157e565b61103f61107482611583565b611590565b61103f81611590565b61103f61107482611590565b600061109b60168361156a565b757661726920746f6b656e2066696c6c6162696c69747960501b815260200192915050565b60006110cd60268361156a565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b6000611115602e8361156a565b7f73656c6c20707269636520697320677465207468616e206f7220657175616c2081526d746f207472616e7320707269636560901b602082015260400192915050565b600061116560098361156a565b68084d8dec6d6d0c2e6d60bb1b815260200192915050565b600061118a602d8361156a565b7f627579207072696365206973206c7465207468616e206f7220657175616c207481526c6f20746f74616c20707269636560981b602082015260400192915050565b60006111d960098361156a565b682b30b934aa37b5b2b760b91b815260200192915050565b60006111fe60088361156a565b6713dc99195c88125960c21b815260200192915050565b600061122260208361156a565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b600061125b600a8361156a565b6937b934b3b4b730ba37b960b11b815260200192915050565b600061128160168361156a565b7571756f7420746f6b656e2066696c6c6162696c69747960501b815260200192915050565b60006112b360098361156a565b6828bab7ba2a37b5b2b760b91b815260200192915050565b60006112d860118361156a565b7013db9b1e48115e1958dd5d1bdc88121bdd607a1b815260200192915050565b61103f816115a6565b61103f61130d826115a6565b6115ce565b600061131e828a611082565b60208201915061132e8289611068565b60018201915061133e828861104e565b60148201915061134e828761104e565b60148201915061135e8286611082565b60208201915061136e8285611082565b60208201915061137e8284611082565b50602001979650505050505050565b60006113998286611301565b6001820191506113a98285611082565b6020820191506113b98284611082565b506020019392505050565b60208101610c188284611045565b606081016113e08286611036565b6113ed6020830185611045565b610ec26040830184611079565b606081016113e08286611045565b60208101610c18828461105f565b608081016114248287611079565b61143160208301866112f8565b61143e6040830185611079565b61144b6060830184611079565b95945050505050565b60208082528101610c188161108e565b60208082528101610c18816110c0565b60208082528101610c1881611108565b60208082528101610c1881611158565b60208082528101610c188161117d565b60208082528101610c18816111cc565b60208082528101610c18816111f1565b60208082528101610c1881611215565b60208082528101610c188161124e565b60208082528101610c1881611274565b60208082528101610c18816112a6565b60208082528101610c18816112cb565b60208101610c188284611079565b60405181810167ffffffffffffffff8111828210171561154157600080fd5b604052919050565b600067ffffffffffffffff82111561156057600080fd5b5060209081020190565b90815260200190565b6000610c188261159a565b151590565b6001600160f81b03191690565b90565b61ffff1690565b6001600160a01b031690565b60ff1690565b6000610c18826000610c1882611573565b6000610c18826000610c18826115da565b6000610c188260f81b90565b60601b90565b6115e981611573565b8114610b0257600080fd5b6115e98161157e565b6115e981611590565b6115e981611593565b6115e9816115a656fea365627a7a7231582031cd5ed481c88a4c206c7d4da353c46886c2a784beeed81a3069033b075352486c6578706572696d656e74616cf564736f6c63430005100040"
};
exports.monarchicExecutorOracle = {
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "cold",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "hot",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_cold",
                    "type": "address"
                }
            ],
            "name": "setCold",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_hot",
                    "type": "address"
                }
            ],
            "name": "setHot",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecodeHex": "60806040526100156001600160e01b0361006616565b600280546001600160a01b0319166001600160a01b0392831617908190556040519116906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a361006a565b3390565b610482806100796000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146101075780638f32d59b1461010f578063dde9c2971461012b578063f2fde38b1461013357610088565b8063578e9dc51461008d57806359f34998146100b1578063715018a6146100d95780638aa4daa1146100e1575b600080fd5b610095610159565b604080516001600160a01b039092168252519081900360200190f35b6100d7600480360360208110156100c757600080fd5b50356001600160a01b0316610168565b005b6100d76101d1565b6100d7600480360360208110156100f757600080fd5b50356001600160a01b0316610262565b6100956102cb565b6101176102da565b604080519115158252519081900360200190f35b610095610300565b6100d76004803603602081101561014957600080fd5b50356001600160a01b031661030f565b6001546001600160a01b031681565b6101706102da565b6101af576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6101d96102da565b610218576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b6002546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600280546001600160a01b0319169055565b61026a6102da565b6102a9576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6002546001600160a01b031690565b6002546000906001600160a01b03166102f1610362565b6001600160a01b031614905090565b6000546001600160a01b031681565b6103176102da565b610356576040805162461bcd60e51b8152602060048201819052602482015260008051602061042e833981519152604482015290519081900360640190fd5b61035f81610366565b50565b3390565b6001600160a01b0381166103ab5760405162461bcd60e51b81526004018080602001828103825260268152602001806104086026913960400191505060405180910390fd5b6002546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280546001600160a01b0319166001600160a01b039290921691909117905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a265627a7a723158208b94dd7fa42a12a75523e6a4f47f01681091e06545f0556c16da6a549099bbb564736f6c63430005100032"
};
