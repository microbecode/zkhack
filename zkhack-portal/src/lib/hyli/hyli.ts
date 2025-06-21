import { walletContractName, IndexerService } from "hyli-wallet";
import { NodeService } from "./NodeService";
import {
  BlobTransaction,
  Blob,
  ProofTransaction,
  NodeApiHttpClient,
} from "hyli";
import { CompiledCircuit, InputMap } from "@noir-lang/types";
import { Noir } from "@noir-lang/noir_js";
import { reconstructHonkProof, UltraHonkBackend } from "@aztec/bb.js";

export const CONTRACT_NAME = "circuit";
const IDENTITY = `hyli@${CONTRACT_NAME}`;
const PASSWORD = "hylisecure";
// We'll load the circuit dynamically
let defaultCircuit: any = null;

const loadCircuit = async () => {
  if (!defaultCircuit) {
    const response = await fetch("/circuit.json");
    defaultCircuit = await response.json();
  }
  return defaultCircuit;
};

export const runAction = async (
  identityBlobs: [Blob, Blob],
  location: number
) => {
  NodeService.initialize("http://localhost:4321");
  const nodeService = NodeService.getInstance();

  const blob0 = identityBlobs[0];
  const blob1 = identityBlobs[1];

  const args: [number, number] = [location, location + 1];

  const hashed_password_bytes = await sha256(stringToBytes(PASSWORD));

  const blob2 = await build_my_blob(hashed_password_bytes);

  const blobTx: BlobTransaction = {
    identity: IDENTITY,
    blobs: [blob2],
  };
  console.log("registering contract");
  await register_contract(nodeService.client as any);
  console.log("sending blob tx");
  const txHash = await nodeService.client.sendBlobTx(blobTx);

  const proofTx = await build_proof_transaction(...args, txHash, 0, 1);
  console.log("original", proofTx);

  const proofTxHash = await nodeService.client.sendProofTx(proofTx);

  console.log("PROOF TX HASH: ", proofTxHash);
};

const build_my_blob = async (pwd: Uint8Array): Promise<Blob> => {
  const secretBlob: Blob = {
    contract_name: CONTRACT_NAME,
    data: Array.from(pwd),
  };

  return secretBlob;
};

const register_contract = async (
  node: NodeApiHttpClient,
  circuit?: CompiledCircuit
): Promise<void> => {
  const circuitData = circuit || ((await loadCircuit()) as CompiledCircuit);
  await node.getContract(CONTRACT_NAME).catch(async () => {
    const backend = new UltraHonkBackend(circuitData.bytecode);

    const vk = await backend.getVerificationKey();

    await node.registerContract({
      verifier: "noir",
      program_id: Array.from(vk),
      state_commitment: [0, 0, 0, 0],
      contract_name: CONTRACT_NAME,
    });
  });
};

const build_proof_transaction = async (
  x: number,
  y: number,
  tx_hash: string,
  blob_index: number,
  tx_blob_count: number
): Promise<ProofTransaction> => {
  const circuit: CompiledCircuit = (await loadCircuit()) as CompiledCircuit;
  const noir = new Noir(circuit);
  const backend = new UltraHonkBackend(circuit.bytecode);

  //const identity = "hyli@circuit";

  //const { witness } = await noir.execute({ x, y });

  const hashed_password_bytes = await sha256(stringToBytes(PASSWORD));

  const data = generateProverData(
    IDENTITY,
    hashed_password_bytes,
    tx_hash,
    blob_index,
    tx_blob_count
  );

  console.log("DATA", data);

  const { witness } = await noir.execute(data);

  const proof = await backend.generateProof(witness);
  const reconstructedProof = reconstructHonkProof(
    flattenFieldsAsArray(proof.publicInputs),
    proof.proof
  );

  return {
    contract_name: CONTRACT_NAME,
    proof: Array.from(reconstructedProof),
  };
};

/**
 * Generates the prover data required for the Noir circuit.
 *
 * @param id - The user's identity string
 * @param pwd - The hashed password as a Uint8Array
 * @param stored_hash - The stored hash as a Uint8Array
 * @param tx - The transaction hash string
 * @returns An object containing the prover data
 */
const generateProverData = (
  id: string,
  pwd: Uint8Array,
  tx: string,
  blob_index: number,
  tx_blob_count: number
): InputMap => {
  const version = 1;
  const initial_state = [0, 0, 0, 0];
  const initial_state_len = initial_state.length;
  const next_state = [0, 0, 0, 0];
  const next_state_len = next_state.length;
  const identity_len = id.length;
  const identity = id.padEnd(256, "0");
  const tx_hash = tx.padEnd(64, "0");
  const tx_hash_len = tx_hash.length;
  const index = blob_index;
  const blob_number = 1;
  const blob_contract_name_len = CONTRACT_NAME.length;
  const blob_contract_name = CONTRACT_NAME.padEnd(256, "0");
  const blob_capacity = 32;
  const blob_len = 32;
  const blob: number[] = Array.from(pwd);
  const success = 1;
  const password: number[] = Array.from(pwd);
  assert(password.length == 32, "Password length is not 32 bytes");
  assert(blob.length == blob_len, "Blob length is not 32 bytes");

  return {
    version,
    initial_state,
    initial_state_len,
    next_state,
    next_state_len,
    identity,
    identity_len,
    tx_hash,
    tx_hash_len,
    index,
    blob_number,
    blob_index,
    blob_contract_name_len,
    blob_contract_name,
    blob_capacity,
    blob_len,
    blob,
    tx_blob_count,
    success,
    password,
  };
};

const sha256 = async (data: Uint8Array): Promise<Uint8Array> => {
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
};

const stringToBytes = (input: string): Uint8Array => {
  return new TextEncoder().encode(input);
};

const assert = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new Error(message);
  }
};

function flattenFieldsAsArray(fields: string[]): Uint8Array {
  const flattenedPublicInputs = fields.map(hexToUint8Array);
  return flattenUint8Arrays(flattenedPublicInputs);
}

function flattenUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, val) => acc + val.length, 0);
  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

function hexToUint8Array(hex: string): Uint8Array {
  const sanitisedHex = BigInt(hex).toString(16).padStart(64, "0");

  const len = sanitisedHex.length / 2;
  const u8 = new Uint8Array(len);

  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(sanitisedHex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  return u8;
}
