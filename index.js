var express = require('express');
var cookieParser = require('cookie-parser');
var Web3 = require('web3');
var contract = require('truffle-contract');
var path = require('path');
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var app = new express();
var port = 3000;
var Personal = require('web3-eth-personal');

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on port " + port +"\nView the application in your favourite browser using url: https://127.0.0.1:3000");
    }
    });
app.set('view engine', 'ejs');

var ContractJSON = require(path.join(__dirname, 'build/contracts/SimpleEthereumWallet.json'));
var Contract = contract(ContractJSON);
Contract.setProvider(provider);
var web3 = new Web3(provider);
var personal = new Personal(provider);
var Res;
var getname, address0, address1, balance0, balance1, sum;

address0 = "0x2b7d1cf4df045cd6905075a7088d56eadd57651b";
address1 = "0xd30accb9bc1719a676c17f2428704b3f0ac22e40";

app.get('/', function(req, result) {
    Contract.deployed().then(function(instance) {
        instance.GetTitle.call().then(function(res, err) {
            getname = res.toString();
            console.log("\nRetrieving data from Blockchain:- " + res.toString());
        });
        web3.eth.getBalance(address0, function(err, res) {
            if (!err) {
              balance0 = web3.utils.fromWei(res,"ether");
            } else {
              console.log(err);
            }
        })
        web3.eth.getBalance(address1, function(err, res) {
            if (!err) {
              balance1 = web3.utils.fromWei(res,"ether");
            } else {
              console.log(err);
            }
        })
        sum = Number(balance0)+Number(balance1);
        
        result.render('display', {
            title: getname,
            addr0: address0,
            addr1: address1,
            bal0: balance0,
            bal1: balance1,
            total: sum.toString()
        });

    });

});

app.get('/send', function(req, result) {
    console.log(req.query);
    var transmit;
    if(req.query.trans=="address1"){
        var transmit = address1;
    }
    else{
        var transmit = address0;
    }
    var reci = req.query.reci;
    var val = req.query.val;
    var pass = req.query.pass;
    //console.log(trans)

    personal.unlockAccount(transmit,pass,60);

    web3.eth.sendTransaction({
        from: transmit,
        to: reci,
        value: web3.utils.toWei(val,"ether")
    }, function(err,res){
        if(err){
            console.log(err);
        }else{
            console.log("transfer successful");
        }
    })
    .on('transactionHash', function(hash){
        console.log(hash);
    })
    ;

});

    