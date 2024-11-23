var express = require('express');
var router = express.Router();
var { createUser, getUser, getAllUsers, getUserByEmailAndPassword, deleteUser, updateUser } = require('../service/userService');

/* POST create-user */
router.post('/create-user', async function (req, res, next) {
  try {
    const userData = req.body;  // Get user data from the request body
    const user = await createUser(userData);  // Call the createUser function
    res.status(200).json(user);  // Send the created user data in the response
  } catch (err) {
    res.status(400).json({ error: "Error while creating user", details: err.message });
  }
});

// GET Fetch all users
router.get('/',async (req, res, next)=>{
  try{
    const response = await getAllUsers()
    if(response.message == "Users not found"){
      return res.status(404).json({message:"Users not found"})
    }
    res.status(200).json(response)
  }
  catch(err){

  }
})

// GET get-user
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const response = await getUser(userId)

    if(response.message == "User not found"){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: "Error while fetching user", details: err.message });
  }
})
router.get('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body
    const response = await getUserByEmailAndPassword(email, password)

    if(response.message == "User not found"){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: "Error while fetching user", details: err.message });
  }
})

// PUT update-user
router.put("/update/:userId", async (req, res, next) =>{
  try {
    const userId = req.params.userId
    const data = req.body
    const response = await updateUser(userId, data)
    if(response.message == "User not found"){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: "Error while updating user", details: err.message });
  }
})


/* DELETE delete-user */
router.delete('/delete-user', async (req, res, next) => {
  try {
    const userId = req.body.userId;  // Get the userId from the request body
    const response = await deleteUser(userId);  // Call the deleteUser function

    if (response.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Error while deleting user", details: err.message });
  }
});

module.exports = router;
