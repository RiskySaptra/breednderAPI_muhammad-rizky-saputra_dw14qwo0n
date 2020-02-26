require("dotenv").config();

const express = require("express");
var cors = require('cors')

const app = express();

const routes = require("./routes");

const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cors());

app.use("/api/v1", routes);

app.listen(port, () => {
	console.log("Server ON");
});