const { getOrCreateAssociatedTokenAccount, transfer } = require('@solana/spl-token');
const { connection, payer } = require('./config');
const { PublicKey } = require('@solana/web3.js');

async function sendTokens(mintAddress, toAddress, amount) {
    const mint = new PublicKey(mintAddress);
    const destination = new PublicKey(toAddress);

    // Get the ATA for the sender and receiver
    const fromAta = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey);
    const toAta = await getOrCreateAssociatedTokenAccount(connection, payer, mint, destination);

    const signature = await transfer(
        connection,
        payer,
        fromAta.address,
        toAta.address,
        payer.publicKey,
        amount * Math.pow(10, 9)
    );

    console.log("Transfer complete. Signature:", signature);
}

// Example usage: node transfer.js [MINT_ADDR] [DEST_ADDR] [AMOUNT]
