const express = require("express");
const {
  adminsignup,
  adminLogin,
  getallAdmin,
  getAdminDetails,
  deleteAdmin,
  updateAdmin,
  resetAdminPasword,
} = require("../../controller/adminController");
const authenticate = require("../../utils/authenticate");
const restrictTo = require("../../utils/resticted");

const router = express.Router();

router.post("/signup", adminsignup);
router.post("/login", adminLogin);
router.get("/list", authenticate, getallAdmin);
router.get("/details/:id", authenticate, getAdminDetails);
router.put("/delete/:id", authenticate, restrictTo("SUPERADMIN"), deleteAdmin);
router.patch("/update/:id", authenticate, updateAdmin);
router.patch("/reset/password/:adminId",authenticate, resetAdminPasword)
module.exports = router;