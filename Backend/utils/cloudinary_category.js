var cloudinary = require("./cloudinary_config");

const GalleryStorage = (filename, categoryname) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      filename,
      {
        folder: `digilabs/gallery`,
      },
      (err, result) => {
        resolve({
          id: result._id,
          url: result.url,
        });
      }
    );
  });
};

module.exports = GalleryStorage;
