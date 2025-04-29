export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as const; // Replace with actual contract address when deployed

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "locationName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "eventDescription",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventDate",
        "type": "uint256"
      }
    ],
    "name": "LocationAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      }
    ],
    "name": "LocationRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "locationName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "eventDescription",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "userMetadata",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalPresences",
        "type": "uint256"
      }
    ],
    "name": "PresenceRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "locationName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventDescription",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "eventDate",
        "type": "uint256"
      }
    ],
    "name": "addLocation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "eventInfos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "locationName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventDescription",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "eventDate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "eventList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "locationName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventDescription",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "eventDate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllEvents",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "locationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "locationName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "eventDescription",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "eventDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct ProofOfPresence.EventInfo[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      }
    ],
    "name": "getEventInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "locationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "locationName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "eventDescription",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "eventDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct ProofOfPresence.EventInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      }
    ],
    "name": "getLocationUsers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserPresenceCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserPresences",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "locationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "locationName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "eventDescription",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "eventDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "metadata",
            "type": "string"
          }
        ],
        "internalType": "struct ProofOfPresence.Presence[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "locationCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "locationUsers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "metadata",
        "type": "string"
      }
    ],
    "name": "registerPresence",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      }
    ],
    "name": "removeLocation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userPresences",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "locationId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "locationName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventDescription",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "eventDate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "metadata",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "validLocations",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
