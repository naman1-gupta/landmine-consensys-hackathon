import { Connect, SimpleSigner } from 'uport-connect';

const uport = new Connect('Home chain', {
  clientId: '2osiU2anCdPt5NDBF6yYGPM3SxqKrMR2rgb',
  network: 'ropsten',
  signer: SimpleSigner('788ed901b9ee2d16a9b0248f05b0967309f0e4183e44ee677aeecb743b1660b8')
});

export const web3 = uport.getWeb3();

export default uport;
