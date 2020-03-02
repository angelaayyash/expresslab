const express = require("express");
const cors = require("cors");
const { cartRoutes } = require("./route.js");
// config
const port = 8080;
// creates an instance of an Express Server
const app = express();
// enable cors
app.use(cors());
// allow json request bodies for put and post
app.use(express.json());
// routes
app.use("/", cartRoutes);

app.listen(port, () => console.log(`Listening on port ${port}.`));
