import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem"; // Sesuai modul

// SOLUSI: Pakai 'require' biar gak error merah di TypeScript
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.27", // Sesuai modul
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", //
      chainId: 43113,
      // Ambil Private Key, kalau gak ada pakai array kosong biar gak crash
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;