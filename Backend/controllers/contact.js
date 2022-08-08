import { catchAsync, CustomErrorHandler } from "../utils";
import joi from "joi";

const Contact = require("../models/contact");

export const submitForm = catchAsync(async (req, res, next) => {
  const { name, email, phone, query } = req.body;

  if (!name || !email || !phone || !query) {
    return next(new CustomErrorHandler("Please provide all fields", 404));
  }

  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.number().min(10).required(),
    query: joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new CustomErrorHandler("Invalid Data", 400));
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    query,
  });

  res.status(200).json({
    status: "success",
    message: "query created",
    contact,
  });
});

export const getAllContacts = catchAsync((req, res, next) => {
  Contact.find({}).then((not) => {
    if (!not) {
      return next(new CustomErrorHandler("gallery not found", 400));
    }

    return res.status(200).json(not);
  });
});
