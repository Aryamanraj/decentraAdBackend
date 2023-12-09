import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Setup for directory and file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'advert.json');

// Function to read the database
function readDatabase() {
    if (!fs.existsSync(dbPath)) {
        return {};
    }

    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

// Function to write to the database
function writeDatabase(data) {
    try {
        console.log("Writing to Advert Database:", data);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
        console.log("Advert Database updated successfully");
    } catch (error) {
        console.error("Error writing to advert database:", error);
    }
}

// Function to check if an advertisement entry exists
function isAdvertPresent(walletAddrAdvert) {
    const db = readDatabase();
    return db.hasOwnProperty(walletAddrAdvert);
}

async function uploadAd(link, apikey, cidMedia, walletAddr, cidOfPost, bid) {
    const db = readDatabase();
    const finall = {
        cidMedia: cidMedia,
        link: link,
        bid: bid
    };
    const cidFinal = await uploadToIPFS(apikey, JSON.stringify(finall));

    if (!db[walletAddr]) {
        db[walletAddr] = {};
    }
    db[walletAddr][cidFinal.data.Hash] = {
        cidMedia: cidMedia,
        link: link,
        bid: bid,
        cidOfPost: cidOfPost,
    };
    writeDatabase(db);
    return cidFinal;
}

// Function to store an advertisement entry
// function storeAdvert(walletAddrAdvert, bid, cidOfAd, cidOfPost, time) {
//     const db = readDatabase();
//     db[walletAddrAdvert] = { bid, cidOfAd, cidOfPost, time };
//     writeDatabase(db);
// }

// Function to fetch an advertisement entry
function fetchAdvert(walletAddrAdvert) {
    const db = readDatabase();
    return db[walletAddrAdvert] || null;
}

export { isAdvertPresent, fetchAdvert, uploadAd };
