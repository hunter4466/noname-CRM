import { NextResponse } from 'next/server';

// Public liveness probe for Cloud Run.
export const GET = async () => NextResponse.json({ status: 'ok', app: 'pos', env: process.env.APP_ENV ?? 'dev' });
