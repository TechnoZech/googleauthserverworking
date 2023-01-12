const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth");

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}


const app = express();
app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



// app.get("/", (req, res) => {
//     res.send('<a href="/auth/google"> Auth with Google </a>');
// });


app.get("/auth/google", 
    passport.authenticate("google", {scope: ["email", "profile"]})
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/Secret",
        failureRedirect: "/auth/failure"
    })
);

app.get("/auth/failure", (req, res)=> {
    res.send("Something went wrong. User dind't verified");
})

app.get("/Secret", isLoggedIn, (req, res)=> {
    res.send(`Hello this is secret page ${req.user.displayName}`);
});

app.get("/logout", (req, res)=>{
    req.logout(req.user, err =>{
        if(!err){
            req.session.destroy();
            res.send("goodbye!");
        }
    });
    
})

app.listen(5000, ()=>console.log("listening on port 5000"));