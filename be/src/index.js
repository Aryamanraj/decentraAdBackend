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

import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

import cors from "cors";

const app = express();
const PORT = 3025;

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

app.post("/upload-content", (req, res) => {
    const { contentx, apiKey, cidMedia, walletAddr } = req.body;
    uploadFinal(contentx, apiKey, cidMedia, walletAddr);
    res.status(200).json({ message: "Final uploaded" });
});

app.post("/updateAnalytics", (req, res) => {
    const { walletAddr, cid, viewerAddr, updateType } = req.body;

    try {
        updateAnalytics(walletAddr, cid, viewerAddr, updateType);
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
