require("dotenv").config();

const express = require("express");
var cors = require('cors')

const app = express();

const routes = require("./routes");

const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cors());

app.use("/api/v1", routes);

// app.use((req, res, next) => {
// 	const success = false;
// 	const status = 404;
// 	const message = "Mau Kemana bro!";
// 	const data = {};
// 	res.status(status).json({ success, message, data   });
//   });

app.listen(port, () => {
	console.log("Server ON");
});