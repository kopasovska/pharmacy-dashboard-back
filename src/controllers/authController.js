import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

import {
  createSession,
  deleteSession,
  refreshSession,
  setSessionCookies,
} from '../services/session.js';
import {
  registerUserService,
  loginUserService,
  requestResetEmailService,
  resetPasswordService,
} from '../services/auth.js';
import {
  generateAuthUrl,
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';

export const registerUser = async (req, res) => {
  const newUser = await registerUserService({ ...req.body });

  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  res.status(200).json(newUser);
};

export const loginUser = async (req, res) => {
  const { user, newSession } = await loginUserService({ ...req.body });

  setSessionCookies(res, newSession);

  return res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  await deleteSession(sessionId);

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.status(200).send();
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const newSession = await refreshSession(sessionId, refreshToken);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  await requestResetEmailService(email);

  res.status(200).json({
    message: 'If this email exists, a reset link has been sent',
  });
};

export const resetPassword = async (req, res) => {
  const { password, token } = req.body;

  await resetPasswordService(password, token);

  res.status(200).json({
    message: 'Password reset successfully. Please log in again.',
  });
};

export const getGoogleOAuthUrl = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogle = async (req, res) => {
  const loginTicket = await validateCode(req.body.code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(crypto.randomBytes(10), 10);
    user = await User.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
    });
  }

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
  });
};
