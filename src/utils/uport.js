import { Connect, SimpleSigner } from 'uport-connect';

const uport = new Connect('Property Chain', {
  clientId: '2osiU2anCdPt5NDBF6yYGPM3SxqKrMR2rgb',
  signer: SimpleSigner('788ed901b9ee2d16a9b0248f05b0967309f0e4183e44ee677aeecb743b1660b8')
});
// const uport = new Connect('uPort Demo', {
//   clientId: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
//   signer: SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')
// });

export const web3 = uport.getWeb3();

export default uport;
