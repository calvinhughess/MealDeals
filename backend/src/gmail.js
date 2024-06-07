const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const OpenAI = require("openai");

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
let deals = []; // Array to store extracted deals

// Initialize OpenAI API with your API key directly
const openai = new OpenAI({
    apiKey: 'sk-proj-slCAMIXCzm8mYz6ffNm7T3BlbkFJQCPIgF1ZPPOAJuMfSKOw',
});

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            console.log('Authorize this app by visiting this url:', authUrl);
        } else {
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        }
    });
}

function getToken(credentials, code, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
    });
}

function extractMessageBody(payload) {
    let messageBody = '';

    if (payload.body && payload.body.data) {
        messageBody = payload.body.data;
    } else if (payload.parts) {
        payload.parts.forEach((part) => {
            if (part.body && part.body.data) {
                messageBody += part.body.data;
            }
        });
    }

    return messageBody;
}

function decodeBase64(base64Str) {
    return Buffer.from(base64Str, 'base64').toString('utf-8');
}

function preprocessEmailContent(htmlContent) {
    const $ = cheerio.load(htmlContent);
    let textBlocks = '';

    // Capture all relevant text blocks
    $('a, p, h1, h2, h3, h4, h5, h6, span, div').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text) {
            textBlocks += text + '\n';
        }
    });

    // Capture all relevant links
    $('a').each((i, elem) => {
        const link = $(elem).attr('href');
        const linkText = $(elem).text().trim();
        if (link) {
            textBlocks += `Link: ${link}\n`;
            if (linkText) {
                textBlocks += `Text: ${linkText}\n`;
            }
        }
    });

    // Capture all image links
    $('img').each((i, elem) => {
        const imgSrc = $(elem).attr('src');
        const altText = $(elem).attr('alt') || 'Image';
        if (imgSrc) {
            textBlocks += `Image: ${altText}\nLink: ${imgSrc}\n`;
        }
    });

    return textBlocks;
}

async function parseEmailWithOpenAI(emailContent) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: 'You are an assistant that extracts deal information from promotional emails about food. You must only extract valid food deals as explicitly stated in the email content provided. Do not infer or add any information that is not explicitly mentioned in the email. Only include deals that fit the specified format for the app.'
            },
            {
                role: 'user',
                content: `
                    ${emailContent}
                    
                    Extract the deals from the above email content and format them as a JSON array with the following fields:
                    - company: The name of the company providing the deal.
                    - item: The exact full name of the item, without any discount attached.
                    - discount: The discount offered (e.g., "50% off", "Buy one get one free").
                    - details: Exactly how you can redeem the deal.
                    - href: The link to the deal.

                    Make sure to:
                    - Only return the exact content of the emails provided.
                    - Exclude any information not related to food deals.
                    - Exclude any deals that do not fit into the specified format.
                    - Do not create or infer any deals that are not explicitly mentioned in the email content provided.
                `
            }
        ]
    });

    let responseContent = response.choices[0].message.content;

    // Remove code block markers if present
    if (responseContent.startsWith('```json')) {
        responseContent = responseContent.replace(/^```json/, '').replace(/```$/, '').trim();
    }

    try {
        const deals = JSON.parse(responseContent);
        return deals;
    } catch (error) {
        console.error('Failed to parse OpenAI response:', responseContent);
        return [];
    }
}

async function processMessage(gmail, message) {
    return new Promise((resolve, reject) => {
        gmail.users.messages.get(
            {
                userId: 'me',
                id: message.id,
            },
            async (err, res) => {
                if (err) {
                    console.log('Error retrieving message:', err);
                    reject(err);
                }
                const messageBody = extractMessageBody(res.data.payload);
                if (messageBody) {
                    const decodedBody = decodeBase64(messageBody);

                    
                    let preprocessedContent = '';
                    // Check if the email content is plain text or HTML
                    if (/<[a-z][\s\S]*>/i.test(decodedBody)) {
                        // It's HTML content
                        preprocessedContent = preprocessEmailContent(decodedBody);
                    } else {
                        // It's plain text content
                        preprocessedContent = decodedBody;
                    }
                    

                    const dealsFromEmail = await parseEmailWithOpenAI(preprocessedContent);
                    deals.push(...dealsFromEmail);
                    console.log(dealsFromEmail);
                    resolve(dealsFromEmail);
                } else {
                    console.log('No message body found.');
                    resolve([]);
                }
            }
        );
    });
}

async function listMessages(auth) {
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({
        userId: 'me',
        q: 'category:promotions',
        maxResults: 10, // Fetch the first 10 emails
    });

    const messages = res.data.messages;

    if (!messages || messages.length === 0) {
        console.log('No new messages.');
        return;
    }

    console.log('New messages:');

    for (const message of messages) {
        await processMessage(gmail, message);
    }
}

module.exports = {
    authorize,
    getToken,
    listMessages,
    deals,
};
