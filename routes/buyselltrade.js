const express = require("express");
const router = express.Router();
// const authController = require("../controllers/auth");
const buySellTradeController = require("../controllers/buyselltrade");
// const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/live-fish", ensureAuth, buySellTradeController.getLiveFishIndex);
router.get("/aquatic-plants", ensureAuth, buySellTradeController.getAquaticPlantIndex);
router.get("/offer-services", ensureAuth, buySellTradeController.getServicesIndex);




module.exports = router;
