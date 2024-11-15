const User = require('../db/models/User');

// Create link function (unchanged)
const createLink = (data, userID) => {
  const linkData = {
    title: data.title,
    link: "http://localhost:3000/IvHYtYdr3", // duplicate link
    url: data.url,
    clicks: 0,
  };

  User.findById(userID)
    .then((res) => {
      res.urls.push(linkData);
      res.save()
        .then(() => {
          console.log("User Updated");
          return res;
        })
        .catch(() => {
          console.log("Error while updating");
          return;
        });
    });
};

module.exports = { createLink };
