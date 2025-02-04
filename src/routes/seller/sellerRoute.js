const express = require("express");
const { sellerSignup, sellerLogin } = require("../../controller/sellerController");



const router = express.Router();
router.post("/signup", sellerSignup);
router.post("/login", sellerLogin);
// router.patch(
//   "/update/:id",
//   upload.fields([
//     { name: "profileimage", maxCount: 1 },
//     { name: "idProofFile", maxCount: 1 },
//     { name: "addressProofFile", maxCount: 1 },
//   ]),
//   updateVendorDetails
// );
// router.post(
//   "/details/:id",
//   upload.fields([
//     { name: "profileimage", maxCount: 1 },
//     { name: "idProofFile", maxCount: 1 },
//     { name: "addressProofFile", maxCount: 1 },
//   ]),
//   uploadVendorDetails
// );

// router.get("/details/:id", getVendorDetails);
// router.get("/active/list", authenticate, getActiveVendor);
// router.patch("/password/reset/:id", authenticate, resetPassword);
// router.post("/forget/otp", sendForgetPasswordOTP);
// router.post("/match/forget/password/otp", matchForgetPasswordOtp);
// router.patch("/forget/password", forgetPassword);
module.exports = router;
