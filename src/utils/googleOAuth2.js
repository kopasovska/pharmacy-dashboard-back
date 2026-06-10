import { google } from 'googleapis';
import path from 'node:path';
import { readFile } from 'fs/promises';
import 'dotenv/config';
import createHttpError from 'http-errors';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  oauthConfig.web.redirect_uris[0],
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

// const state = crypto.randomBytes(32).toString('hex');

export const generateAuthUrl = () =>
  oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
    //state: state,
  });

export const validateCode = async (code) => {
  const response = await oauth2Client.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');
  console.log(response);
  const ticket = await oauth2Client.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
