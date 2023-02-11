const Post = require('../models/Post');
const User = require('../models/User');
const path = require('path');

const posts = [
  { id: 1, title: 'hello', detail: 'something' }
];



module.exports.getAllPosts = (req, res) => {

  return res.status(200).json(posts);
}

module.exports.getPostByUser = (req, res) => {
  return res.status(200).json(posts);
}

module.exports.createPost = async (req, res) => {
  const userId = req.userId;
  const { title, detail, image, public_id } = req.body;
  try {


    if (!req.files) {
      return res.status(400).json({
        status: 401,
        message: 'image file is required'
      });
    }


    const file = req.files.image;

    const extensionName = path.extname(file.name);
    const filesList = ['.png', '.jpg', '.jpeg'];

    if (!filesList.includes(extensionName)) {
      return res.status(400).json({
        status: 401,
        message: 'please provide valid email'
      });
    }

    file.mv(`./uploads/${file.name}`, (err) => {
      return res.status(400).json({
        status: 401,
        message: err
      });
    })


    return res.status(201).json('hello');


    // const user = await User.findOne({ _id: userId });

    // if (user) {
    //   const response = await Post.create({
    //     title, detail, imageUrl, public_id,
    //     author: userId
    //   });

    //   user.posts.push(response);
    //   await user.save();
    //   return res.status(201).json(response);
    // } else {
    //   return res.status(401).json({
    //     status: 401,
    //     message: 'you are not authorised'
    //   });
    // }

  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }


}


module.exports.updatePost = (req, res) => {

  return res.status(200).json(posts);
}


module.exports.removePost = (req, res) => {
  return res.status(200).json(posts);
}