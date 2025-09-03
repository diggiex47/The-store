import { hkdf } from "@panva/hkdf";

// Assuming NEXTAUTH_SECRET is set in the environment
const secret = process.env.NEXTAUTH_SECRET;

const key = await hkdf(
  "sha256",
  Buffer.from(secret, "base64"),
  "next-auth-encryption",
  "NextAuth.js Generated Encryption Key",
  32
);

// FIX: Use the 'key' variable here
console.log("Node.js Derived AES key:", key.toString('hex'));