var express = require('express');
var router = express.Router();
var { createLink, editLink, getLink, getAllLinks, deleteLink, deleteAllLinks } = require('../service/urlService');

/* POST add-link */
router.post('/add-link', async (req, res, next) => {
  const { userId, linkData } = req.body;  // Expecting `userID` and `linkData` in the body of the request
  const baseUrl = req.headers.host
  try {
    const response = await createLink(linkData, userId, baseUrl)
    if (response?.details == "Link already exist") {
      return res.status(404).json({ message: 'Error while adding link', details: response.details });
    }
    res.status(200).json({ message: 'Link added successfully', data: response });
  }
  catch (err) {
    res.status(500).json({ error: 'Error while adding link', details: err.message });
  }
});

router.delete("/remove-link/:linkId", async (req, res, next)=>{
  const linkId = req.params.linkId
  try{
    const response = await deleteLink(linkId)
    if(response.details == "Link not found"){
      return res.status(404).json({message:"Link does not exist",details:response.details})
    }
    res.status(200).json({message:"Link has been deleted",data:response})
  }
  catch(err){
    res.status(500).json({ error: 'Error while deleting link', details: err.message });
  }
})

router.delete("/remove-all", async (req, res, next)=>{
  try{
    const response = await deleteAllLinks()
    if(response.details == "Cannot find the links"){
      return res.status(404).json({message:"No links deleted", details:response.details})
    }
    res.status(200).json({message:"All links deleted", data:response})
  }
  catch(err){
    res.status(500).json({ error: 'Error while deleting all links', details: err.message });
  }
})

router.put("/edit-link/:linkId", async (req, res, next)=>{
  const linkId = req.params.linkId
  const linkData = req.body

  try{
    const response = await editLink(linkId, linkData);
    if(response.details == "Link not found"){
      return res.status(404).json({message:"Link not Found",details:response.details})
    }
    res.status(200).json({message:"Link has been updated",data:response})
  }
  catch(err){
    res.status(500).json({ error: 'Error while updating link', details: err.message });
  }
})

router.get("/get-all-links/:userId", async (req, res, next)=>{
  const userId = req.params.userId
  try{
    const response = await getAllLinks(userId)
    if(response.details == "No Links Found"){
      return res.status(404).json({message:"User don't have any links", details:response.details})
    }
    res.status(200).json({message:"List of Links Found", data:response})
  }
  catch(err){
    res.status(500).json({ error: 'Error while fetching all links', details: err.message });
  }
})

router.get("/get-link/:linkId", async (req, res, next)=>{
  const linkId = req.params.linkId
  try{
    const response = await getLink(linkId)
    if(response.details == "Link doesn't exist"){
      return res.status(404).json({message:"Cannot find the link", details:response.details})
    }
    res.status(200).json({message:"Link Details", data:response})
  }
  catch(err){
    res.status(500).json({ error: 'Error while fetching the link', details: err.message });
  }
})

module.exports = router;
