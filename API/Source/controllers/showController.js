import { Show } from "../models/shows.js";
import { uploadS3 } from "../utils/multerS3.js";

const createShow = async (req, res) => {
  try {
    // console.log(data);
    const data = req.body;
    const imgfile = req.files?.image;
    const video_360p = req.files?.video_360p;
    const video_480p = req.files?.video_480p;
    const video_720p = req.files?.video_720p;
    const video_1080p = req.files?.video_1080p;
    const imgUrl = await uploadS3(imgfile?.name, imgfile?.data);
    const video_360pUrl = await uploadS3(video_360p?.name, video_360p?.data);
    const video_480pUrl = await uploadS3(video_480p?.name, video_480p?.data);
    const video_720pUrl = await uploadS3(video_720p?.name, video_720p?.data);
    const video_1080pUrl = await uploadS3(video_1080p?.name, video_1080p?.data);

    const episodeDataArray = JSON.parse(data.episode_arr);

    const episodes = await Promise.all(
      episodeDataArray.map(async (episodeData, index) => {
        const episodeImgFile = req.files[`episode_image_${index}`];
        const episode_video_360p = req.files[`episode_video_360p_${index}`];
        const episode_video_480p = req.files[`episode_video_480p_${index}`];
        const episode_video_720p = req.files[`episode_video_720p_${index}`];
        const episode_video_1080p = req.files[`episode_video_1080p_${index}`];

        const episode = {
          title: episodeData.title,
          description: episodeData.description,
          image: await uploadS3(episodeImgFile?.name, episodeImgFile?.data),
          video_360p: await uploadS3(
            episode_video_360p?.name,
            episode_video_360p?.data
          ),
          video_480p: await uploadS3(
            episode_video_480p?.name,
            episode_video_480p?.data
          ),
          video_720p: await uploadS3(
            episode_video_720p?.name,
            episode_video_720p?.data
          ),
          video_1080p: await uploadS3(
            episode_video_1080p?.name,
            episode_video_1080p?.data
          ),
        };

        return episode;
      })
    );

    const newShow = new Show({
      title: data.title,
      description: data.description,
      genre: data.genre,
      cast: data.cast,
      image: imgUrl,
      video_360p: video_360pUrl,
      video_480p: video_480pUrl,
      video_720p: video_720pUrl,
      video_1080p: video_1080pUrl,
      episode: episodes,
    });

    const saveShow = await newShow.save();
    // console.log(saveShow);
    res.status(201).json(saveShow);
  } catch (err) {
    // console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the show." });
  }
};

const getShow = async (req, res) => {
  try {
    const pageno = req.headers.pageno;

    const skipData = 5;
    const shows = await Show.find()
      .skip((pageno - 1) * skipData)
      .limit(5);
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllShow = async (req, res) => {
  try {
    const shows = await Show.find();

    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateShow = async (req, res) => {
  try {
    const data = req.body;
    const existingData = await Show.findById(req.body.id);

    const imgfile = req.files?.image;
    const video_360p = req.files?.video_360p;
    const video_480p = req.files?.video_480p;
    const video_720p = req.files?.video_720p;
    const video_1080p = req.files?.video_1080p;
    const imgUrl = imgfile
      ? await uploadS3(imgfile.name, imgfile.data)
      : existingData.image;
    const video_360pUrl = video_360p
      ? await uploadS3(video_360p?.name, video_360p?.data)
      : existingData.video_360p;
    const video_480pUrl = video_480p
      ? await uploadS3(video_480p?.name, video_480p?.data)
      : existingData.video_480p;
    const video_720pUrl = video_720p
      ? await uploadS3(video_720p?.name, video_720p?.data)
      : existingData.video_720p;
    const video_1080pUrl = video_1080p
      ? await uploadS3(video_1080p?.name, video_1080p?.data)
      : existingData.video_1080p;

    const episodeDataArray = JSON.parse(data.episode_arr);

    const episodes = await Promise.all(
      episodeDataArray.map(async (episodeData, index) => {
        console.log(episodeData);
        const episodeImgFile = req.files[`episode_image_${index}`];
        const episode_video_360p = req.files[`episode_video_360p_${index}`];
        const episode_video_480p = req.files[`episode_video_480p_${index}`];
        const episode_video_720p = req.files[`episode_video_720p_${index}`];
        const episode_video_1080p = req.files[`episode_video_1080p_${index}`];

        const episode = {
          title: episodeData.title,
          description: episodeData.description,
          image: await uploadS3(episodeImgFile?.name, episodeImgFile?.data),
          video_360p: await uploadS3(
            episode_video_360p?.name,
            episode_video_360p?.data
          ),
          video_480p: await uploadS3(
            episode_video_480p?.name,
            episode_video_480p?.data
          ),
          video_720p: await uploadS3(
            episode_video_720p?.name,
            episode_video_720p?.data
          ),
          video_1080p: await uploadS3(
            episode_video_1080p?.name,
            episode_video_1080p?.data
          ),
        };

        return episode;
      })
    );

    const updateData = await Show.findByIdAndUpdate(
      req.body.id,
      {
        title: data.title,
        description: data.description,
        genre: data.genre,
        cast: data.cast,
        image: imgUrl,
        video_360p: video_360pUrl,
        video_480p: video_480pUrl,
        video_720p: video_720pUrl,
        video_1080p: video_1080pUrl,
        episode: episodes,
      },
      { new: true }
    );
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
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

const searchShow = async (req, res) => {
  try {
    const { query } = req.params;

    const shows = await Show.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.json(shows);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createShow, getShow, updateShow, deleteShow, getAllShow, searchShow };
