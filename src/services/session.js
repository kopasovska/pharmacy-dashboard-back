import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';

export const createSession = async (userId) => {
  return Session.create({
    userId,
    accessToken: crypto.randomUUID(),
    refreshToken: crypto.randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const renewSession = async (userId) => {
  await Session.deleteOne({ userId });
  const newSession = await createSession(userId);
  return newSession;
};

export const deleteSession = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const deleteSessionsByUserId = async (userId) => {
  return Session.deleteMany({ userId });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();

  if (isRefreshTokenExpired) {
    await session.deleteOne();
    throw createHttpError(401, 'Session token expired');
  }

  await session.deleteOne();

  return createSession(session.userId);
};

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};
