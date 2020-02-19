const express = require('express')
const app = express()
const port = 5000

const routes = require("./routes");

app.use(express.json());

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({ message: "You are not authorized." });
    } else {
      next(err);
    }
  });

  app.listen(port, () => console.log(`Server is running in port ${port}`));