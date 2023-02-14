const router = require('express').Router();
const authRoutes = require('./auth.route');
const verifyAuth = require('../../middlewares/verifyAuth');
const dashboardRoutes = require('./dashboard.routes');

router.use("/auth", authRoutes);
router.use("/dashboard", verifyAuth, dashboardRoutes);

module.exports = router;

