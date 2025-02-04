const express = require("express");
const multer = require("multer");
const {
  createLuggageStore,
  nearestLuggageStore,
  getAllStore,
  luggageStoreDetails,
  createReview,
  fetchStoreReview,
  makeFavoriteStore,
  getFavoriteStoreByUserId,
  removeFavoriteStore,
  getStoreListByProvider,
  updateLuggage,
  changeStoreStatus,
  totalBagByStore,
  storeListByPartner,
} = require("../../controller/luggageController");
const authenticate = require("../../utils/authenticate");

const {
  luggageBooking,
  luggageBookingActiveOrederById,
  luggageBookingPreviousOrederById,
  orderSummery,
  rebookLuggageBooking,
  getAllLuggageStoreOrder,
  changeBookingStatus,
  getOrderByStore,
  getCustomerByStore,
  uploadLuggageImage,
} = require("../../controller/luggageBookingController");
const {
  storeFachility,
  getFacility,
  updateFacility,
  changeFacilityStatus,
} = require("../../controller/storeFacilityController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// router.post("/store/create", authenticate, createLuggageStore);
router.post(
  "/store/create",
  upload.fields([
    { name: "storeImage", maxCount: 1 },
    { name: "areaImage", maxCount: 1 },
  ]),
  createLuggageStore
);
router.patch(
  "/store/update/:storeId",
  upload.fields([
    { name: "storeImage", maxCount: 1 },
    { name: "areaImage", maxCount: 1 },
  ]),
  authenticate,
  updateLuggage
);

router.put("/store/status/:id", authenticate, changeStoreStatus);
router.get("/store/provider/:providerId", authenticate, getStoreListByProvider);
router.get("/store/near/:lat/:lan/:rating/:allDay", nearestLuggageStore);
router.get("/store", getAllStore);
router.get("/store/:storeId", authenticate, luggageStoreDetails);
router.post("/store/booking", authenticate, luggageBooking);
router.get(
  "/store/booking/previous/:customerId",

  authenticate,
  luggageBookingPreviousOrederById
);
router.get(
  "/store/booking/active/:customerId",
  authenticate,
  luggageBookingActiveOrederById
);
router.get("/store/order/:orderId", authenticate, orderSummery);
router.post("/store/review", createReview);
router.get("/store/review/:storeId", fetchStoreReview);
router.post("/store/favorite", authenticate, makeFavoriteStore);
router.get("/store/favorite/:userId", authenticate, getFavoriteStoreByUserId);
router.delete(
  "/store/favorite/remove/:storeId",
  authenticate,
  removeFavoriteStore
);

router.patch(
  "/store/rebook/:customerId/:bookingId",
  authenticate,
  rebookLuggageBooking
);
router.get("/store/booking/list", authenticate, getAllLuggageStoreOrder);
router.post("/facility", authenticate, storeFachility);
router.get("/facility", authenticate, getFacility);
router.put("/facility/:id", authenticate, updateFacility);
router.patch("/facility/status/:id", authenticate, changeFacilityStatus);
router.patch("/booking/status/:bookingId", authenticate, changeBookingStatus);
router.get("/booking/:storeId", authenticate, getOrderByStore);
router.get("/customer/:storeId", authenticate, getCustomerByStore);
router.get("/quantity/:storeId", authenticate, totalBagByStore);
router.patch(
  "/image/:bookingId",
  upload.fields([{ name: "luggageImage", maxCount: 1 }]),
  authenticate,
  uploadLuggageImage
);
module.exports = router;
