const axios = require("axios");

module.exports = (req, res) => {
  const url = req.query["url"];

  if (!url) {
    return res.status(400).send("No url parameter");
  }

  const startTime = Date.now();
  axios
    .get(url, {
      timeout: 25000,
      maxRedirects: 0,
      validateStatus: false,
    })
    .then((response) => response.status)
    .catch(() => 0)
    .then((status) => {
      const elapsed = Date.now() - startTime;
      res.status(200).json({ url, status, elapsed });
    });
};
