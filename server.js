const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport")
const cookieSession = require("cookie-session")
const passportSetup = require("./passport")
const app = express();
const { auth } = require('express-openid-connect');
const Razorpay = require('razorpay')
const payment = require('./routes/paymentRoutes')



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: "228975307873-ffn5klsj71qf2r0ie4b3pv67bigo8pqa.apps.googleusercontent.com",
  issuerBaseURL: 'https://dev-a2pq8pf7p1yibmde.us.auth0.com'
};


app.use(auth(config));

//app.get('/', (req, res) => {
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//});
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cookieSession({
    name:"session",
    keys:['cyblerwolve'],
    maxAge: 24 * 60 * 60 * 100,
  })
)



// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://infispecinventorymanage.vercel.app"],
    credentials: true,
    methods:["GET", "POST"," PUT", "DELETE"]
  })
);

app.use("/api/users", userRoute);  
app.use("/api/users", payment);  
app.get("/",(req,res)=>res.send("<h1>Backend is working , site is working on. <a href=`https://infispecinventorymanage.vercel.app`> click here </a>click to visit the website </h1>"))

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
