const express = require("express");
const app = express();
const fs = require("fs");
const { exec } = require("child_process");

app.set("views", "web/views");
app.set("view engine", "ejs");
app.use(express.static("assets"));

if (!fs.existsSync("temp")) {
  fs.mkdirSync("temp");
}

const port = 3000;

app.get("/", (req, res) => {
  exec(
    "deno run -A externalAppTest.ts",
    (error, _stdout, _stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      const rawData = fs.readFileSync("./temp/test.json");
      const user = JSON.parse(rawData);
      fs.unlinkSync("./temp/test.json");
      res.render("index", { name: user.name, city: user.city });
    },
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
