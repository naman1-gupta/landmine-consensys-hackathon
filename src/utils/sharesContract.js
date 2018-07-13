import { web3 } from './uport';

export default () => {
  let SharesABI = web3.eth.contract(['abi']);
  let SharesContractObj = SharesABI.at('contract address');
  return SharesContractObj;
};
