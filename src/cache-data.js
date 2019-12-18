const schedule = require("node-schedule");

let cacheStore = {};

module.exports = (config = {}) => {
  let { urls } = config;
  console.log("urls", urls);

  // 当前时间的秒值为 10 时执行任务，如：2018-7-8 13:25:10
  schedule.scheduleJob("0 * * * * *", () => {
    // "10 * * * * *"
    cacheStore = {};
    console.log(new Date().toLocaleTimeString());
  });

  return async (ctx, next) => {
    // console.log(ctx, "ctx");

    // 如果urls存在 并且 不是数组
    if (urls && !Array.isArray(urls)) {
      urls = [urls];
    }

    const isMatching = urls ? urls.some(url => url === ctx.url) : true;

    // 是否匹配路由
    if (!isMatching) {
      await next();
      return;
    }

    const cacheData = cacheStore[ctx.url];
    if (cacheData) {
      ctx.body = cacheData;
      console.log("cache");
    } else {
      await next();
      console.log("no cache");
      const data = ctx.body;

      //   console.log(ctx, "ctx.body");
      cacheStore[ctx.url] = data;
      console.log(cacheStore, "cacheStore");
    }
    // await next();
  };
};
