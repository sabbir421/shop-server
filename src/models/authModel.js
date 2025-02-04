const { Op, where } = require("sequelize");
const Users = require("../schema/authSchema");

exports.userSignup = async (userData) => {
  const response = await Users.create(userData);
  return JSON.parse(JSON.stringify(response));
};

exports.updateSignupData = async (id, data) => {
  try {
    const [numOfAffectedRows] = await Users.update(data, {
      where: { id: id },
    });
    if (numOfAffectedRows === 0) {
      throw new Error("No record found with the given ID");
    }

    const updatedRecord = await Users.findOne({ where: { id } });
    if (!updatedRecord) {
      throw new Error("Failed to fetch updated record");
    }
    return updatedRecord.toJSON();
  } catch (error) {
    throw error;
  }
};

exports.totalUser = async () => {
  const totalUsers = await Users.count();
  return totalUsers;
};

exports.findUserByEmailOrMobile = async (credential) => {
  const user = await Users.findOne({
    where: {
      [Op.or]: [{ email: credential }, { mobile: credential }],
    },
  });
  return user;
};
exports.userByEmailOrMobile = async ({ email, mobile, appleIdentity }) => {
  const user = await Users.findOne({
    where: {
      [Op.or]: [
        { email: email },
        { mobile: mobile },
        { appleIdentity: appleIdentity },
      ],
    },
  });
  return user;
};

exports.updateFirebaseToken = async (id, firebaseToken) => {
  try {
    const response = await Users.update(
      { firebaseToken },
      {
        where: {
          id: id,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

exports.findCustomerById = async (id) => {
  const user = await Users.findOne({ where: { id: id } });
  return user;
};

exports.updateUser = async (id, data) => {
  const response = await Users.update(data, { where: { id: id } });
  return response;
};

exports.getAllCustomer = async () => {
  const users = await Users.findAll({
    where: {
      [Op.or]: [{ role: "CUSTOMER" }],
    },
  });
  return users;
};

exports.deactiveUser = async (id, data) => {
  const response = await Users.update(data, { where: { id: id } });
  return response;
};
