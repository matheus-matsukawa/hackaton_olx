const express = require("express");
const app = express();
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
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
    address,
  ].join(" ");
  console.log(`
  
  ${strArgs}
  
  `);
  exec(
    `python3 ./price_predict/process.py ${strArgs}`,
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
