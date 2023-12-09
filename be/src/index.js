import express from "express";
import {
    isApiKeyPresent,
    storeApiKey,
    fetchApiKey,
} from "./uploads/jsondatabase.js";
import {
    uploadFinal,
    updateAnalytics,
    getUserAnalytics,
    getPaginatedArticles,
} from "./uploads/cidDatabase.js";
import { uploadAd } from "./advert/index.js";

import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
// import { createUser } from "./actions.js";
import cors from "cors";
const app = express();
const PORT = 3025;
const HOSTNAME = "127.0.0.1";

import { walletAddress } from "./config/index.js";

import { mintAndTransferNFT, getTokenURI } from "./nft/index.js";

import dotenv from "dotenv";
dotenv.config();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
// Load Swagger document
const swaggerDocument = yaml.load("src/swagger.yaml");

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

///////////////
// Store route
///////////////

app.get("/fetch-api-key", (req, res) => {
    const { walletAddr } = req.query;
    console.log("pubkeyx: ", walletAddr);

    if (isApiKeyPresent(walletAddr)) {
        const apiKey = fetchApiKey(walletAddr);
        res.status(200).json({ apiKey, message: "Success" });
    } else {
        res.status(200).json({ message: "Not created" });
    }
});
// app.post("/createPost", (req, res) => {
//     console.log("Creating a post");
//     const { creator, content } = req.body;
//     res.status(200).json({ message: "added post" });
// });

// app.post("/createUser", (req, res) => {
//     console.log("creating a user");
//     const { useradd } = req.body;
//     let newuser = createUser(useradd);
//     res.status(200).json({ user: newuser });
// });

app.post("/store-api-key", (req, res) => {
    console.log("called store api key"); // Log the request body
    const { walletAddr, apiKey } = req.body;
    console.log("APIkey:", apiKey, "walletAddr: ", walletAddr);

    storeApiKey(walletAddr, apiKey);
    res.status(200).json({ message: "API key stored successfully" });
});

// app.post('/store-cid', (req, res) => {
//     const { cid, publicKey } = req.body;

//     storeCid(cid, publicKey);
//     res.status(200).json({ message: 'CID stored successfully' });
// });

app.post("/upload-content", async (req, res) => {
    try {
        const { contentx, apiKey, cidMedia, walletAddr } = req.body;
        const cidFinal = await uploadFinal(
            contentx,
            apiKey,
            cidMedia,
            walletAddr
        );
        // console.log(cidFinal);
        res.status(200).json({ message: "Final uploaded", tokenURI: cidFinal });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

app.post("/updateAnalytics", (req, res) => {
    const { walletAddr, cid, viewerAddr, update } = req.body;

    try {
        updateAnalytics(walletAddr, cid, viewerAddr, JSON.parse(update));
        res.send("Analytics updated successfully.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

app.get("/getArticles", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 if not provided

    try {
        const paginatedArticles = getPaginatedArticles(page, pageSize);
        res.json(paginatedArticles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getUserAnalytics", (req, res) => {
    const { walletAddr } = req.query;

    if (!walletAddr) {
        return res.status(400).send("Wallet address is required.");
    }

    try {
        const analytics = getUserAnalytics(walletAddr);
        res.json(analytics);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getUserPosts", (req, res) => {
    const { walletAddr } = req.query;

    if (!walletAddr) {
        return res.status(400).send("Wallet address is required.");
    }

    try {
        const posts = getUserPosts(walletAddr);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/mintAndTransfer", async (req, res) => {
    try {
        const { transferToAddress, tokenURI } = req.body;
        if (!transferToAddress || !tokenURI) {
            return res
                .status(400)
                .send("Missing transferToAddress or tokenURI");
        }

        const result = await mintAndTransferNFT(
            walletAddress,
            transferToAddress,
            tokenURI
        );
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request");
    }
});

app.get("/getTokenURI", async (req, res) => {
    try {
        const { tokenId } = req.body;
        if (!tokenId) {
            return res.status(400).send("Missing tokenId");
        }

        const result = await getTokenURI(tokenId);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request");
    }
});

app.post("/upload-ad", async (req, res) => {
    try {
        const { link, apiKey, cidMedia, walletAddr, time, cidOfPost, bid } = req.body;
        const cidFinal = await uploadAd(
            link,
            apiKey,
            cidMedia,
            walletAddr, 
            cidOfPost,
            bid
        );
        // console.log(cidFinal);
        res.status(200).json({ message: "Final uploaded", tokenURI: cidFinal });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
