# Kebab Quest

<img src="kebab.jpg" alt="Kebab Quest" width="300" />

This is a quest for finding all the kebabs in town - verifiably, and with the least amount of effort.

## Used components

- [Hyli](https://hyli.org/) L1 blockchain
- Noir UltraHonk ZK proofs
- Horizen / ZkVerify ZK verification network

## Setup

### Run a Hyli node

1. Clone the scaffold project at https://github.com/hyli-org/app-scaffold
1. Enter the `app-scaffold` folder
1. Run the needed Docker containers with `docker-compose up -d`

This will start a local Hyli node and blockchain, an indexer and other required components.

### Run the frontend

1. Clone this repository
1. Install dependencies: `yarn`
1. Run the frontend: `yarn dev`

You can now go to http://localhost:3000/ and login with credentials:
- Username: `hyli`
- Password: `hylisecure`

## Notes

Unfortunately, we did not get the Horizen proof verification working. Our Solidity verifier contract is written in `solidity` folder in this project and deployed at https://sepolia.basescan.org/address/0xcab2ca58a30d437cce7204e015c86cfbd2cb3d07 . The verification code is in GitHub branch `feat/horizen`.

