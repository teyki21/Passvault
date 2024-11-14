// utils/cryptoUtils.js
import * as Crypto from 'expo-crypto';

// Helper function to use expo-crypto for generating secure random bytes
export const getRandomValues = async (byteArray) => {
  const randomBytes = await Crypto.getRandomBytesAsync(byteArray.length);
  for (let i = 0; i < randomBytes.length; i++) {
    byteArray[i] = randomBytes[i];
  }
  return byteArray;
};

// Override the global.crypto if it doesn't exist
export const setupCrypto = async () => {
  if (typeof global.crypto === 'undefined') {
    global.crypto = {
      getRandomValues: getRandomValues,
    };
  }
};
