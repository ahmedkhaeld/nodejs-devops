const express = require("express");
const mongooose = require("mongoose");
const {MONGO_URI, REDIS_URI, SESSION_SECRET } = require("./config/config");
let session = require('express-session');
const {createClient} = require('redis');
const RedisStore = require("connect-redis").default

//import routes
const postRouter = require("./routers/post.routes")
const userRouter = require("./routers/user.routes");


/**
 * configure redis client from the container
 * redis driver with the client configuration
 * session structure
 * set the session middleware in the app
 * 
 */
const client = createClient({url:REDIS_URI})
async function connectRedis() {
    try {
      await client.connect();
      console.log("Connected to Redis!!!!!");
    } catch (error) {
      console.error("Redis Client Error:", error);
      process.exit(1); // Exit gracefully if connection fails
    }
  }

  connectRedis();
  



// initialize the app, set middlewares
const app = express();
app.use(session({
    store:  new RedisStore({client: client}),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
         secure: false,
         httpOnly: true,
         maxAge: 30000000000
         }
  }))

app.use(express.json());



mongooose.connect(MONGO_URI)
.then(()=>console.log("Connected to MongoDB!!!"))
.catch((e) => console.log("\n ERROR:",e));


app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listenning on port ${port}`));