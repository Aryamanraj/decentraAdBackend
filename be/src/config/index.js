import dotenv from 'dotenv';
dotenv.config();

export const rpcUrl = process.env.RPC_URL;
export const privateKey = process.env.PRIVATE_KEY;
export const contractAddress = process.env.CONTRACT_ADDRESS;
export const walletAddress = process.env.WALLET_ADDRESS;
export const port = process.env.PORT || 3000;
export const infuraKey = process.env.INFURA_API_SECRET || 3000;
