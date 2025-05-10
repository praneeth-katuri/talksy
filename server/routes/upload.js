const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Tasky/profile-pictures",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  },
});

const upload = multer({ storage });
