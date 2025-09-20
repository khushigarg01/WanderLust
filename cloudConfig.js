const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('@fluidjs/multer-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',           // folder name in Cloudinary
        allowedFormats: ['jpg', 'jpeg', 'png'],
        // transformation: [{ width: 800, height: 800, crop: "limit" }]
    }
});

module.exports = {
    cloudinary,
    storage,
};