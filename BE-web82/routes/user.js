const userController = require("../controllers/user");
const router = require("express").Router();
const jwtCheckMiddleware =
  require("../middleware/middleware").jwtCheckMiddleware;

router.post("/api/v1/user/login", (req, res) =>
  userController.loginUser(req, res)
);
router.post("/api/v1/user/logout", jwtCheckMiddleware, (req, res) =>
  userController.logoutUser(req, res)
);

router.post("/api/v1/user/regist", (req, res) => {
  if (userController.register() === true) {
    res.status(201).send({
      message:
        "Tạo tài khoản mặc định thành công. Vui lòng xem tên người dùng và mật khẩu trong tệp env.",
    });
  } else {
    res.status(400).send({
      message:
        "Tạo tài khoản mặc định thất bại. Tài khoản mặc định đã tồn tại.",
    });
  }
});

module.exports = router;
