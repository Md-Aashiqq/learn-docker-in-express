const express = require("express");

const mongoose = require("mongoose");
const session = require("express-session");

const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});

const postRouter = require("./routes/PostRoutes");
const userRouter = require("./routes/UserRoutes");

const {
  MONGO_USER,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  SESSION_SECERT,
} = require("./config/config");
const app = express();
const port = process.env.PORT || 3000;

//middleWare
app.use(cors({}));
app.enable("trust proxy");
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,

      httpOnly: true,
      maxAge: 300000,
    },
  })
);

// db connection

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("sucesss"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hello World!!!</h2>" + port);
  console.log("tid on ");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`server listening port ${port}`);
});
