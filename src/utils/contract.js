import { web3, Mweb3 } from './web3';

import ContractJson from '../build/contracts/PropertyChain.json';

export const Contract = address => {
  return new web3.eth.Contract(ContractJson['abi'], address);
};

export const MContract = address => {
  return new Mweb3.eth.Contract(ContractJson['abi'], address);
};
