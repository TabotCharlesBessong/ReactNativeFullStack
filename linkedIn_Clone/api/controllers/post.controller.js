const Post = require("../models/post");

const create = async (req, res) => {
  try {
    const { description, imageUrl, userId } = req.body;
    const newPost = new Post({
      description,
      imageUrl,
      user: userId,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log("error creating the post", error);
    res.status(500).json({ message: "Error creating the post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name profileImage");

    res.status(200).json({ posts });
  } catch (error) {
    console.log("error fetching all the posts", error);
    res.status(500).json({ message: "Error fetching all the posts" });
  }
};

module.exports = { create, getAllPosts };
