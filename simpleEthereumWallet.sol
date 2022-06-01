// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract simpleEthereumWallet {
  constructor() public {
  }
  string title = "Simple Ethereum Wallet";


  function GetTitle() public view returns(string memory) {
    return title;
  }

}
