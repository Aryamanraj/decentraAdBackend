import fs from 'fs';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.json');

function readDatabase() {
    if (!fs.existsSync(dbPath)) {
        return {};
    }

    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

function writeDatabase(data) {
    try {
        console.log("Writing to Database:", data);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
        console.log("Database updated successfully");
    } catch (error) {
        console.error("Error writing to database:", error);
    }
}

function isApiKeyPresent(publicKey) {
    const db = readDatabase();
    console.log("pubkeyxx", publicKey,  "db: ", db, "\nans:", db.hasOwnProperty(publicKey));
    return db.hasOwnProperty(publicKey);
}

function storeApiKey(publicKey, apiKey) {
    const db = readDatabase();
    db[publicKey] = apiKey;
    writeDatabase(db);
}

function fetchApiKey(publicKey) {
    const db = readDatabase();
    return db[publicKey] || null;
}

export { isApiKeyPresent, storeApiKey, fetchApiKey };
