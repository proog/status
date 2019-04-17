"use strict";

const request = require("request");

module.exports = (ctx, cb) => {
  const url = ctx.query.url;

  if (!url) return cb("No url parameter");

  const startTime = Date.now();
  const options = { url, timeout: 25000, timing: true, followRedirect: false };

  request(options, (err, res) => {
    const elapsed = res ? Math.round(res.timings.end) : Date.now() - startTime;
    const status = res ? res.statusCode : 0;

    cb(null, { url, status, elapsed });
  });
};
