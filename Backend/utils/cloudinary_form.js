var cloudinary = require("./cloudinary_config");

const cloudForm = (filename) => {
  return new Promise((resolve) => {
    console.log(filename, "hey");
    cloudinary.uploader.upload(
      filename,
      {
        folder: "gallery",
      },
      (err, result) => {
        resolve({
          url: result.url,
        });
      }
    );
  });
};

module.exports = cloudForm;
