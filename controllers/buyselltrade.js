const Post = require("../models/Post");

module.exports = {
    getLiveFishIndex: async (req, res) => {
      const fishPosts = await Post.find({postCategory: 'Fish'}).sort({ createdAt: "desc" }).lean()

      res.render('livefish', {
        posts: fishPosts,
        layout: './layouts/mainLayout',
    },
    )
    },  
    getAquaticPlantIndex: async (req, res) => {
      const plantPosts = await Post.find({postCategory: 'Plants'}).sort({ createdAt: "desc" }).lean()
      res.render('liveplants', {
        posts: plantPosts,
        layout: './layouts/mainLayout',
    })
      },
      getServicesIndex: async (req, res) => {
        const servicesPosts = await Post.find({postCategory: 'Services'}).sort({ createdAt: "desc" }).lean()
      res.render('offerservices', {
        posts: servicesPosts,
        layout: './layouts/mainLayout',
      })
      },
  };
  