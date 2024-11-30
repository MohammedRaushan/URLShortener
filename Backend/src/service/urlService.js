const Link = require('../db/models/Link');

// Create link function (unchanged)
const createLink = async (data, baseUrl) => {
  try {
    let isLinkExist;
    let routelink;
    while(true){
      routelink = generateLink(baseUrl)
      isLinkExist = await Link.find({ "link": routelink })
      if(isLinkExist.length == 0){
        break
      }
    }
    if (isLinkExist.length == 0) {
      const link = new Link({
        title: data.title,
        link: routelink,
        actualUrl: data.actualUrl,
        userId: data.userId,
        clicks: 0,
      })
      return link.save()
    }
    return { details: "Link already exist" }
  }
  catch (err) {
    return { error: "Something went wrong while creating link" }
  }
};

const deleteLink = async (linkId) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(linkId);
    if (!deletedLink) {
      return { details: "Link not found" };
    }
    return deletedLink;
  } catch (err) {
    return { error: "Something went wrong while deleting the link" };
  }
};

const deleteAllLinks = async ()=>{
    const deletedLinks = await Link.deleteMany()
    if(!deleteAllLinks){
      return {details:"Cannot find the links"}
    }
    return deleteAllLinks
}

const editLink = async (linkId, updatedData) => {
  try {
    // const link = await Link.findById(linkId)
    // if(!link){
    //   return {details:"Link does not exist"}
    // }
    // link
    const updatedLink = await Link.findByIdAndUpdate(
      linkId,
      { ...updatedData },
      { new: true }  // Return the updated document
    );
    if (!updatedLink) {
      return { details: "Link not found" };
    }
    return updatedLink;
  } catch (err) {
    return { error: "Something went wrong while updating the link" };
  }
};

const getAllLinks = async (userId) =>{
  try {
    const links = await Link.find({"userId":userId})
    if(!links){
      return {details:"No Links Found"}
    }
    return links
  } catch (err) {
    return { error: "Something went wrong while fetching all the links" };
  }
}

const getLink = async (linkId) =>{
  try {
    const link = await Link.find({_id:linkId})
    if(!link){
      return {details:"Link doesn't exist"}
    }
    return link
  } catch (err) {
    return { error: "Something went wrong while fetching the link" };
  }
}

const getRedirectLink = async (r_link) =>{
  try {
    const link = await Link.find({link:r_link})
    if(!link){
      return {details:"Link doesn't exist"}
    }
    return link
  } catch (err) {
    return { error: "Something went wrong while fetching the link" };
  }
}


const generateLink = (baseUrl)=>{
  const letters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let result = ""
  for(let i=0;i<8;i++){
    result += letters[Math.ceil(Math.random()*letters.length-1)];
  }
  return baseUrl+""+result
}
module.exports = { createLink, editLink, getLink, getAllLinks, getRedirectLink, deleteLink, deleteAllLinks };
