var express = require("express");
var router = express.Router();
import {
  createNotice,
  getAllnotice,
  updateNotice,
  deleteNotice,
  getNoticeByAdmin,
} from "../controllers/notice";
router.get("/get", getAllnotice);
router.get("/get/:adminId", getNoticeByAdmin);
router.post("/create", createNotice);
router.put("/update", updateNotice);
router.delete("/delete/:noticeId", deleteNotice);

export default router;
