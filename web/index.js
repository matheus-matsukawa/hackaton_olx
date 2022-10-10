const express = require("express");
const app = express();
const { exec } = require("child_process");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8000;

app.post("/", (req, res) => {
  const {
    postedBy,
    hasRegistering,
    rooms,
    area,
    readyToMove,
    resale,
    address,
  } = req.body;

  const strArgs = [
    postedBy,
    0,
    hasRegistering,
    rooms,
    1,
    area,
    readyToMove,
    resale,
  ].join(" ") + ` "${address}"`;

  exec(
    `python3 ./price_predict/process.py ${strArgs}`,
    (error, stdout, _stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      res.append("Access-Control-Allow-Origin", "*");
      res.append("Access-Control-Allow-Headers", "Authorization");
      res.append(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      );
      res.append("Content-Type", "application/json;charset=UTF-8");

      res.json({ prediction: stdout });
    },
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
