const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path')
mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://Robin900:moles900@cluster0.jse9vfs.mongodb.net/Blog?retryWrites=true&w=majority', (err) => {
    if (err) {
      // console.log(err);
    }
    app.listen(5000);
  })

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 600000 },
  abortOnLimit: true,
  createParentPath: true
}))
app.use('/uploads/images', express.static(path.join('uploads', 'images',)));

app.use(userRoutes);
app.use(postRoutes);



app.use((req, res) => {
  res.status(404).json({
    status: 400,
    message: 'not found'
  });
})