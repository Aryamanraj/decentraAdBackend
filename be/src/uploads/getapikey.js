import axios from 'axios';
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { updateApiKey } from './jsonDatabase.js';

const signAuthMessage = async (privateKey, verificationMessage) => {
    // ... existing code ...
};

const getAPIKEY = async (publickey, signedMessage) => {

    const response = await lighthouse.getApiKey(publickey, signedMessage);
    
    // Update the database with the new API key
    updateApiKey(publickey, response.apiKey);

    console.log(response);
    return apiKey
};

getAPIKEY();
