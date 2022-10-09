const express = require("express");
const app = express();
const { exec } = require("child_process");

app.set("views", "web/views");
app.set("view engine", "ejs");
app.use(express.static("assets"));

const port = 8000;

app.get("/", (req, res) => {
  const strArgs = [2, 1, 1, 2, 1, 1090.83, 1, 1, "Palanpur,Surat"].join(" ");
  exec(
    `python3 ./predict_price/process.py ${strArgs}`,
    (error, stdout, _stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      res.send(stdout);
    },
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
