const express = require("express");
const app = express();
const port = 4000;

app.get("/", (_: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
