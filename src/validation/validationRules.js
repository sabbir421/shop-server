const createAdminRules = {
  name: "required|string",
  email: "required|string",
  password: "required|string",
  mobile: "required|string",
};
const createUserRules = {
  name: "string",
  email: "string",
  // password: "required|string",
  mobile: "string",
  firebaseToken: "string",
  loginId: "required",
  regType: "required|string|in:email,apple,google,mobile",
};
const createVendorRules = {
  name: "required|string",
  email: "required|string",
  password: "required|string",
  mobile: "required|string",
  lastName: "required|string",
  regType: "required|string|in:email,apple,google",
};

const createCountryRules = {
  countryName: "required|string",
  countryCode: "required|string",
  status: "required|string|in:ACTIVE,INACTIVE",
};

const vendorDetailsRules = {
  email: "required|string",
  fullName: "required|string",
  businessAddress: "required|string",
  businessName: "required|string",
  aboutMe: "required|string",
  fkCountry: "required|integer",
  addressLineTwo: "required|string",
  addressLineOne: "required|string",
  googleAddressLng: "required",
  googleAddressLat: "required",
  googleAddress: "required|string",
  mobileNo: "required|string",
  zipCode: "required|string",
  fkCity: "required|integer",
  profileUrl: "required|string",
  idProofUrl: "required|string",
  addressUrl: "required|string",
};
const cityCreateRules = {
  cityName: "required|string",
  status: "required|string|in:ACTIVE,INACTIVE",
  countryId: "required|integer",
};

const createLuggageStoreRules = {
  storeName: "required|string",
  providerName: "required|string",
  providerEmail: "required|string",
  providerMobile: "required|string",
  providerID: "required|integer",
  countryName: "required|string",
  cityName: "required|string",
  mapLat: "required",
  mapLan: "required",
  address: "required|string",
  zipCode: "required|string",
  road: "required|string",
  house: "required|string",
  price: "required",
};
const bookingStoreRules = {
  customrName: "required|string",
  customerId: "required|integer",
  storeName: "required|string",
  storeId: "required|integer",
  providerName: "required|string",
  providerId: "required|integer",
  hour: "required",
  status: "required|string|in:Place,Drop-off,Dropped,Picked-off",
  quantity: "required|integer",
  startDate: "required",
  endDate: "required",
  startTime: "required",
  endTime: "required",
  numOfDay: "required|integer",
  paymentId: "required",
};
const storeReviewRules = {
  userId: "required|integer",
  userName: "required|string",
  storeId: "required|integer",
  rating: "required",
  comment: "required|string",
};
const makeFavoriteStoreRules = {
  storeId: "required|integer",
  userId: "required|integer",
};
const createCategoryRules = {
  categoryName: "required|string",
  status: "required|string|in:ACTIVE,INACTIVE",
};
const storeFacilityRules = {
  facility: "required|string",
};

const storePriceRules = {
  country: "required|string",
  price: "required",
};
const promoCodeRules = {
  bag: "required|integer",
  status: "string",
  discountPrice: "integer",
  discountBag: "integer",
  maxCupponUsed: "integer",
};
module.exports = {
  createAdminRules,
  createCountryRules,
  createUserRules,
  createVendorRules,
  vendorDetailsRules,
  cityCreateRules,
  createLuggageStoreRules,
  bookingStoreRules,
  storeReviewRules,
  makeFavoriteStoreRules,
  createCategoryRules,
  storeFacilityRules,
  storePriceRules,
  promoCodeRules,
};
