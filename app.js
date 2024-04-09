const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {SpacesServiceClient} = require('@google-apps/meet').v2;
const { ConferenceRecordsServiceClient } = require('@google-apps/meet').v2;

const { auth } = require('google-auth-library');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/meetings.space.created'];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return auth.fromJSON(credentials);
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Creates a new meeting space.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
// async function createSpace(authClient) {
//   const meetClient = new SpacesServiceClient({
//     authClient: authClient
//   });
//   // Construct request
//   const request = {
//   };

//   // Run request
//   const response = await meetClient.createSpace(request);
//   console.log(`Meet URL: ${response[0].meetingUri}`);
// }

// authorize().then(createSpace).catch(console.error);

/**
 * This snippet has been automatically generated and should be regarded as a code template only.
 * It will require modifications to work.
 * It may require correct/in-range values for request initialization.
 * TODO(developer): Uncomment these variables before running the sample.
 */
/**
 *  Required. Resource name of the conference.
 */
// const name = 'hzh-ocya-nhc'
const parent = '17y-Ixi1doNEv7YouS2YMWyWNHtzK5-JS'

// Imports the Meet library

// Instantiates a client
const meetClient = new ConferenceRecordsServiceClient();

/**
 * Creates a new meeting space.
//  * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */

async function callGetConferenceRecord() {
  // Construct request
  const request = {
    parent,
  };

  // Run request
  const response = await meetClient.getConferenceRecord(request);
  console.log(response);
}

authorize().then(callGetConferenceRecord).catch(console.error);
// callGetConferenceRecord();



// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return auth.fromJSON(credentials);
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }




// // Instantiates a client
// const meetClient = new ConferenceRecordsServiceClient();

// async function callListTranscripts() {
//   // Construct request
//   const request = {
//     parent :
//   };

//   // Run request
//   const iterable = meetClient.listTranscriptsAsync(request);
//   for await (const response of iterable) {
//       console.log(response);
//   }
// }

// callListTranscripts();





/**
 * Creates a new meeting space.
//  * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */


// async function createSpace(authClient) {
//   const meetClient = new SpacesServiceClient({
//     authClient: authClient
//   });
//   // Construct request
//   const request = {
//   };

//   // Run request
//   const response = await meetClient.createSpace(request);
//   console.log(`Meet URL: ${response[0].meetingUri}`);
// }



