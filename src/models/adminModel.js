const Admin = require("../schema/adminSchema");

exports.adminSignup = async (userData) => {
  const response = await Admin.create(userData);
  return JSON.parse(JSON.stringify(response));
};

exports.totalAdmin = async () => {
  const totaladmin = await Admin.count();
  return totaladmin;
};

exports.findAdminByEmail = async (email) => {
  const admins = await Admin.findOne({
    where: {
      email: email,
    },
  });
  return admins;
};
exports.totalAdmin = async () => {
  const totalAdmin = await Admin.count();
  return totalAdmin;
};

exports.getAllAdmin = async () => await Admin.findAll();

exports.adminDetails = async (id) => {
  const response = await Admin.findOne({ where: { id: id } });
  return response;
};

exports.getAdminById = async (id) => {
  const response = await Admin.findOne({ where: { id: id } });
  return response;
};

exports.deleteAdmin = async (id, status) => {
  const response = await Admin.update(
    { status },
    {
      where: {
        id: id,
      },
    }
  );
  return response;
};

exports.updateAdmin = async (id, data) => {
  const response = await Admin.update(data, {
    where: {
      id: id,
    },
  });
  return response;
};

