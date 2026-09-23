import path from 'path';
import { fileURLToPath } from 'url';

const trackerRoutes = [
  '/api/rooms',
  '/payment-qr',
  '/uploads/:path*',
  '/login',
  '/student-login',
  '/admin-login',
  '/register',
  '/verify-email',
  '/admin-2fa',
  '/withdraw-application',
  '/student-pending',
  '/student-approved',
  '/complete-profile',
  '/student-dashboard',
  '/student-complaint',
  '/mark-attendance',
  '/edit-profile',
  '/upload-profile-photo',
  '/upload-college-id',
  '/download-fee-receipt',
  '/download-college-id-card',
  '/generate-laundry-token',
  '/forgot-password',
  '/reset-password',
  '/logout',
  '/admin-dashboard',
  '/admin-action',
  '/admin-notification',
  '/warden-login',
  '/warden-dashboard',
  '/warden-attendance',
  '/warden-lock-attendance',
  '/admin-attendance-action',
  '/admin-attendance-save',
  '/mess-warden-login',
  '/mess-warden-dashboard',
  '/laundry-admin-login',
  '/laundry-admin-dashboard',
  '/laundry-verify',
  '/laundry-out-verify',
  '/laundry-pickup',
];

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  async rewrites() {
    return trackerRoutes.map((route) => ({
      source: route,
      destination: `http://127.0.0.1:5000${route}`,
    }));
  },
};

export default nextConfig;
