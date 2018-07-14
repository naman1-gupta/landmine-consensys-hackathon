import { web3 } from './web3';

export const Contract = () => {
  return new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [],
        name: 'chairperson',
        outputs: [
          {
            name: '',
            type: 'address'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          {
            name: '_user',
            type: 'address'
          },
          {
            name: '_address',
            type: 'string'
          }
        ],
        name: 'seedProperties',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          {
            name: '_num',
            type: 'uint256'
          }
        ],
        name: 'multiply',
        outputs: [
          {
            name: '',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address'
          },
          {
            name: '',
            type: 'uint256'
          }
        ],
        name: 'propertyIndices',
        outputs: [
          {
            name: '',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256'
          }
        ],
        name: 'properties',
        outputs: [
          {
            name: 'locationAddress',
            type: 'string'
          },
          {
            name: 'owner',
            type: 'address'
          },
          {
            name: 'approved',
            type: 'bool'
          },
          {
            name: 'recordsSize',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
      }
    ],
    '0x83a813e3c413199158451d1c13cef0c956c68234'
  );
};
