const Gallery = require("../models/gallery");
const cloudForm = require("../utils/cloudinary_form");
const formidable = require("formidable");

import { catchAsync, CustomErrorHandler } from "../utils";

export const createGallery = catchAsync(async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(new CustomErrorHandler("error in form parse", 404));
    }
    const gallery = new Gallery(fields);

    if (files.imagelink) {
      if (files.imagelink.size > 2097152) {
        return next(new CustomErrorHandler("File size too big", 400));
      }
      let imageupload = files.imagelink;

      const result = await cloudForm(imageupload.path);

      let imagelink = result.url;

      gallery.imagelink = imagelink;
    }

    gallery
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        return next(new CustomErrorHandler("Failed to create Category", err));
      });
  });
});

export const updateGallery = catchAsync(async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    const id = req.params.heyid;
    console.log(id, "hey");
    if (err) {
      return next(new CustomErrorHandler("error in form parse", 404));
    }
    const gallery = req.gallery;

    if (files.imagelink) {
      if (files.imagelink.size > 2097152) {
        return next(new CustomErrorHandler("File size too big", 400));
      }
      let imageupload = files.imagelink;

      const result = await cloudForm(imageupload.path);

      let imagelink = result.url;

      // gallery.imagelink = imagelink;
      const query = { _id: id };
      Gallery.findOneAndUpdate(
        query,
        { $set: { imagelink: imagelink } },
        {
          new: true,
          useFindAndModify: false,
        }
      ).then((gal, err) => {
        if (err) {
          return next(
            new CustomErrorHandler(
              "Something went wrong updating Artistic Profile",
              400
            )
          );
        }
        return res.status(200).json(gal);
      });
    }
  });
});

export const getAllGallery = catchAsync((req, res, next) => {
  Gallery.find({}).then((not) => {
    if (!not) {
      return next(new CustomErrorHandler("gallery not found", 400));
    }
    return res.status(200).json(not);
  });
});

export const getAGallery = catchAsync((req, res, next) => {
  const id = req.params.id;
  Gallery.find({ admin: id }).then((not) => {
    if (!not) {
      return next(new CustomErrorHandler("gallery not found", 400));
    }
    return res.status(200).json(not);
  });
});

export const deleteNotice = catchAsync((req, res, next) => {
  const { galleryId } = req.params;
  console.log(req.params);
  Gallery.deleteOne({ _id: galleryId }).then((not) => {
    if (!not) {
      return next(new CustomErrorHandler("gallery not found", 400));
    }
    return res
      .status(200)
      .json({ status: "succes", message: "notice deleted", not });
  });
});
