const {
  totalUser,
  updateFirebaseToken,
  findCustomerById,
  updateCustomer,
  customerByEmailOrMobile,
  userSignup,
  findUserByEmailOrMobile,
  userByEmailOrMobile,
  updateUser,
  updateSignupData,
  getAllCustomer,
  deactiveUser,
} = require("../models/authModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { variables } = require("../config/variables");
const errorResponseHandler = require("../utils/errorResponseHandler");
const { hashPasswordFunc } = require("../helper/hashPassword");
const { validate } = require("../validation/validator");
const { createUserRules } = require("../validation/validationRules");
const otpCache = {};
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "2deb82c253a7de",
    pass: "04c21aeac60fa7",
  },
});

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    otpCache[email] = { otp, timestamp: Date.now() + 1200000 };
    const mailOptions = {
      from: "sabbir.a@coppanet.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.response.fail(null, "Failed to send OTP");
      }
      res.response.success({ otp }, "OTP sent successfully");
    });
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.userSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      // password: orginalpass,
      firebaseToken,
      loginId,
      regType,
      otp,
      mobile,
      countryCode,
      appleIdentity,
      address,
    } = req.body;
    validate(
      {
        name,
        email,
        firebaseToken,
        loginId,
        regType,
        mobile,
      },
      createUserRules
    );

    if (regType === "email") {
      const cachedOTP = otpCache[email];
      if (
        !cachedOTP ||
        otp !== cachedOTP.otp ||
        Date.now() > cachedOTP.timestamp
      ) {
        return res.response.fail(null, "Invalid or expired OTP");
      }
    }

    const totalUsers = await totalUser();
    let isUserExist = {};
    if (totalUsers > 0) {
      isUserExist = await userByEmailOrMobile({ email, mobile, appleIdentity });
    }

    const userData = {
      name: name || isUserExist?.name || null,
      email: email || isUserExist?.email || null,
      firebaseToken: firebaseToken || isUserExist?.firebaseToken || null,
      loginId: loginId || isUserExist?.loginId || null,
      regType: regType || isUserExist?.regType || null,
      mobile: mobile || isUserExist?.mobile || null,
      countryCode: countryCode || isUserExist?.countryCode || null,
      appleIdentity: appleIdentity || isUserExist?.appleIdentity || null,
      address: address || isUserExist?.address || null,
    };
    if (isUserExist?.id && isUserExist.status === "ACTIVE") {
      const response = await updateSignupData(isUserExist.id, userData);
      if (response) {
        const access = jwt.sign(
          {
            id: response.id,
            email: response?.email,
            status: response.status,
          },
          variables.jwtSecret,
          { expiresIn: "2160h" }
        );
        const refresh = jwt.sign(
          {
            id: response.id,
            email: response?.email,
            status: response.status,
          },
          variables.refreshTokenSecrat,
          { expiresIn: "30d" }
        );
        response.api_token = { access, refresh };
        return res.response.success(response, "Signup successful");
      }
    }

    let response = await userSignup(userData);

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


    errorResponseHandler(res, error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { credential, password, firebaseToken } = req.body;

    let user = {};

    user = await findUserByEmailOrMobile(credential);

    if (!user) {
      return res.response.fail(null, "Invalid email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.response.fail(null, "Invalid Password");
    }
    if (firebaseToken) {
      await updateFirebaseToken(user?.id, firebaseToken);
    }

    const access = jwt.sign(
      {
        id: user.id,
        email: user.email,
        status: user.status,
        role: user.role,
      },
      variables.jwtSecret,
      { expiresIn: "2160h" }
    );

    const refresh = jwt.sign(
      {
        id: user.id,
        email: user.email,
        status: user.status,
        role: user.role,
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const customer = await findCustomerById(id);
    if (!customer) {
      return res.response.fail(null, "Customer not found");
    }
    const data = { name };
    const response = await updateUser(id, data);
    return res.response.success(response, "Customer update successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getCustomerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findCustomerById(id);
    if (!user || user.role === "VENDOR") {
      return res.response.fail(null, "Customer not found", {});
    }
    return res.response.success(user, "Customer details fetch successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getAllCustomer = async (req, res) => {
  try {
    const users = await getAllCustomer();
    if (users.length < 1) {
      return res.response.fail(null, "User list empty");
    }
    return res.response.success(users, "fetch user list");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findCustomerById(id);
    if (!user) {
      return res.response.fail(null, "user not found", {});
    }
    const status = "DEACTIVATE";
    await deactiveUser(id, { status });
    return res.response.success({}, "Customer deleted successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
