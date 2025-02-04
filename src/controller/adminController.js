const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validate } = require("../validation/validator");
const { createAdminRules } = require("../validation/validationRules");
const {
  adminSignup,
  findAdminByEmail,
  getAllAdmin,
  adminDetails,
  deleteAdmin,
  getAdminById,
  updateAdmin,
} = require("../models/adminModel");
const errorResponseHandler = require("../utils/errorResponseHandler");
const { hashPasswordFunc } = require("../helper/hashPassword");
const { variables } = require("../config/variables");

exports.adminsignup = async (req, res) => {
  try {
    const { name, email, password: originalPassword, mobile, role } = req.body;
    validate(
      { name, email, mobile, password: originalPassword },
      createAdminRules
    );
    const admin = await findAdminByEmail(email);
    if (admin) {
      return res.response.fail(null, "Admin already exists", {});
    }

    const password = await hashPasswordFunc(originalPassword);
    const data = {
      name,
      email,
      password,
      mobile,
      role,
    };
    const response = await adminSignup(data);
    return res.response.success(response, "Admin Created successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.response.fail(null, "Invalid Email", {});
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.response.fail(null, "Invalid Password", {});
    }
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        mobile: admin.mobile,
      },
      variables.jwtSecret,
      { expiresIn: "2160h" }
    );
    return res.response.success({ token, admin }, "Admin login successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getallAdmin = async (req, res) => {
  try {
    const response = await getAllAdmin();
    if (!response) {
      return res.response.fail(null, "Admin not available");
    }
    return res.response.success(response, "Admin list");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
exports.getAdminDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await adminDetails(id);
    if (!response) {
      return res.response.fail(null, "Admin not found");
    }
    return res.response.success(response, "Admin details");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await getAdminById(id);
    if (admin?.status === "INACTIVE") {
      return res.response.fail(null, "Not a valid admin");
    }
    const status = "INACTIVE";
    await deleteAdmin(id, status);
    return res.response.success({}, "Admin delete successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile } = req.body;
    const admin = await getAdminById(id);
    if (!admin) {
      return res.response.fail(null, "Admin not found", {});
    }
    const data = {};
    if (!name) {
      data.name = admin.name;
    } else {
      data.name = name;
    }
    if (!mobile) {
      data.nmobile = admin.mobile;
    } else {
      data.mobile = mobile;
    }
    const response = await updateAdmin(id, data);
    return res.response.success(response, "Admin update successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.resetAdminPasword = async (req, res) => {
  try {
    const {newPassword, confirmPassword } = req.body;
    const { adminId } = req.params;
    if (newPassword !== confirmPassword) {
      return res.response.fail(null, "Password not match");
    }
    const admin = getAdminById(adminId);
    if (!admin) {
      return res.response.fail(null, "Admin not found", {});
    }
    const password = await hashPasswordFunc(confirmPassword);
    const data = { password };
    const response = await updateAdmin(adminId, data);
    return res.response.success(response, "Password reset successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
