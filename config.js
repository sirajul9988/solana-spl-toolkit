const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');
require('dotenv').config();

// Use Devnet for testing, Mainnet-beta for production
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Load your secret key from .env
const secretKeyString = process.env.PRIVATE_KEY || "";
const payer = secretKeyString 
  ? Keypair.fromSecretKey(bs58.decode(secretKeyString)) 
  : Keypair.generate();

module.exports = { connection, payer };
