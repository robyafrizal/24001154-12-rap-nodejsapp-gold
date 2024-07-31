const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtyevm8fs",
  api_key: "492215468748176",
  api_secret: "tHNIkWAVahfdOGpbBrjc3y5IMmg",
});

module.exports = cloudinary;
