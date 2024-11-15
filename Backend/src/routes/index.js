var express = require('express');
var router = express.Router();
var { createLink } = require('../service/urlService');

/* POST add-link */
router.post('/add-link', (req, res, next) => {
  // You can implement logic to add a link for a specific user
  // This route can use the `createLink` function to add a link to a user's URL list

  const { userID, linkData } = req.body;  // Expecting `userID` and `linkData` in the body of the request
  
  // Assuming `createLink` is a function that adds a link to a user's URLs
  createLink(linkData, userID)
    .then((updatedUser) => {
      res.status(200).json({ message: 'Link added successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error while adding link', details: err.message });
    });
});

module.exports = router;
