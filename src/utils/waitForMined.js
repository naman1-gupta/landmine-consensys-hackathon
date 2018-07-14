import { web3 } from './uport';

import checkAddressMNID from './checkAddressMNID';

// Callback handler for whether it was mined or not
export const waitForMined = async (txHash, response, pendingCB, successCB) => {
  if (response.blockNumber) {
    successCB();
  } else {
    pendingCB();
    pollingLoop(txHash, response, pendingCB, successCB);
  }
};

// Recursive polling to do continuous checks for when the transaction was mined
export const pollingLoop = async (txHash, response, pendingCB, successCB) => {
  setTimeout(function() {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) {
        throw error;
      }
      if (response === null) {
        response = { blockNumber: null };
      } // Some ETH nodes do not return pending tx
      waitForMined(txHash, response, pendingCB, successCB);
    });
  }, 1000); // check again in one sec.
};
