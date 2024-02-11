const express = require("express");
const mongooose = require("mongoose");

const app = express();

mongooose.connect("mongodb://admin:password@172.28.0.2:27017/?authSource=admin")
.then(()=>console.log("\n Connected to mongo\n"))
.catch((e) => console.log("\n ERROR:",e));


app.get("/", (req, res)=> {
    res.send("<h2> Hi There ! </h2>");
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listenning on port ${port}`));