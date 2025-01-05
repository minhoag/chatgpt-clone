// otpStore.ts
export let otpStore: { [id: string]: { otpHash: string; expiresAt: number } } =
  {};
export let rateLimitStore: {
  [email: string]: { count: number; lastRequest: number };
} = {};
