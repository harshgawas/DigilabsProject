import express from "express";
import { createAdmin, adminSignin } from "../controllers/admin";

var router = express.Router();

router.route("/create").post(createAdmin);
router.route("/signin").post(adminSignin);

export default router;
