import express from "express";

import { submitForm, getAllContacts } from "../controllers/contact";

var router = express.Router();

router.route("/create").post(submitForm);
router.route("/get").get(getAllContacts);

export default router;
