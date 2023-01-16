const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
require('dotenv').config()

app.use(
  cookieSession({ 
    name: "session", 
    keys: ["lama"], 
    maxAge: 24 * 60 * 60 * 100, 
    httpOnly: true,
    sameSite: 'none', 
    secure: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    
  })
);

app.use("/auth", authRoute);


app.listen(process.env.PORT, () => {
    console.log(`Listenting on port ${process.env.PORT}...`)
});
