const express = require("express");
const router = express.Router();
const healthRoute = require("./health/healthRoute");
const sellerRoute = require("../routes/seller/sellerRoute");
const productRoute = require("../routes/product/productRoute");
const defaultRoutes = [
  {
    path: "/check",
    route: healthRoute,
  },
  {
    path: "/seller",
    route: sellerRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
