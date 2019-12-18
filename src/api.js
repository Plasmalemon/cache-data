module.exports = fetchData =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve("large data");
      console.log("time");
    }, 500);
  });
