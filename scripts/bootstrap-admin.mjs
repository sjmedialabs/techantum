/**
 * One-time bootstrap: creates the first CMS admin in Supabase.
 * Usage: node scripts/bootstrap-admin.mjs [email] [password]
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const text = readFileSync(envPath, 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (!m) continue;
      const key = m[1].trim();
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* optional */
  }
}

loadEnv();

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2] || 'admin@techantum.com';
const password = process.argv[3] || 'TechAntum@2026';

if (!url || !secret) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { count, error: countError } = await supabase
  .from('admin_users')
  .select('*', { count: 'exact', head: true });

if (countError) {
  console.error('Cannot read admin_users table:', countError.message);
  console.error('\nRun the CMS migration first: supabase/migrations/20260620120000_cms.sql');
  process.exit(1);
}

if ((count ?? 0) > 0) {
  const { data: admins } = await supabase.from('admin_users').select('email');
  console.log('Admin account(s) already exist:', admins?.map((a) => a.email).join(', '));
  console.log('Use those credentials, or reset password in Supabase Dashboard → Authentication → Users.');
  process.exit(0);
}

const { data: authData, error: authError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (authError) {
  console.error('Failed to create auth user:', authError.message);
  process.exit(1);
}

const { error: adminError } = await supabase.from('admin_users').insert({
  user_id: authData.user.id,
  email,
});

if (adminError) {
  console.error('Failed to add admin_users row:', adminError.message);
  process.exit(1);
}

console.log('CMS admin created successfully.\n');
console.log('  Email:   ', email);
console.log('  Password:', password);
console.log('\nSign in at: http://localhost:3005/admin/login');
