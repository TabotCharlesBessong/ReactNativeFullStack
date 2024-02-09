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

const likePost = async (req,res) => {
  try {
    const postId = req.params.postId
    const userId = req.params.userId

    const post = await Post.findByid(postId)
    if(!post){
      return res.status(400).json({message:"Post not found!"})
    }

    // check if the user has already liked the post
    const existingLike = post?.likes.find((like) => like.user.toString() === userId)

    if(existingLike){
      post.likes = post.likes.filter((like) => like.user.toString() !== userId)
    }else{
      post.likes.push({user:userId})
    }

    await post.save()
    res.status(200).json({message:"You successfully liked the post"})
  } catch (error) {
    console.log("Error like a post:", error)
    res.status(500).json({message:"Error liking the post"})
  }
}

module.exports = { create, getAllPosts,likePost };
