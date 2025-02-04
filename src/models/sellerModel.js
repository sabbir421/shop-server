const { Op } = require("sequelize");
const vendorDetails = require("../schema/vendorDetailsSchema");
const Seller = require("../schema/sellerSchema");


exports.sellerSignup = async (userData) => {
  const response = await Seller.create(userData);
  return JSON.parse(JSON.stringify(response));
};

exports.totalSeller = async () => {
  const totalVendors = await Seller.count();
  return totalVendors;
};

exports.sellerByEmailOrMobile = async ({ email, mobile }) => {
  const user = await Seller.findOne({
    where: {
      [Op.or]: [{ email: email }, { mobile: mobile }],
    },
  });
  return user;
};
exports.findsellerByEmailOrMobile = async (credential) => {
  const user = await Seller.findOne({
    where: {
      [Op.or]: [{ email: credential }, { mobile: credential }],
    },
  });
  return user;
};

exports.updateFirebaseToken = async (id, firebaseToken) => {
  try {
    const response = await Seller.update(
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

exports.vendordetails = async (vendorData) => {
  const response = await vendorDetails.create(vendorData);
  return JSON.parse(JSON.stringify(response));
};
exports.updateVendorDetails = async (id, data) => {
  const response = vendorDetails.update(data, { where: { fk: id } });
  return JSON.parse(JSON.stringify(response));
};
exports.getVendorDetails = async (id) => {
  const response = await vendorDetails.findOne({ where: { fk: id } });
  return JSON.parse(JSON.stringify(response));
};
exports.findVendorById = async (id) => {
  const vendor = await Seller.findOne({ where: { id: id } });
  return JSON.parse(JSON.stringify(vendor));
};

exports.updateVendor = async (id, data) => {
  const response = await Seller.update(data, { where: { id: id } });
  return response;
};

exports.getPendigVendor = async (req, res) => {
  const response = await vendorDetails.findAll();
  return response;
};

exports.getPendingVendorDetails = async (id) => {
  const response = await vendorDetails.findOne({ where: { id: id } });
  return response;
};

exports.deleteVendorRequest = async (id) => {
  const response = await vendorDetails.destroy({ where: { id: id } });
  return response;
};

exports.changeVendorStatus = async (id, status) => {
  const response = await Seller.update(
    { status: status },
    {
      where: {
        id: id,
      },
    }
  );
  return response;
};
exports.changeVendorDetailsStatus = async (id, status) => {
  const response = await vendorDetails.update(
    { status: status },
    {
      where: {
        id: id,
      },
    }
  );
  return response;
};

exports.getActiveVendor = async () => {
  const response = await Seller.findAll();
  return response;
};
