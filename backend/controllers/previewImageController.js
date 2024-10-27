const { model } = require("mongoose");
const {updatePreviewImage,fetchAllPreviewImageFromShopId} = require('../service/previewImageService')

const updatePreviewImageController = async (req, res) => {
    const files = req.files; // Get the uploaded files

    // Validate the number of uploaded images
    if (!files || files.length < 1 || files.length > 4) {
        return res.status(400).json({ error: 'You must upload between 1 and 4 images.' });
    }

    try {
        const imageLinks = await updatePreviewImage(req); // Use the service to upload images
        res.status(200).json({ previewImage: imageLinks }); // Respond with success and the image links
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ error: 'An error occurred while uploading images.' });
    }
};


const fetchAllPreviewImageFromShopIdController = async (req, res) =>{
    try {
        const previewImage = await fetchAllPreviewImageFromShopId(req)
        res.status(200).send(previewImage)
        // console.log(previewImage)
    } catch (err) {
        if (err.message === 'Shop not Found') {
            return res.status(404).send(err.message)
        }
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = { updatePreviewImageController, fetchAllPreviewImageFromShopIdController};