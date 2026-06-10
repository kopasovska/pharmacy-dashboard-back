import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  getGoogleOAuthUrl,
  loginUser,
  loginWithGoogle,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);
router.get('/auth/get-oauth-url', getGoogleOAuthUrl);
router.post(
  '/auth/confirm-google-oauth',
  celebrate(loginWithGoogleOAuthSchema),
  loginWithGoogle,
);

export default router;
