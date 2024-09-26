const router = require("express").Router();
const movieController = require("../controllers/movie");
const jwtCheckMiddleware = require('../middleware/middleware').jwtCheckMiddleware;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/v1/movie/add", jwtCheckMiddleware, (req, res) => movieController.createMovie(req, res));
router.get("/api/v1/movie/search", jwtCheckMiddleware, (req, res) => movieController.searchMovie(req, res));
router.get("/api/v1/movie/get-by-id/:ID", jwtCheckMiddleware, (req, res) => movieController.getDetail(req, res));
router.get("/api/v1/movie/list", jwtCheckMiddleware, (req, res) => movieController.getMovie(req, res));
router.put("/api/v1/movie/update", jwtCheckMiddleware, upload.single('image'), (req, res) => movieController.updateMovie(req, res));
router.delete("/api/v1/movie/delete/:ID", jwtCheckMiddleware, (req, res) => movieController.deleteMovie(req, res));

module.exports = router;