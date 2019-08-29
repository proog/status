addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = request.url
    .split(/\?|&/)
    .filter(query => query.startsWith("url="))
    .map(query => query.replace("url=", ""))
    .map(decodeURIComponent)
    .shift();

  if (!url)
    return new Response("No url parameter", {
      status: 400,
      headers: corsHeaders
    });

  const startTime = Date.now();
  const status = await fetch(url, { redirect: "manual" })
    .then(response => response.status)
    .catch(() => 0);
  const elapsed = Date.now() - startTime;

  const responseJson = JSON.stringify({ url, status, elapsed });
  return new Response(responseJson, {
    status: 200,
    headers: corsHeaders
  });
}
