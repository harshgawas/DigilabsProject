import { catchAsync, CustomErrorHandler } from "../utils";
import joi from "joi";

const Admin = require("../models/admin");

export const createAdmin = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new CustomErrorHandler("Please provide all the field ", 404));
  }

  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new CustomErrorHandler("Invalid data", 400));
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    message: "admin created",
    admin,
  });
});

export const adminSignin = catchAsync((req, res, next) => {
  const { email, password } = req.body;
  Admin.findOne({ email: email }).then((add) => {
    if (add === null) {
      return next(new CustomErrorHandler(" admin not found failed", 400));
    } else {
      if (add.password === password) {
        return res
          .status(200)
          .json({ status: "succes", message: "admin logged in", add });
      } else {
        return next(new CustomErrorHandler(" password dont match", 400));
      }
    }
  });
});
