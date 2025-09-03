// Use Node.js's built-in crypto library. No imports needed.
const crypto = require('crypto');

// Get the secret from the command line argument
const secret = process.env.NEXTAUTH_SECRET;

// A check to make sure the secret was provided
if (!secret) {
  console.error("Error: NEXTAUTH_SECRET environment variable not set.");
  process.exit(1); // Exit if the secret is missing
}

// These are the exact same constants from your Go code
const salt = "next-auth-encryption";
const info = "NextAuth.js Generated Encryption Key";

// Decode the secret from Base64 into raw bytes
const secretBuffer = Buffer.from(secret, 'base64');

// Perform the HKDF key derivation
crypto.hkdf('sha256', secretBuffer, salt, info, 32, (err, derivedKey) => {
  if (err) {
    // If there's an error, print it and exit
    console.error("HKDF Error:", err);
    process.exit(1);
  }

  // Convert the raw ArrayBuffer result into a Node.js Buffer
  const keyBuffer = Buffer.from(derivedKey);

  // Convert that Buffer into a hexadecimal string and print it
  console.log(keyBuffer.toString('hex'));
});