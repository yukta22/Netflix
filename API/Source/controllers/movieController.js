import { Movie } from "../models/movies.js";
import { uploadS3 } from "../utils/multerS3.js";

const createMovie = async (req, res) => {
  try {
    // console.log(req.body);
    const imgfile = req.files?.image;
    const videoFile_360p = req.files?.video_360p;
    const videoFile_480p = req.files?.video_480p;
    const videoFile_720p = req.files?.video_720p;
    const videoFile_1080p = req.files?.video_1080p;

    const imgUrl = await uploadS3(imgfile?.name, imgfile?.data);
    const videoUrl_360p = await uploadS3(
      videoFile_360p?.name,
      videoFile_360p?.data
    );
    const videoUrl_480p = await uploadS3(
      videoFile_480p?.name,
      videoFile_480p?.data
    );
    const videoUrl_720p = await uploadS3(
      videoFile_720p?.name,
      videoFile_720p?.data
    );
    const videoUrl_1080p = await uploadS3(
      videoFile_1080p?.name,
      videoFile_1080p?.data
    );

    const movie = new Movie({
      title: req.body.title,
      description: req.body.description,
      image: imgUrl,
      video_360p: videoUrl_360p,
      video_480p: videoUrl_480p,
      video_720p: videoUrl_720p,
      video_1080p: videoUrl_1080p,
      // videoSize: videoFile.size,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      cast: req.body.cast,
      typeOfMovie: req.body.typeOfMovie,
    });
    const saveMovie = await movie.save();
    // console.log(saveMovie);
    res.status(201).json(saveMovie);
  } catch (err) {
    console.log("asd");
    console.log(err);
    res.status(500).json(err);
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMoviesAdmin = async (req, res) => {
  try {
    const pageno = req.headers.pageno;
    const skipData = 5;
    const movies = await Movie.find()
      .skip((pageno - 1) * skipData)
      .limit(5);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getrandomMovie = async (req, res) => {
  try {
    const randomdata = Math.floor(Math.random() * 10);
    const getData = await Movie.find().skip(randomdata).limit(-1);
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
};

const getVideoplayer = async (req, res) => {
  try {
    // console.log(req.body);
    const findData = await Movie.findOne({ title: req.body.title });
    res.status(201).json(findData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateMovies = async (req, res) => {
  try {
    console.log(req.body);
    const updateData = await Movie.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteMovies = async (req, res) => {
  try {
    console.log(req.params.id);
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const searchMovies = async (req, res) => {
  try {
    // console.log(req.params.title);
    const filterData = await Movie.findOne({ title: req.params.title });
    res.status(200).json(filterData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  createMovie,
  getMovies,
  getVideoplayer,
  updateMovies,
  deleteMovies,
  searchMovies,
  getrandomMovie,
  getMoviesAdmin,
};
