import { web3 } from './web3';

import ContractJson from '../build/contracts/PropertyChain.json';

export const Contract = address => {
  return new web3.eth.Contract(ContractJson['abi'], address);
};
