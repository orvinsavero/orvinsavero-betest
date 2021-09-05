require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const errorHandler = require('./helpers/error-handler.js');

mongoose.connect('mongodb://localhost/db_orvinsavero_betest', {useNewUrlParser: true});

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use("/backend", routes);
app.use(errorHandler)


const PORT = 3001;
app.listen(PORT, ()=> {
    console.log(`ON PORT: ${PORT}`);
});
