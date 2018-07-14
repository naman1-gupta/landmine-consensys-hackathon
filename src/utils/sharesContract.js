import { web3 } from './uport';

import { ABI, ADDRESS } from '../config';

const SharesContractSetup = () => {
  let SharesABI = web3.eth.contract(ABI);
  // let SharesContractObj = SharesABI.at('0x733C8A1359a829C1D37d6Ed3Bb4B49adc8E5c9b9');
  let SharesContractObj = SharesABI.at(ADDRESS);

  return SharesContractObj;
};

const SharesContract = SharesContractSetup();

export default SharesContract;
