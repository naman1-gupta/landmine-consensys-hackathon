import { web3, Mweb3, Uweb3 } from './web3';

import ContractJson from '../build/contracts/PropertyChain.json';

export const Contract = address => {
  return new web3.eth.Contract(ContractJson['abi'], address);
};

export const MContract = address => {
  return new Mweb3.eth.Contract(ContractJson['abi'], address);
};

const UportContractSetup = address => {
  let SharesABI = Uweb3.eth.contract(ContractJson['abi']);
  let SharesContractObj = SharesABI.at(address);
  return SharesContractObj;
};
export const UContract = address => {
  return UportContractSetup(address);
};
