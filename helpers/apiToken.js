const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const apiTokenPath = path.join(process.cwd(), './apiToken.json');

const checkApiToken = async () => {
    if (fs.existsSync(apiTokenPath)) {
        fs.readFile(apiTokenPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading API token file:', err);
                return;
            }
            try {
                const apiToken = JSON.parse(data);
                if (!apiToken.token) {
                    const newToken = generateToken();
                    apiToken.token = newToken;
                    console.log(`Generated API Key: ${newToken}`);
                    writeTokenToFile(apiToken);
                } else {
                    console.log(`Existing API Key: ${apiToken.token}`);
                }
            } catch (parseError) {
                console.error('Error parsing API token file:', parseError);
            }
        });
    } else {
        const newToken = generateToken();
        const apiToken = { token: newToken };
        console.log(`Generated API Key: ${newToken}`);
        writeTokenToFile(apiToken);
    }
}

const generateToken = () => {
    return crypto.randomBytes(64).toString('hex');
}

const writeTokenToFile = (apiToken) => {
    const jsonData = JSON.stringify(apiToken, null, 4); 
    fs.writeFile(apiTokenPath, jsonData, (err) => {
        if (err) {
            console.error('Error writing API token file: ', err);
        } else {
            console.log('API token file created successfully');
        }
    });
}

module.exports = {
    checkApiToken,
};