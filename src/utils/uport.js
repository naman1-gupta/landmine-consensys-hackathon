import { Connect, SimpleSigner } from 'uport-connect';

const uport = new Connect('LandMine', {
  clientId: '2otjBKeonUnoo42AJ2kN4Yp4jUsHAHgLzoH',
  network: 'ropsten',
  signer: SimpleSigner(
    'bbb30ebb6729800226df3e07412dff567e8254453095046a7fbdbe42bcb0b731'
  )
});
// const uport = new Connect('uPort Demo', {
//   clientId: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
//   signer: SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')
// });

export const web3 = uport.getWeb3();

export default uport;
