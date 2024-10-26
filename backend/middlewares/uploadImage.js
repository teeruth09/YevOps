const multer = require('multer')
const s3Storage = require('../configs/s3')

// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = ['.png', '.jpg', '.jpeg', '.gif']

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  )

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith('image/')

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true) // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb('Error: File type not allowed!')
  }
}

// our middleware
const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback)
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
})

module.exports = uploadImage
