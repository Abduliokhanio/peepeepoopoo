const { createClient } = require('@supabase/supabase-js');

let supabase;

const sessions = {
};

const profiles = {
};

async function getCurrentSession({ email, password, supabaseURL, supabaseApiKey, }) {
  if (!supabase) supabase = createClient(supabaseURL, supabaseApiKey);

  const res = await supabase.auth.signInWithPassword({
    email,
    password
  });

  sessions[email] = res.data.session;
  return sessions[email];
}

// TODO: fetch from private schema
async function fetchProfile({ email }) {

  if (!profiles[email]) {
    const res = await supabase
      .from('merchants')
      .select();

    if (res.error) {
      throw res.error;
    }

    [profiles[email]] = res.data;
  }

  return profiles[email];
}

module.exports = {
  fetchProfile,
  getCurrentSession,
};