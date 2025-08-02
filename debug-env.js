require('dotenv').config();

const token = process.env.NFT_STORAGE_API;

console.log("🔍 Raw token from .env:");
console.log(token);
console.log("📏 Token length:", token?.length || "undefined");

if (!token || token.length < 40) {
  console.error("❌ Token is missing or malformed.");
} else {
  console.log("✅ Token looks valid format-wise.");
}
