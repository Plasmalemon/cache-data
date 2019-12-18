const Koa = require("koa");
const cacheData = require("./src/cache-data");
const fetchData = require("./src/api");
const router = require("koa-router")();
const port = 3001;

const app = new Koa();
app.use(cacheData());

// app.use(async (ctx, next) => {
//   //   ctx.body = await fetchData();

//   await next();
//   ctx.body = await fetchData();
// });

router.get("/api/data", async (ctx, next) => {
  await next();
  ctx.body = await fetchData();
});
app.use(router.routes());
app.listen(port, () => {
  console.log(`启动服务，http://localhost:${port}`);
});
