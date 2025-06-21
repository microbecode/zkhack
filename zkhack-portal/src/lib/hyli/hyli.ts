import { WalletProvider, HyliWallet, useWallet, walletContractName, IndexerService } from "hyli-wallet";
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

// We'll load the circuit dynamically
let defaultCircuit: any = null;

const loadCircuit = async () => {
  if (!defaultCircuit) {
    const response = await fetch('/circuit.json');
    defaultCircuit = await response.json();
  }
  return defaultCircuit;
};

export const runAction = async (identityBlobs: [Blob, Blob]) => {
    const indexerService = IndexerService.getInstance();
    NodeService.initialize("http://localhost:4321");
    const nodeService = NodeService.getInstance();
    
    const username = "hyli";
    const password = "hylisecure";
    const identity = `${username}@${walletContractName}`;

    //const [blob0, blob1] = createIdentityBlobs();
    const blob0 = identityBlobs[0];
    const blob1 = identityBlobs[1];

    const blob2 = await build_my_blob(1,2);

    const blobTx: BlobTransaction = {
      identity,
      blobs: [blob0, blob1,blob2],
    };

    await register_contract(nodeService.client as any);

    const txHash = await nodeService.client.sendBlobTx(blobTx);

     const proofTx  = await build_proof_transaction(1,2);
    console.log("original", proofTx);

    
    const proofTxHash = await nodeService.client.sendProofTx(proofTx);

    console.log("PROOF TX HASH: ", proofTxHash); 
  }

  const build_my_blob = async (x: number, y: number
  ): Promise<Blob> => {
    const secretBlob: Blob = {
      contract_name: "stuff",
      data: Array.from([x,y]),
    };
  
    return secretBlob;
  };

  const register_contract = async (
    node: NodeApiHttpClient,
    circuit?: CompiledCircuit,
  ): Promise<void> => {
    const circuitData = circuit || (await loadCircuit() as CompiledCircuit);
    await node.getContract("check_secret").catch(async () => {
      const backend = new UltraHonkBackend(circuitData.bytecode);
  
      const vk = await backend.getVerificationKey();
  
      await node.registerContract({
        verifier: "noir",
        program_id: Array.from(vk),
        state_commitment: [0, 0, 0, 0],
        contract_name: "check_secret",
      });
    });
  };

  
  const build_proof_transaction = async (x: number, y: number): Promise<ProofTransaction> => {
    const circuit: CompiledCircuit = await loadCircuit() as CompiledCircuit;
    const noir = new Noir(circuit);
    const backend = new UltraHonkBackend(circuit.bytecode);
  
    const { witness } = await noir.execute(
      {x, y}
    );
  
    const proof = await backend.generateProof(witness);
    const reconstructedProof = reconstructHonkProof(
      flattenFieldsAsArray(proof.publicInputs),
      proof.proof,
    );
  
    return {
      contract_name: "stuff",
      proof: Array.from(reconstructedProof),
    };
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