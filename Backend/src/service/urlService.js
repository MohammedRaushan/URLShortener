const User = require('../db/models/User');

// Create link function (unchanged)
const createLink = (data, userID) => {
  const linkData = {
    title: "URL for Youtube",
    link: "http://localhost:3000/IvHYtYdr3",
    url: "https://www.youtube.com/",
    clicks: 0,
  };

  User.findById('6730c0296b5f12a4be87602f')
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
