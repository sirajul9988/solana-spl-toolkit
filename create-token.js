const { createMint } = require('@solana/spl-token');
const { connection, payer } = require('./config');

async function createNewToken() {
    console.log("Creating token with payer:", payer.publicKey.toBase58());

    try {
        const mint = await createMint(
            connection,
            payer,            // Payer of the transaction
            payer.publicKey,  // Mint Authority
            payer.publicKey,  // Freeze Authority (Optional)
            9                 // Decimals
        );

        console.log("--- Success ---");
        console.log("Token Mint Address:", mint.toBase58());
    } catch (error) {
        console.error("Error creating token:", error);
    }
}

createNewToken();
