import cors from "@koa/cors";
import Axios from "axios";
import Koa from "koa";

const app = new Koa();

app.use(cors());
app.use(async (ctx) => {
  const url = ctx.query["url"];

  if (!url) ctx.throw("No url parameter", 400);

  const startTime = Date.now();
  const status = await Axios.get(url, {
    timeout: 25000,
    maxRedirects: 0,
    validateStatus: false,
  })
    .then((response) => response.status)
    .catch(() => 0);
  const elapsed = Date.now() - startTime;

  ctx.body = { url, status, elapsed };
});

const port = +process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
