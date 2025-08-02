require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const JWT = process.env.PINATA_JWT;

async function uploadToPinata() {
  const formData = new FormData();
  formData.append('file', fs.createReadStream('./data.json'));

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
    });

    console.log('✅ Uploaded successfully!');
    console.log('📦 CID:', res.data.IpfsHash);
    console.log(`🔗 View: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
  } catch (err) {
    console.error('❌ Upload failed:', err.response?.data || err.message);
  }
}

uploadToPinata();
