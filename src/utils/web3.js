import Web3 from 'web3';
import { BLOCKCHAIN_URL } from '../config';

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
// web3 = new Web3(window.web3.currentProvider);
// } else {
const provider = new Web3.providers.HttpProvider(BLOCKCHAIN_URL);

// }
export const web3 = new Web3(provider);

export const Mweb3 = new Web3(window.web3.currentProvider);
