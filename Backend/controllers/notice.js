import { catchAsync, CustomErrorHandler } from "../utils";
import joi from "joi";

const Notice = require("../models/notice");

export const createNotice = catchAsync(async (req, res, next) => {
  const { admin, notice } = req.body;

  if (!admin || !notice) {
    return next(new CustomErrorHandler("Please provide all the field ", 404));
  }

  const schema = joi.object({
    admin: joi.string().min(3).required(),

    notice: joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new CustomErrorHandler("Invalid data", 400));
  }

  const creatednotice = await Notice.create({
    admin,
    notice,
  });

  res.status(201).json({
    status: "success",
    message: "admin created",
    creatednotice,
  });
});

export const getAllnotice = catchAsync((req, res) => {
  Notice.find({})
    .populate("admin")
    .then((not) => {
      return res.status(200).json(not);
    });
});

export const getNoticeByAdmin = catchAsync(async (req, res, next) => {
  Notice.find({ admin: req.params.adminId }).then((notices) => {
    return res.status(200).json(notices);
  });
});

export const updateNotice = catchAsync((req, res) => {
  const { noticeId, notice } = req.body;
  if (!noticeId) {
    return res.status(400).json("please provide notice id");
  }

  Notice.updateOne(
    { _id: noticeId },
    {
      $set: {
        notice: notice,
      },
    },
    { new: true }
  ).then((not) => {
    if (not === null) {
      return res
        .status(400)
        .json({ status: "failed", message: "no notice exist " });
    } else {
      return res
        .status(200)
        .json({ status: "succes", message: "notice updated", not });
    }
  });
});

export const deleteNotice = catchAsync((req, res) => {
  const { noticeId } = req.params;

  Notice.deleteOne({ _id: noticeId }).then((not) => {
    return res
      .status(200)
      .json({ status: "succes", message: "notice deleted", not });
  });
});
