const User = require("../models/userModel")



const authorizeSubscribers = (req, res, next) => {
  

    if (req.user.subscription.status !== "active" ){
      res.status(404);
    throw new Error("Need to Subcribe to use this feature");
    }else {
      next();
    }
  }
  

  


  module.exports = authorizeSubscribers;