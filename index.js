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
    web3 = new Web3(new Web3.providers.HttpProvider("http://139.180.216.81:8545"));
}

// Read and unlock keystore
// var keystore = fs.readFileSync('./keystores/UTC--2016-10-08T02-36-49.754551200Z--eb680f30715f347d4eb5cd03ac5eced297ac5046').toString();
var keystore = fs.readFileSync('./keystores/0xed64d1986e7861d0c51c0c5d24a91eb80340da62.txt').toString();

// 账户密码
var pass = "123456";

// 通过keystore与密码得到钱包对象
var wallet = ethereumjsWallet.fromV3(keystore, pass);
var privateKey = wallet.getPrivateKey();
console.info(privateKey);
//打印当前钱包privateKey
console.info("private key : " + privateKey.toString("hex"));

var fromAddress = wallet.getAddress().toString("hex");
console.info("Address: " + fromAddress);

var fromAddressBalance = web3.fromWei(web3.eth.getBalance(fromAddress),'ether');
console.info("Balance: " + fromAddressBalance);

//返回指定地址发起的交易数
var number = web3.eth.getTransactionCount("0x" + fromAddress);
console.info("getTransactionCount: "+number);

var toAddress = "0xa3a6FAe92ACD4c7EAd1fAec928df1FE24B0cCdE2";

//通过交易参数
var rawTx = {
    nonce: number,//交易数
    gasPrice: web3.toHex(web3.toWei(100,'gwei')),//gas价格
    gasLimit: web3.toHex(web3.toWei(4000000,'wei')),
    to: toAddress,//转账到哪个账户
    value: web3.toHex(web3.toWei(100,'ether')),//以太币数量
    data: ''
};

//构造此交易对象
var tx = new Tx(rawTx);
//发起人私钥签名
tx.sign(privateKey);
//交易序列化
var serializedTx = tx.serialize();
//执行交易
web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    console.log('transaction id ：'+hash);
    console.log('error:' + err);
});