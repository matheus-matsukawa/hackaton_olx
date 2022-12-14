const express = require("express");
const app = express();
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 8000;

app.options("/*", (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append(
    "Access-Control-Allow-Headers",
    "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
  );
  res.append(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.append("Content-Type", "application/json");
  res.append("Access-Control-Max-Age", 1728000);
  res.append("Content-Length", 0);
  res.status(204).send();
});

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
      res.append("Access-Control-Allow-Headers", "*");
      res.append(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      );
      res.append("Content-Type", "application/json");

      res.json({ prediction: stdout });
    },
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
