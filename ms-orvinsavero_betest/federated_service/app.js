require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require('cors');
const app = express();
const errorHandler = require('./helpers/error-handler.js');


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(errorHandler)


const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`ON PORT: ${PORT}`);
});
