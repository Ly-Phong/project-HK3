const userRouter = require("./user");
const movieRouter = require("./movie");
const router = require("express").Router();
router.use(userRouter);
router.use(movieRouter);

module.exports = router;