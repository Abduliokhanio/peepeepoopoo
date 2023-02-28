// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  };

serve(async (req) => {


  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  const { url } = await req.json();

  const res = await fetch(url, { method: 'POST' });
  const resJson = await res.text();

  return new Response(JSON.stringify(resJson), {
    headers: {
      ...corsHeaders, 'Content-Type': 'application/json'
    },
    status: 200
  });
})

