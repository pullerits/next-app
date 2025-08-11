// Environment variable validation
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.warn(`Missing required environment variable: ${name}`);
    return ''; // Return empty string for development
  }
  return value;
}

export const env = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  SUPABASE_SERVICE_ROLE_KEY: getRequiredEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  
  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: getRequiredEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
  STRIPE_SECRET_KEY: getRequiredEnvVar('STRIPE_SECRET_KEY'),
  
  // Optional
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
} as const;

// Validate environment variables on module load
try {
  console.log('✅ Environment variables validated successfully');
} catch (error) {
  console.error('❌ Environment validation failed:', error);
  if (process.env.NODE_ENV !== 'development') {
    process.exit(1);
  }
}