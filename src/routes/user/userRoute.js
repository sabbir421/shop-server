const express = require("express");
const {
  sendOTP,
  userSignup,
  userLogin,
  updateUser,
  getCustomerDetails,
  getAllCustomer,
  deleteCustomer,
} = require("../../controller/authentication");
const {
  // vendorSignup,
  // sendVendorOTP,
  // vendorLogin,
  // updateVendor,
  getPendingVendor,
  getPendingVendorDetails,
  approveVendor,
  rejectVendorRequest,
} = require("../../controller/sellerController");
// const {
//   uploadVendorDetails,
// } = require("../../controller/vendorDetailsController");
const multer = require("multer");
const authenticate = require("../../utils/authenticate");
const restrictTo = require("../../utils/resticted");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const router = express.Router();

//Customer

router.post("/otp", sendOTP);
router.post("/signup", userSignup);
router.post("/customer/login", userLogin);
router.patch("/customer/update/:id", authenticate, updateUser);
router.get("/customer/:id", getCustomerDetails);
router.get("/list", getAllCustomer);
router.patch("/delete/:id", authenticate, deleteCustomer);
// vendor
// router.post("/vendor/otp", sendVendorOTP);
// router.post("/vendor/signup", vendorSignup);
// router.post("/vendor/login", vendorLogin);
// router.patch("/vendor/update/:id", authenticate, updateVendor);
// router.post(
//   "/vendor/details/:id",
//   upload.fields([
//     { name: "profileImage", maxCount: 1 },
//     { name: "idProofFile", maxCount: 1 },
//     { name: "addressProofFile", maxCount: 1 },
//   ]),
//   authenticate,
//   uploadVendorDetails
// );
router.get("/vendor/pending/list", authenticate, getPendingVendor);
router.get("/vendor/details/:id", authenticate, getPendingVendorDetails);
router.put(
  "/vendor/approve/:id",
  authenticate,
  restrictTo("ADMIN", "SUPERADMIN"),
  approveVendor
);
router.delete(
  "/vendor/reject/:id",
  authenticate,
  restrictTo("ADMIN", "SUPERADMIN"),
  rejectVendorRequest
);
module.exports = router;
