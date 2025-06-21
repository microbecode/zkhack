# Kebab Quest

<img src="kebab.jpg" alt="Kebab Quest" width="300" />

This is a quest for finding all the kebabs in town - verifiably, and with the least amount of effort.

## Used components

- [Hyli](https://hyli.org/) L1 blockchain
- Noir UltraHonk ZK proofs

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


