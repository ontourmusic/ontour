// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

//import { Handler, serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
require('dotenv').config();
console.log("Hello from Functions!")
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  //const fetchUrl = "https://www.nme.com/wp-content/uploads/2022/07/Adele-performing-at-Hyde-Park.jpg";
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  // Check if GET request
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    // Fetch image from fetchUrl
    const url = req.url; // e.g., "/fetch-artist-image?artistId=123"
    console.log("URL is :", url);
    const urlSplit = url.split("?");
    if (urlSplit.length <= 1){
      return new Response("Artist ID Missing", { status: 404 });
    }
    const getImageId = urlSplit[1];
    const getParameter = getImageId.split("=");
    if( getParameter.length > 1 && (getParameter[0] != 'artistId' && getParameter[0] != 'venueId' && getParameter[0] != 'festivalId' ) ){
      return new Response("GET Artist ID Missing", { status: 404 });
    }
    var tableName = '';
    var compareColumn = '';
    switch(getParameter[0]){
      case 'artistId':
          tableName = 'artists';
          compareColumn = 'artist_id';
          break;
      case 'venueId':
        tableName = 'venues';
        compareColumn = 'venue_id';
        break;
      case 'festivalId':
        tableName = 'festivals';
        compareColumn = 'id';
        break;
    }
    const valueId = getParameter[1];
    console.log("table:", tableName);
    console.log("colummn:", compareColumn);
    console.log("valueId to search:", valueId);

      const supabaseClient = createClient(
      
      // Supabase API URL - env var exported by default.
      'https://zouczoaamusrlkkuoppu.supabase.co',
      // Supabase API ANON KEY - env var exported by default.
       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNTg1MjEsImV4cCI6MTk5MzczNDUyMX0.T-vjkWIKobH1SwMOh528rMt4Pmeu1WlDHZVTlJ-QLwU'
      );
      const { data, error } = await supabaseClient.from(tableName).select('*').eq(compareColumn,valueId).single();
      if (error) {
        console.error("Error fetching artist:", error);
        return new Response("Missing Artist", { status: 500 });
      }
  
      if (!data) {
        return new Response("Artist not found", { status: 404 });
      }
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      
    const response = await fetch(data.banner_image); //fetchUrl
    const imageBlob = await response.blob();

    // Set headers for image response
    const headers = new Headers({
      "Content-Type": imageBlob.type,
      "Access-Control-Allow-Origin": "*", // Allow all origins for testing
    });

    // Return image from returnUrl (optional)
    //return new Response(await fetch(returnUrl), { status: 200, headers });

    // Or, return the fetched image directly
     return new Response(imageBlob, { status: 200, headers });

  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response("Failed to fetch image", { status: 500 });
  }


  // const { name } = await req.json()
  // const data = {
  //   message: `Hello ${name}!`,
  // }

  // return new Response(
  //   JSON.stringify(data),
  //   { headers: { "Content-Type": "application/json" } },
  // )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/fetch-artist-image' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
