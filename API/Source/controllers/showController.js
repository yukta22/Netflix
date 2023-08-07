import { Show } from "../models/shows.js";
import { uploadS3 } from "../utils/multerS3.js";

const createShow = async (req, res) => {
  try {
    const data = req.body;
    // const newShow = new Show({
    //   title: data.title,
    //   description: data.description,
    //   genre: data.genre,
    //   cast: data.cast,
    //   // episode: JSON.parse(data.episode_arr),
    // });
    // console.log(newShow);
    // await newShow.save();
    // res.status(200).json({ data: newShow });
    // console.log(req.body);
    const imgfile = req.files.image;
    const videoFile_360p = req.files.video_360p;
    const videoFile_480p = req.files.video_480p;
    const videoFile_720p = req.files.video_720p;
    const videoFile_1080p = req.files.video_1080p;
    const epiImgFile_0 = req.files.episode_image_0;
    const epiImgFile_1 = req.files.episode_image_1;
    const epiImgFile_2 = req.files.episode_image_2;
    const epiImgFile_3 = req.files.episode_image_3;
    const epiImgFile_4 = req.files.episode_image_4;
    const episode_video_360p_0 = req.files.episode_video_360p_0;
    const episode_video_360p_1 = req.files.episode_video_360p_1;
    const episode_video_480p_0 = req.files.episode_video_480p_0;
    const episode_video_480p_1 = req.files.episode_video_480p_1;
    const episode_video_720p_0 = req.files.episode_video_720p_0;
    const episode_video_720p_1 = req.files.episode_video_720p_1;
    const episode_video_1080p_0 = req.files.episode_video_1080p_0;
    const episode_video_1080p_1 = req.files.episode_video_1080p_1;

    const imgUrl = await uploadS3(imgfile.name, imgfile.buffer);
    const videoUrl_360p = await uploadS3(
      videoFile_360p.name,
      videoFile_360p.buffer
    );
    const videoUrl_480p = await uploadS3(
      videoFile_480p.name,
      videoFile_480p.buffer
    );
    const videoUrl_720p = await uploadS3(
      videoFile_720p.name,
      videoFile_720p.buffer
    );
    const videoUrl_1080p = await uploadS3(
      videoFile_1080p.name,
      videoFile_1080p.buffer
    );
    const epiImgUrl_0 = await uploadS3(epiImgFile_0.name, epiImgFile_0.buffer);
    const epiImgUrl_1 = await uploadS3(epiImgFile_1.name, epiImgFile_1.buffer);
    const epiImgUrl_2 = await uploadS3(epiImgFile_2.name, epiImgFile_2.buffer);
    const epiImgUrl_3 = await uploadS3(epiImgFile_3.name, epiImgFile_3.buffer);
    const epiImgUrl_4 = await uploadS3(epiImgFile_4.name, epiImgFile_4.buffer);
    const epiVideoUrl_360p_0 = await uploadS3(
      episode_video_360p_0.name,
      episode_video_360p_0.buffer
    );
    const epiVideoUrl_480p_0 = await uploadS3(
      episode_video_480p_0.name,
      episode_video_480p_0.buffer
    );
    const epiVideoUrl_720p_0 = await uploadS3(
      episode_video_720p_0.name,
      episode_video_720p_0.buffer
    );
    const epiVideoUrl_1080p_0 = await uploadS3(
      episode_video_1080p_0.name,
      episode_video_1080p_0.buffer
    );
    const epiVideoUrl_360p_1 = await uploadS3(
      episode_video_360p_1.name,
      episode_video_360p_1.buffer
    );
    const epiVideoUrl_480p_1 = await uploadS3(
      episode_video_480p_1.name,
      episode_video_480p_1.buffer
    );
    const epiVideoUrl_720p_1 = await uploadS3(
      episode_video_720p_1.name,
      episode_video_720p_1.buffer
    );
    const epiVideoUrl_1080p_1 = await uploadS3(
      episode_video_1080p_1.name,
      episode_video_1080p_1.buffer
    );
    console.log(req.body);
    const show = new Show({
      title: req.body.title,
      description: req.body.description,
      image: imgUrl,
      video_360p: videoUrl_360p,
      video_480p: videoUrl_480p,
      video_720p: videoUrl_720p,
      video_1080p: videoUrl_1080p,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      cast: req.body.cast,
      typeOfMovie: req.body.typeOfMovie,
      episode: [
        {
          title: req.body.episode_title,
          description: req.body.episode_description,
          releaseDate: req.body.releaseDate,
          image: epiImgUrl_0,
          video_360p: epiVideoUrl_360p_0,
          video_480p: epiVideoUrl_480p_0,
          video_720p: epiVideoUrl_720p_0,
          video_1080p: epiVideoUrl_1080p_0,
        },
      ],
    });
    console.log(show);
    const saveShow = await show.save();
    res.status(201).json(saveShow);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getShow = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateShow = async (req, res) => {
  try {
    const id = req.params.id;
    await Show.findByIdAndUpdate(id, req.body);
    res.status(200).json("Data updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteShow = async (req, res) => {
  try {
    const id = req.params.id;
    await Show.findByIdAndDelete(id, req.body);
    res.status(200).json("Data deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createShow, getShow, updateShow, deleteShow };
