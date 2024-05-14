import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str(),
  CLERK_SECRET_KEY: str(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: str(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: str(),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL: str(),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL: str(),
  CHAPA_KEY: str(),
  CHAPA_WEBHOOK_SECRET: str(),
  WEBHOOK_SECRET: str(),
  DATABASE_URL: str(),
  REPLICATE_API_TOKEN: str(),
  MAXIMUM_GENERATION_LIMIT: str(),
  HUGGINGFACE_ACCESS_TOKEN: str(),
  NEXT_PUBLIC_SUPABASE_URL: str(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});
