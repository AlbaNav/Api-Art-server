const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { setError } = require('./src/utils/errors/error');
const documentation = require('./src/utils/doc/index.json')


const ArtpieceRoutes = require('./src/api/artpiece/artpiece.route');
const ArtistRoutes = require('./src/api/artist/artist.route');
const PaintingmovRoutes= require('./src/api/paintingmov/paintingmov.route');
const UserRoutes=require('./src/api/user/user.routes');


const { connectDb } = require('./src/utils/database/db');


const PORT = process.env.PORT || 8080;

const app = express();
connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '5mb',
  })
);

app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/api/users', UserRoutes);
app.use('/api/artpiece', ArtpieceRoutes);
app.use('/api/artist', ArtistRoutes);
app.use('/api/paintingmov',PaintingmovRoutes);

app.use('/', (req, res, next) => {
  return res.json(documentation);
});

app.use('*', (req, res, next) => {
  return next(setError(404, 'Route not found'));
});

app.use((error,req,res,next) => {
    return res.status(error.status || 500).json(error.message ||'unexpected error')
})

app.disable('x-powered-by')

app.listen(PORT,()=>{
   console.log(`listening on port ${PORT}`) 
})