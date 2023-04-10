/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STAGING_ALCHEMY_KEY:
    "https://sepolia.infura.io/v3/3756cc0cdd3d4271aaa213d16bc62f5c",
    //"https://eth-sepolia.g.alchemy.com/v2/3756cc0cdd3d4271aaa213d16bc62f5c",
  },
};

module.exports = nextConfig;

//`https://eth-sepolia.g.alchemy.com/v2/piUXRbxojG98uyjRYmQR-28MgmjiJ7Wg`,
//https://eth-sepolia.g.alchemy.com/v2/piUXRbxojG98uyjRYmQR-28MgmjiJ7Wg