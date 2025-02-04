// controller/vendorDetailsController.js
const { uploadFile } = require("../helper/uploadFileS3");
const errorResponseHandler = require("../utils/errorResponseHandler");
const { variables } = require("../config/variables");
const { validate } = require("../validation/validator");
const { vendorDetailsRules } = require("../validation/validationRules");
const {
  vendordetails,
  updateVendorDetails,
  getVendorDetails,
} = require("../models/sellerModel");
const { findCustomerById } = require("../models/authModel");
const { uuid } = require("uuidv4");
const genarateFilename = async (originalFilename) => {
  const splitNmae = originalFilename.split(".");
  const extention = splitNmae[splitNmae.length - 1];
  const filename = uuid() + "." + extention;
  return filename;
};
exports.uploadVendorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,
      fullName,
      businessAddress,
      businessName,
      aboutMe,
      fkCountry,
      addressLineTwo,
      addressLineOne,
      googleAddressLng,
      googleAddressLat,
      googleAddress,
      mobileNo,
      zipCode,
      fkCity,
    } = req.body;

    const { profileimage, idProofFile, addressProofFile } = req.files;
    const profileImageBuffer = profileimage[0].buffer;
    const profileImageMimeType = profileimage[0].mimetype;
    const idProofFileBuffer = idProofFile[0].buffer;
    const idProofFileMimeType = idProofFile[0].mimetype;
    const addressBuffer = addressProofFile[0].buffer;
    const addressMimeType = addressProofFile[0].mimetype;
    const profileImageName = await genarateFilename(
      profileimage[0].originalname
    );
    await uploadFile(
      profileImageBuffer,
      `profileImage/${profileImageName}`,
      profileImageMimeType
    );
    const idProofFileName = await genarateFilename(idProofFile[0].originalname);
    await uploadFile(
      idProofFileBuffer,
      `idProof/${idProofFileName}`,
      idProofFileMimeType
    );
    const addressFileName = await genarateFilename(
      addressProofFile[0].originalname
    );
    await uploadFile(
      addressBuffer,
      `address/${addressFileName}`,
      addressMimeType
    );
    const profileUrl = `${variables.s3Configs.awsEndPoint}/ui/${variables.s3Configs.s3BucketName}/profileImage/${profileImageName}`;
    const idProofUrl = `${variables.s3Configs.awsEndPoint}/ui/${variables.s3Configs.s3BucketName}/idProof/${idProofFileName}`;
    const addressUrl = `${variables.s3Configs.awsEndPoint}/ui/${variables.s3Configs.s3BucketName}/address/${addressFileName}`;

    validate(
      {
        email,
        fullName,
        businessAddress,
        businessName,
        aboutMe,
        fkCountry,
        addressLineTwo,
        addressLineOne,
        googleAddressLng,
        googleAddressLat,
        googleAddress,
        mobileNo,
        zipCode,
        fkCity,
        profileUrl,
        addressUrl,
        idProofUrl,
      },
      vendorDetailsRules
    );
    const vendor = await findCustomerById(id);
    if (!vendor) {
      return res.response.fail(null, "vendor not found", {});
    }
    const vendorData = {
      fk: id,
      email,
      fullName,
      businessAddress,
      businessName,
      aboutMe,
      fkCountry,
      addressLineTwo,
      addressLineOne,
      googleAddressLng,
      googleAddressLat,
      googleAddress,
      mobileNo,
      zipCode,
      fkCity,
      profileUrl,
      addressUrl,
      idProofUrl,
    };

    const response = await vendordetails(vendorData);
    return res.response.success(response, "upload success");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.updateVendorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,
      fullName,
      businessAddress,
      businessName,
      aboutMe,
      fkCountry,
      addressLineTwo,
      addressLineOne,
      googleAddressLng,
      googleAddressLat,
      googleAddress,
      mobileNo,
      zipCode,
      fkCity,
    } = req.body;
    const { profileimage, idProofFile, addressProofFile } = req.files;
    let profileImageBuffer = null;
    let profileImageMimeType = null;
    let idProofFileBuffer = null;
    let idProofFileMimeType = null;
    let addressBuffer = null;
    let addressMimeType = null;
    if (profileimage) {
      profileImageBuffer = profileimage[0]?.buffer;
      profileImageMimeType = profileimage[0]?.mimetype;
    }
    if (idProofFile) {
      idProofFileBuffer = idProofFile[0]?.buffer;
      idProofFileMimeType = idProofFile[0]?.mimetype;
    }
    if (addressProofFile) {
      addressBuffer = addressProofFile[0]?.buffer;
      addressMimeType = addressProofFile[0]?.mimetype;
    }
    let profileImageName = null;
    if (profileimage) {
      profileImageName = await genarateFilename(profileimage[0]?.originalname);
      await uploadFile(
        profileImageBuffer,
        `profileImage/${profileImageName}`,
        profileImageMimeType
      );
    }

    let idProofFileName = null;
    if (idProofFile) {
      idProofFileName = await genarateFilename(idProofFile[0]?.originalname);
      await uploadFile(
        idProofFileBuffer,
        `idProof/${idProofFileName}`,
        idProofFileMimeType
      );
    }
    let addressFileName = null;
    if (addressProofFile) {
      addressFileName = await genarateFilename(
        addressProofFile[0]?.originalname
      );
      await uploadFile(
        addressBuffer,
        `address/${addressFileName}`,
        addressMimeType
      );
    }

    const profileUrl = `${variables.s3Configs.awsEndPoint}/ui/${variables.s3Configs.s3BucketName}/profileImage/${profileImageName}`;
    const idProofUrl = `${variables.s3Configs.awsEndPoint}/ui/${variables.s3Configs.s3BucketName}/idProof/${idProofFileName}`;
    const addressUrl = `${variables.s3Configs.awsEndPoint}/ui/${variables.s3Configs.s3BucketName}/address/${addressFileName}`;

    const vendor = await findCustomerById(id);
    if (!vendor) {
      return res.response.fail(null, "vendor not found", {});
    }
    const vendorDetails = await getVendorDetails(id);
    const vendorData = {
      fk: id,
      email,
      fullName,
      businessAddress,
      businessName,
      aboutMe,
      fkCountry,
      addressLineTwo,
      addressLineOne,
      googleAddressLng,
      googleAddressLat,
      googleAddress,
      mobileNo,
      zipCode,
      fkCity,
      profileUrl: profileimage ? profileUrl : vendorDetails?.profileUrl,
      addressUrl: addressProofFile ? addressUrl : vendorDetails?.addressUrl,
      idProofUrl: idProofFile ? idProofUrl : vendorDetails?.idProofUrl,
    };

    const response = await updateVendorDetails(id, vendorData);
    return res.response.success(response, "upload success");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
