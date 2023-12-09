import fs from "fs";
import lighthouse from "@lighthouse-web3/sdk";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cidDbPath = path.join(__dirname, "cidDatabase.json");

function readCidDatabase() {
    if (!fs.existsSync(cidDbPath)) {
        return {};
    }

    const data = fs.readFileSync(cidDbPath, "utf8");
    return JSON.parse(data);
}

function writeCidDatabase(data) {
    fs.writeFileSync(cidDbPath, JSON.stringify(data, null, 2), "utf8");
}

async function uploadToIPFS(apiKey, text) {
    try {
        console.log("1: ", text, apiKey);
        const uploadResponse = await lighthouse.uploadText(
            JSON.stringify(text),
            apiKey
        );
        return uploadResponse;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw error;
    }
}

// function storeCid(cid, walletAddr) {
//     const db = readCidDatabase();
//     const timestamp = new Date().toISOString(); // ISO format timestamp

//     if (!db[walletAddr]) {
//         db[walletAddr] = {};
//     }

//     db[walletAddr][cid] = {
//         Views: "",
//         Likes: [],
//         Dislikes: [],
//         Reviews: [],
//         timestamp: timestamp,
//     };

//     writeCidDatabase(db);
// }

async function uploadFinal(contentx, apikey, cidMedia, walletAddr) {
    const db = readCidDatabase();
    const finall = {
        cidMedia: cidMedia,
        contentx: contentx,
    };
    const cidFinal = await uploadToIPFS(apikey, JSON.stringify(finall));

    if (!db[walletAddr]) {
        db[walletAddr] = {};
    }
    db[walletAddr][cidFinal.data.Hash] = {
        Views: "",
        Likes: [],
        Dislikes: [],
        Reviews: [],
    };
    writeCidDatabase(db);
}

function fetchCidInfo(walletAddr, cid) {
    const db = readCidDatabase();
    return (db[walletAddr] && db[walletAddr][cid]) || null;
}

function updateAnalytics(walletAddr, cid, viewerAddr, update) {
    const db = readCidDatabase();

    if (!db[walletAddr] || !db[walletAddr][cid]) {
        throw new Error("Wallet address or CID not found.");
    }

    let content = db[walletAddr][cid];

    switch (update.Type) {
        case "view":
            content.Views = (content.Views || 0) + 1;
            break;
        case "like":
            if (!content.Likes.includes(viewerAddr)) {
                content.Likes.push(viewerAddr);
                content.Dislikes = content.Dislikes.filter(
                    (addr) => addr !== viewerAddr
                ); // Remove from dislikes if present
            }
            break;
        case "dislike":
            if (!content.Dislikes.includes(viewerAddr)) {
                content.Dislikes.push(viewerAddr);
                content.Likes = content.Likes.filter(
                    (addr) => addr !== viewerAddr
                ); // Remove from likes if present
            }
            break;
        case "review":
            content.Reviews = content.Reviews.push(update.Message) // Assuming totalTime is an increment for each view
            break;
        default:
            throw new Error("Invalid update type");
    }

    writeCidDatabase(db);
}

function getUserAnalytics(walletAddr) {
    const db = readCidDatabase();
    let totalViews = 0;
    let totalLikes = 0;
    let totalDislikes = 0;

    if (db[walletAddr]) {
        Object.values(db[walletAddr]).forEach((content) => {
            totalViews += parseInt(content.Views || 0);
            totalLikes += content.Likes ? content.Likes.length : 0;
            totalDislikes += content.Dislikes ? content.Dislikes.length : 0;
        });
    }

    return {
        walletAddr,
        totalViews,
        totalLikes,
        totalDislikes,
    };
}

function getUserPosts(walletAddr) {
    const db = readCidDatabase();
    const userPosts = [];

    if (db[walletAddr]) {
        Object.entries(db[walletAddr]).forEach(([cid, contentData]) => {
            userPosts.push({ cid, ...contentData });
        });
    }

    return userPosts;
}


function getPaginatedArticles(page, pageSize) {
    const db = readCidDatabase();

    // Convert database object into an array of articles
    const articles = Object.entries(db).flatMap(([publicKey, cids]) =>
        Object.entries(cids).map(([cid, data]) => ({
            publicKey,
            cid,
            ...data,
        }))
    );

    // Sort articles by timestamp in descending order (newest first)
    articles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Implement pagination
    return articles.slice((page - 1) * pageSize, page * pageSize);
}


export {
    fetchCidInfo,
    uploadFinal,
    updateAnalytics,
    readCidDatabase,
    getUserAnalytics,
    getUserPosts,
    getPaginatedArticles
};
