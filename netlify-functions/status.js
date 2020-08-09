const axios = require("axios");

exports.handler = async (event, context) => {
  const url = event.queryStringParameters["url"];

  if (!url) {
    return { statusCode: 400, body: "No url parameter" };
  }

  const startTime = Date.now();
  const status = await axios
    .get(url, {
      timeout: 25000,
      maxRedirects: 0,
      validateStatus: false,
    })
    .then((response) => response.status)
    .catch(() => 0);
  const elapsed = Date.now() - startTime;

  return {
    statusCode: 200,
    body: JSON.stringify({ url, status, elapsed }),
  };
};
