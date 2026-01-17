import hre from "hardhat";

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  console.log("---------------------------------------------");
  console.log("👤 Deploying dengan akun:", deployer.account.address);
  console.log("🚀 Sedang mengirim contract ke Avalanche Fuji...");


  const simpleStorage = await hre.viem.deployContract("SimpleStorage");
  console.log("---------------------------------------------");
  console.log("✅ DEPLOY SUKSES! 💯");
  console.log("---------------------------------------------");
  console.log("📍 Contract Address :", simpleStorage.address);
  console.log("👑 Owner Address    :", deployer.account.address);
  console.log("---------------------------------------------");
  console.log("💾 TUGAS: Copy 'Contract Address' di atas ke Notepad.");
  console.log("   ( Simpan ini buat tugas Day 3!)");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});