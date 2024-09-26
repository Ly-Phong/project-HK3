const movieModel = require("../models/movie");
const config = require("dotenv").config({ path: ".env" });
const constants = require("../utils/constants");
const cloudinary = require("cloudinary").v2;

exports.getMovie = async (req, res) => {
  const pageNumber = req.query.pn ? req.query.pn : 1;
  const limit = req.query.limit;
  const pageSize = limit !== undefined ? limit : constants.CONST_MOVIE_PER_PAGE;
  const skip = (pageNumber - 1) * pageSize;
  let totalMovie = await movieModel.countDocuments();
  let totalItems = await movieModel.find().skip(skip).limit(pageSize).exec();
  const totalPage = Math.ceil(totalMovie / pageSize);
  const data = {
    totalItems: totalMovie,
    totalPage: totalPage,
    currentPage: pageNumber,
    items: totalItems,
  };
  res.status(200).send({
    message: "Lấy phim thành công",
    data: data,
  });
};

exports.searchMovie = async (req, res) => {
  const searchKey = req.query.keyword;
  let searchModel =
    searchKey !== "" && searchKey !== undefined
      ? { name: { $regex: new RegExp(searchKey, "i") } }
      : {};
  let totalItems = await movieModel.find(searchModel).exec();
  res.status(200).send({
    message: "Lấy phim thành công",
    data: totalItems,
  });
};

exports.getDetail = async (req, res) => {
  const ID = req.params.ID;
  const isExistMovie = await movieModel.findOne({ ID: ID }).exec();
  if (isExistMovie) {
    res.status(200).send({
      message: "Lấy phim thành công",
      data: isExistMovie,
    });
  } else {
    res.status(400).send({
      message: "Phim này không có sẵn",
    });
  }
};

exports.createMovie = async (req, res) => {
  const { ID, name, time, year, introduce, image } = req.body;
  if (!ID || !name || !time || !year || !introduce) {
    return res
      .status(400)
      .json({ error: "Cần nhập ID, tên, thời gian, năm, giới thiệu." });
  }

  const isMovieExist = await movieModel.findOne({ ID: ID }).exec();
  if (!isMovieExist) {
    const newMovie = {
      ID: ID,
      name: name,
      time: time,
      year: year,
      introduce: introduce,
      image: image,
    };
    await movieModel.create(newMovie);
    res.status(201).send({
      message: "Tạo phim thành công",
      data: newMovie,
    });
  } else {
    res.status(400).send({
      message: "Tạo phim thất bại. Phim này đã tồn tại",
    });
  }
};

exports.updateMovie = async (req, res) => {
  const { ID, name, time, year, introduce } = req.body;
  if (!ID || !name || !time || !year || !introduce) {
    return res
      .status(400)
      .json({ error: "Cần nhập ID, tên, thời gian, năm, giới thiệu." });
  }
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "Không có tệp nào được tải lên." });
  }

  const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  cloudinary.uploader.upload(
    dataUrl,
    {
      resource_type: "auto",
    },
    async (err, result) => {
      if (result) {
        const isMovieExist = await movieModel.findOne({ ID: ID }).exec();
        if (isMovieExist) {
          const updateMovie = {
            ID: ID,
            name: name,
            time: time,
            year: year,
            introduce: introduce,
            image: result.secure_url,
          };
          await movieModel.findOneAndUpdate({ ID: ID }, updateMovie);
          res.status(201).send({
            message: "Cập nhật phim thành công.",
            data: updateMovie,
          });
        } else {
          res.status(400).send({
            message: "Cập nhật phim thất bại. Phim này không tồn tại",
          });
        }
      } else {
        res.status(400).json({
          message: "Tạo phim thất bại. Tải lên hình ảnh thất bại",
        });
      }
    }
  );
};

exports.deleteMovie = async (req, res) => {
  try {
    const deletedmovie = await movieModel.findOneAndDelete({
      ID: req.params.ID,
    });
    if (!deletedmovie) {
      return res.status(400).json({ message: "Không tìm thấy phim để xóa." });
    }
    res.status(200).json({ message: "Xóa phim thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ:", error: error.message });
  }
};
