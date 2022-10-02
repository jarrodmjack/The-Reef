const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const axios = require('axios');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" });
      res.render('profile', {
        posts: posts,
        user: req.user,
        layout: './layouts/mainLayout',
      },
      )
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const latestListings = [];
      const numOfPosts = posts.length;
      for(let i = 0; i < 5; i++){
        latestListings.push(posts[i])
      }
      
      const options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/news/search`,
        params: { q: `fish aquarium`, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': 'db3e8ae18bmshd7bb610557d438fp1e9721jsneadf0cccb21c',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };
      
      axios.request(options).then(async function (response) {
        let newsArray = response.data.value
        
        res.render('feed', {posts: posts, news: newsArray, numOfPosts: numOfPosts})
      }).catch(function (error) {
          console.error(error);
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const posterId = post.user
      const userThatPosted = await User.findById(posterId).lean()
      // console.log(userThatPosted.userName)
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      // res.render("post.ejs", {
      //   post: post,
      //   user: req.user,
      //   comments: comments, 
      //   postUser: userThatPosted.userName 
      // });
      res.render('post.ejs', {
        post: post,
        user: req.user,
        comments: comments,
        postUser: userThatPosted.userName,
        layout: './layouts/mainLayout',
      })
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      let image
      if (req.file) image = await cloudinary.uploader.upload(req.file.path);
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: image ? image.secure_url : null,
        cloudinaryId: image ? image.public_id : null,
        caption: req.body.caption,
        likes: 0,
        typeOfPost: req.body.typeOfPostSelect,
        postCategory: req.body.postCategory,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      console.log({ post })
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);

      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
