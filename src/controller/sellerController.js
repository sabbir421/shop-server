const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const errorResponseHandler = require("../utils/errorResponseHandler");

const { validate } = require("../validation/validator");
const { hashPasswordFunc } = require("../helper/hashPassword");
const { createVendorRules } = require("../validation/validationRules");
const { variables } = require("../config/variables");
const {
  totalSeller,
  sellerSignup,
  findsellerByEmailOrMobile,
} = require("../models/sellerModel");

exports.sellerSignup = async (req, res) => {
  try {
    const {
      userName,
      country,
      email,
      password:orginalpass,
      mobile,
    } = req.body;
    console.log(req.body);
    // validate(
    //   {
    //     name,
    //     email,
    //     password: orginalpass,
    //     lastName,
    //     mobile,
    //     regType,
    //   },
    //   createVendorRules
    // );
    // const cachedOTP = otpCache[email];

    // if (regType === "email") {
    //   if (
    //     !cachedOTP ||
    //     otp !== cachedOTP.otp ||
    //     Date.now() > cachedOTP.timestamp
    //   ) {
    //     return res.response.fail(null, "Invalid or expired OTP");
    //   }
    // }
console.log(orginalpass);

    const password = await hashPasswordFunc(orginalpass);
    const userData = {
      userName,
      country,
      email,
      password,
      mobile,
    };
    console.log(req.body);

    const totalUsers = await totalSeller();
    let isUserExist = {};
    if (totalUsers > 0) {
      isUserExist = await vendorByEmailOrMobile({ email, mobile });
    }

    if (isUserExist?.id) {
      return res.response.fail(null, "User already exists");
    }

    let response = await sellerSignup(userData);

    if (response) {
      const access = jwt.sign(
        {
          id: response.id,
          email: response.email,
          status: response.status,
        },
        variables.jwtSecret,
        { expiresIn: "2160h" }
      );
      const refresh = jwt.sign(
        {
          id: response.id,
          email: response.email,
          status: response.status,
        },
        variables.refreshTokenSecrat,
        { expiresIn: "30d" }
      );
      response.api_token = { access, refresh };
      return res.response.success(response, "Signup successful");
    }
  } catch (error) {
    console.log(error);

    errorResponseHandler(res, error);
  }
};

exports.sellerLogin = async (req, res) => {
  try {
    const { credential, password, firebaseToken } = req.body;

    let user = {};

    user = await findsellerByEmailOrMobile(credential);

    if (!user) {
      return res.response.fail(null, "Invalid email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.response.fail(null, "Invalid Password");
    }
    // await updateFirebaseToken(user?.id, firebaseToken);
    const access = jwt.sign(
      {
        id: user.id,
        email: user.email,
        status: user.status,
      },
      variables.jwtSecret,
      { expiresIn: "2160h" }
    );

    const refresh = jwt.sign(
      {
        id: user.id,
        email: user.email,
        status: user.status,
      },
      variables.refreshTokenSecrat,
      { expiresIn: "30d" }
    );

    const api_token = {
      access,
      refresh,
    };

    const payload = {
      ...user.dataValues,
      api_token,
    };

    res.response.success(payload, "User Login successful");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const vendor = await findVendorById(id);
    if (!vendor) {
      return res.response.fail(null, "Vendor not found");
    }
    const data = { name };
    const response = await updateVendor(id, data);
    return res.response.success(response, "Vendor update successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

// exports.getPendingVendor = async (req, res) => {
//   try {
//     const response = await getPendigVendor();
//     return res.response.success(response, "Pending vendor list");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.getPendingVendorDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vendor = await getPendingVendorDetails(id);
//     if (!vendor) {
//       return res.response.fail(null, "Vendor not found");
//     }
//     return res.response.success(vendor, "fetched vendor details");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.approveVendor = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vendorRequest = await getPendingVendorDetails(id);
//     if (!vendorRequest) {
//       return res.response.fail(null, " vendor request not found", {});
//     }
//     const status = "APPROVE";
//     const detailsStatus = "ACTIVE";
//     const vendorId = vendorRequest.fk;

//     await changeVendorStatus(vendorId, status);
//     await changeVendorDetailsStatus(id, detailsStatus);
//     return res.response.success({}, "Vendor approved successfully");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.rejectVendorRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vendorDetails = await getPendingVendorDetails(id);
//     if (!vendorDetails) {
//       return res.response.fail(null, "vendor request not found", {});
//     }
//     await deleteVendorRequest(id);
//     return res.response.success({}, "vendor reject successfully");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.getVendorDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vendorDetailsData = await getVendorDetails(id);
//     const vendorData = await findVendorById(id);
//     return res.response.success({ vendorData, vendorDetailsData });
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.getActiveVendor = async (req, res) => {
//   try {
//     const activeVendor = await getActiveVendor();
//     if (activeVendor.length < 1) {
//       return res.response.fail(null, "Vendor not found");
//     }
//     return res.response.success(activeVendor, "Active vendor list");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword, confirmPassword } = req.body;
//     const { id } = req.params;

//     if (newPassword !== confirmPassword) {
//       return res.response.fail(null, "Password not match");
//     }
//     const vendor = await findVendorById(id);
//     if (!vendor) {
//       return res.response.fail(null, "Vendor not found", {});
//     }
//     const match = await bcrypt.compare(oldPassword, vendor.password);
//     if (!match) {
//       return res.response.fail(null, "Invalid old Password");
//     }
//     const password = await hashPasswordFunc(confirmPassword);
//     const data = { password };
//     const response = await updateVendor(id, data);
//     return res.response.success(response, "Password reset successfully");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.sendForgetPasswordOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     otpCache[email] = { otp, timestamp: Date.now() + 5 * 60 * 1000 };
//     await vendorForgetPassword({ otp, email });
//     return res.response.success({ otp }, "otp send");
//   } catch (error) {
//     console.log(error);

//     errorResponseHandler(res, error);
//   }
// };

// exports.matchForgetPasswordOtp = async (req, res) => {
//   try {
//     const { otp, email } = req.body;
//     const cachedOTP = otpCache[email];
//     if (
//       !cachedOTP ||
//       otp !== cachedOTP.otp ||
//       Date.now() > cachedOTP.timestamp
//     ) {
//       return res.response.fail(null, "Invalid or expired OTP");
//     } else {
//       return res.response.success({}, "otp match");
//     }
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };

// exports.forgetPassword = async (req, res) => {
//   try {
//     const { newPassword, confirmPassword, email } = req.body;
//     if (newPassword !== confirmPassword) {
//       return res.response.fail(null, "Password not match");
//     }
//     const vendor = await vendorByEmailOrMobile({ email, mobile: "" });
//     if (!vendor) {
//       return res.response.fail(null, "Vendor not found", {});
//     }
//     const password = await hashPasswordFunc(confirmPassword);
//     const data = { password };
//     const response = await updateVendor(vendor?.id, data);
//     return res.response.success(response, "Password reset successfully");
//   } catch (error) {
//     errorResponseHandler(res, error);
//   }
// };
