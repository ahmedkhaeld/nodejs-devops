const express = require("express");
const mongooose = require("mongoose");
const {MONGO_URI } = require("./config/config");

const app = express();


mongooose.connect(MONGO_URI)
.then(()=>console.log("\n Connected to mongo\n"))
.catch((e) => console.log("\n ERROR:",e));


app.get("/", (req, res)=> {
    res.send("<h2> Hi There ! </h2>");
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listenning on port ${port}`));