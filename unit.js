var Web3 = require("web3"); //引入web3支持，我本地使用的是web3^0.18.4
var fs = require("fs"); //引入文件读取支持
var ethereumjsWallet = require('ethereumjs-wallet'); //引入以太坊nodejs操作钱包支持
var Tx = require("ethereumjs-tx"); //引入以太坊js交易支持


//初始化web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //我本地的私有链信息
    //启用命令：> geth --networkid 1108 --nodiscover --datadir ./ --rpc --rpcapi net,eth,web3,personal --rpcaddr 127.0.0.1 --rpcport 8545 console
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.23.149:8545"));
}


console.info(web3.toWei(1,'gwei'));
console.info(web3.fromWei(web3.toWei(3,'gwei')));
console.info(web3.fromWei(web3.toWei(20,'gwei')));