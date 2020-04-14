require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const authRouter = require("./routes/auth");
const employeesRouter = require("./routes/employees");
const menusRouter = require("./routes/menus");
const dishesRouter = require("./routes/dishes");
const tablesRouter = require("./routes/tables");
const ordersRouter = require("./routes/orders");

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error(err));

// EXPRESS SERVER INSTANCE
const app = express();

// CORS MIDDLEWARE SETUP
app.use(
  cors({
    credentials: true,
    origin: [ process.env.PUBLIC_DOMAIN, 'https://mgbite-2bc7a.firebaseapp.com/' ],
  })
);

// SESSION MIDDLEWARE
app.use(
  session({
    store: new MongoStore({
      autoRemove: "interval",
      autoRemoveInterval: 10,
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    name: "userCookie",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
  })
);

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTER MIDDLEWARE
app.use("/auth", authRouter);
app.use("/employees", employeesRouter);
app.use("/menus", menusRouter);
app.use("/dishes", dishesRouter);
app.use("/tables", tablesRouter);
app.use("/orders", ordersRouter);

// ERROR HANDLING
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});

module.exports = app;
