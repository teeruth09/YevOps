const jwt = require('jsonwebtoken')

const Shop = require('../models/shop')
const config = process.env

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('../configs/s3')

const updatePreviewImage = async (req) => {
    try {
      const token = req.body.token || req.query.token || req.headers['x-access-token']
      if (!token) {
        throw new Error('Token is required')
      }
  
      const { user_id } = jwt.verify(token, config.TOKEN_KEY)
  
      let  user = await Shop.findById(user_id)
      
      if (!user) {
        throw new Error('Shop not Found')
      }
      const imageLinks = [];

      const files = req.files
      let uploadResult = ''
    //   if(file){
    //     console.log("siajigjai",file)
    //     uploadResult = await uploadFile(file)
    //     await unlinkFile(file.path)
    //     console.log(uploadResult)
    //     console.log(uploadResult.Key)
    //   }
    //   // const imageLink = `blob:http://localhost:5173/${uploadResult.Key}`
    //   let imageLink = `http://localhost:5555/images/${uploadResult.Key}`
      
      for (const file of files) {
        uploadResult = await uploadFile(file); // Upload logic (e.g., S3)
        await unlinkFile(file.path); // Remove the file from the server after uploading
        const imageLink = `http://localhost:5555/images/${uploadResult.Key}`; // Construct the image URL
        imageLinks.push(imageLink); // Add the URL to the array
    }
      
      // Update the previewImage field in the Shop document
      // await Shop.findByIdAndUpdate(user_id, { previewImage: imageLinks });
      await user.updateOne({previewImage: imageLinks})
    return imageLinks;

    } catch (err) {
      throw new Error(err.message || 'Error updating Image fail')
    }
  }

const fetchAllPreviewImageFromShopId = async (req) =>{
  try{
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
      throw new Error('Token is required')
    }

    const { user_id } = jwt.verify(token, config.TOKEN_KEY)

    let user = await Shop.findById(user_id)
    if (!user) {
      throw new Error('Shop not Found')
    }

    const profile = {
      shopName: user.shopName,
      previewImage: user.previewImage,
    }


    return profile
  }catch(err){
    throw new Error(err.message || 'Error fetching profile')
  }
}


module.exports = {updatePreviewImage,fetchAllPreviewImageFromShopId}